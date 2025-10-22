import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types/restaurant";
import { useCart } from "@/contexts/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
}

export const MenuItemCard = ({ item, restaurantId }: MenuItemCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="hover:shadow-[var(--shadow-soft)] transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {item.isVeg !== undefined && (
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${item.isVeg ? 'border-secondary' : 'border-destructive'}`}>
                  <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-secondary' : 'bg-destructive'}`} />
                </div>
              )}
              <h4 className="font-semibold">{item.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <p className="font-semibold text-primary">₹{item.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-col items-center justify-between">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg mb-2"
              />
            )}
            <Button
              size="sm"
              onClick={() => addToCart(item, restaurantId)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
