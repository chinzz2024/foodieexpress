import { useEffect, useState, useMemo } from "react";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useSearch } from "@/contexts/SearchContext";
import { supabase } from "@/integrations/supabase/client";
import type { Restaurant } from "@/types/restaurant";

const Restaurants = () => {
  const { searchQuery } = useSearch();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name, image, cuisine, rating, delivery_time, price_range, description, is_active")
        .eq("is_active", true)
        .order("name");
      if (error) {
        console.error("Failed to fetch restaurants", error.message);
        return;
      }
      const mapped: Restaurant[] = (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        image: r.image ?? "/placeholder.svg",
        cuisine: r.cuisine,
        rating: Number(r.rating ?? 0),
        deliveryTime: r.delivery_time,
        priceRange: r.price_range,
        description: r.description,
      }));
      setRestaurants(mapped);
    };
    load();
  }, []);

  const filteredRestaurants = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(q) ||
      restaurant.cuisine.toLowerCase().includes(q) ||
      restaurant.description.toLowerCase().includes(q)
    );
  }, [restaurants, searchQuery]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">All Restaurants</h1>
        {searchQuery && (
          <p className="text-muted-foreground mb-4">
            Showing results for "{searchQuery}"
          </p>
        )}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No restaurants found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
