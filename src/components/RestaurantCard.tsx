import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="aspect-video overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
            </div>
            <div className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>{restaurant.priceRange}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
