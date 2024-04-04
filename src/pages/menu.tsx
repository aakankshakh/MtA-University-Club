import Header from "@/components/header";
import Menu from "@/components/menu";
import { MenuType } from "@/lib/types";

// Hard coded menu to test the display
const menu: MenuType = {
  createdAt: new Date(),
  id: "1",
  items: [
    {
      id: "1",
      name: "Butter Chicken",
      price: 17.0,
      description: "yummy food! chicken, butter, cream, ...",
      lastServed: new Date(),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isDairyFree: false,
    },
    {
      id: "2",
      name: "Shahi Paneer",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: true,
      isDairyFree: false,
    },
    {
      id: "3",
      name: "Organic Parsnip, Carrot & Apple Soup",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: true,
      isVegan: true,
      isVegetarian: true,
      isDairyFree: false,
    },
    {
      id: "4",
      name: "Garden Salad w/ Balsamic Vinaigrette",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: true,
      isVegan: true,
      isVegetarian: true,
      isDairyFree: false,
    },
    {
      id: "4",
      name: "Albacore Tuna Cheddar Melt on Ciabatta w/ Chips & Slaw",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isDairyFree: false,
    },
    {
      id: "5",
      name: "Tourtiere w/ Greens",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isDairyFree: false,
    },
    {
      id: "6",
      name: "Chocolate Swirl Cheesecake w/ Organic Raspberry Sauce",
      price: 15.0,
      description: "yummy food",
      lastServed: new Date(),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isDairyFree: false,
    },
  ],
};

export default function ViewMenuPage() {
  return (
    <main>
      <Header />
      <Menu beingOrdered={false} menu={menu} />
    </main>
  );
}
