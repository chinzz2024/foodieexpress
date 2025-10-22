import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Restaurant, MenuItem } from "@/types/restaurant";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data: r, error: rErr } = await supabase
        .from("restaurants")
        .select("id, name, image, cuisine, rating, delivery_time, price_range, description")
        .eq("id", id)
        .maybeSingle();
      if (rErr) {
        console.error("Failed to load restaurant", rErr.message);
      } else if (r) {
        const mappedR: Restaurant = {
          id: r.id,
          name: r.name,
          image: r.image ?? "/placeholder.svg",
          cuisine: r.cuisine,
          rating: Number(r.rating ?? 0),
          deliveryTime: r.delivery_time,
          priceRange: r.price_range,
          description: r.description,
        };
        setRestaurant(mappedR);
      }

      const { data: mi, error: miErr } = await supabase
        .from("menu_items")
        .select("id, restaurant_id, name, description, price, image, category, is_veg")
        .eq("restaurant_id", id)
        .order("category")
        .order("name");
      if (miErr) {
        console.error("Failed to load menu items", miErr.message);
      } else {
        const mappedItems: MenuItem[] = (mi || []).map((m: any) => ({
          id: m.id,
          name: m.name,
          description: m.description,
          price: Number(m.price),
          image: m.image ?? undefined,
          category: m.category,
          isVeg: Boolean(m.is_veg),
          restaurantId: id,
        }));
        setMenuItems(mappedItems);
      }
    };
    load();
  }, [id]);

  const categories = useMemo(() => [...new Set(menuItems.map((i) => i.category))], [menuItems]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <Button variant="default" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Restaurant Header */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-4">{restaurant.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-accent" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{restaurant.cuisine} • {restaurant.priceRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Menu</h2>
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-border">
              {category}
            </h3>
            <div className="grid gap-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} restaurantId={id || ""} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
