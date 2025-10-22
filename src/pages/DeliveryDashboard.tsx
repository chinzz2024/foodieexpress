import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, MapPin, Clock } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  status: string;
  total_amount: number;
  created_at: string;
  restaurants: { name: string };
}

const DeliveryDashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [assignedOrders, setAssignedOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && (!user || userRole !== "delivery_partner")) {
      toast.error("Access denied. Delivery partner privileges required.");
      navigate("/");
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === "delivery_partner") {
      fetchOrders();
    }
  }, [user, userRole]);

  const fetchOrders = async () => {
    // Fetch available orders (not assigned)
    const { data: availableOrders } = await supabase
      .from("orders")
      .select("*, restaurants(name)")
      .is("delivery_partner_id", null)
      .in("status", ["confirmed", "preparing"])
      .order("created_at", { ascending: false });

    // Fetch assigned orders
    const { data: myOrders } = await supabase
      .from("orders")
      .select("*, restaurants(name)")
      .eq("delivery_partner_id", user?.id)
      .in("status", ["out_for_delivery", "preparing"])
      .order("created_at", { ascending: false });

    setOrders(availableOrders || []);
    setAssignedOrders(myOrders || []);
  };

  const acceptOrder = async (orderId: string) => {
    const { error } = await supabase
      .from("orders")
      .update({
        delivery_partner_id: user?.id,
        status: "out_for_delivery",
      })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to accept order");
      return;
    }

    toast.success("Order accepted!");
    fetchOrders();
  };

  const completeDelivery = async (orderId: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: "delivered" })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to complete delivery");
      return;
    }

    toast.success("Delivery completed!");
    fetchOrders();
  };

  if (loading || userRole !== "delivery_partner") {
    return null;
  }

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Delivery Dashboard</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Available Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-muted-foreground">No available orders</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{order.restaurants.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer_name}
                          </p>
                        </div>
                        <Badge>{order.status}</Badge>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>
                          {order.delivery_address}, {order.delivery_city}, {order.delivery_state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(order.created_at).toLocaleString()}
                      </div>
                      <Button
                        variant="hero"
                        size="sm"
                        className="w-full"
                        onClick={() => acceptOrder(order.id)}
                      >
                        Accept Order
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  My Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedOrders.length === 0 ? (
                  <p className="text-muted-foreground">No active deliveries</p>
                ) : (
                  assignedOrders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{order.restaurants.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer_name} • {order.customer_phone}
                          </p>
                        </div>
                        <Badge variant="default">{order.status}</Badge>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>
                          {order.delivery_address}, {order.delivery_city}, {order.delivery_state}
                        </span>
                      </div>
                      <p className="text-lg font-semibold">
                        ${order.total_amount.toFixed(2)}
                      </p>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => completeDelivery(order.id)}
                      >
                        Mark as Delivered
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
