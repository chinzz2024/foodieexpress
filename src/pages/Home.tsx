import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Search, Clock, ShieldCheck, Utensils } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Restaurant } from "@/types/restaurant";

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name, image, cuisine, rating, delivery_time, price_range, description, is_active")
        .eq("is_active", true)
        .order("rating", { ascending: false })
        .limit(6);
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center md:text-left max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Delicious Food,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-xl">
            Order from your favorite restaurants and get fresh, hot food delivered to your doorstep in minutes
          </p>
          <Link to="/restaurants">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Search className="mr-2 h-5 w-5" />
              Explore Restaurants
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">Choose from hundreds of restaurants and cuisines</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Only verified restaurants with high ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Link to="/restaurants">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
