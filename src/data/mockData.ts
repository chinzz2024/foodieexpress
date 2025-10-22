import { Restaurant, MenuItem } from "@/types/restaurant";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Milano Pizzeria",
    image: restaurant1,
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    description: "Authentic Italian pizzas baked in a wood-fired oven",
  },
  {
    id: "2",
    name: "Dragon Fusion",
    image: restaurant2,
    cuisine: "Asian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    priceRange: "$$$",
    description: "Contemporary Asian fusion cuisine",
  },
  {
    id: "3",
    name: "Burger Haven",
    image: restaurant3,
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "20-30 min",
    priceRange: "$",
    description: "Gourmet burgers and classic American comfort food",
  },
];

export const mockMenuItems: { [restaurantId: string]: MenuItem[] } = {
  "1": [
    {
      id: "m1",
      name: "Margherita Pizza",
      description: "Classic tomato, mozzarella, and fresh basil",
      price: 499,
      category: "Pizza",
      isVeg: true,
      restaurantId: "1",
    },
    {
      id: "m2",
      name: "Pepperoni Pizza",
      description: "Loaded with pepperoni and extra cheese",
      price: 599,
      category: "Pizza",
      restaurantId: "1",
    },
    {
      id: "m3",
      name: "Caesar Salad",
      description: "Crispy romaine with parmesan and croutons",
      price: 349,
      category: "Salads",
      isVeg: true,
      restaurantId: "1",
    },
  ],
  "2": [
    {
      id: "m4",
      name: "Dragon Roll",
      description: "Shrimp tempura, avocado, topped with eel",
      price: 699,
      category: "Sushi",
      restaurantId: "2",
    },
    {
      id: "m5",
      name: "Pad Thai",
      description: "Traditional Thai stir-fried noodles",
      price: 549,
      category: "Noodles",
      restaurantId: "2",
    },
    {
      id: "m6",
      name: "Mango Sticky Rice",
      description: "Sweet coconut rice with fresh mango",
      price: 299,
      category: "Desserts",
      isVeg: true,
      restaurantId: "2",
    },
  ],
  "3": [
    {
      id: "m7",
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, special sauce",
      price: 449,
      category: "Burgers",
      restaurantId: "3",
    },
    {
      id: "m8",
      name: "Cheese Fries",
      description: "Golden fries topped with melted cheese",
      price: 249,
      category: "Sides",
      isVeg: true,
      restaurantId: "3",
    },
    {
      id: "m9",
      name: "Chocolate Shake",
      description: "Rich and creamy chocolate milkshake",
      price: 199,
      category: "Beverages",
      isVeg: true,
      restaurantId: "3",
    },
  ],
};
