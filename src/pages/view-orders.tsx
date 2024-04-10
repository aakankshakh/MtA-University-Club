import Header from "@/components/header";
import Orders, { OrdersType } from "@/components/orders";
import { useEffect, useState } from "react";

//hard-coded for testing I assume?
// const orders: OrdersType = {
//   ordersList: [
//     {
//       id: "1",
//       createdAt: new Date(),
//       customer: "Aakanksha",
//       items: [
//         {
//           id: "1",
//           name: "Butter Chicken",
//           price: 17.0,
//           description: "yummy food! chicken, butter, cream, ...",
//           lastServed: new Date(),
//           isGlutenFree: false,
//           isVegan: false,
//           isVegetarian: false,
//           isDairyFree: false,
//         },
//       ],
//       totalPrice: 17.0,
//       status: "placed",
//     },
//   ],
// };
export default function ViewOrders() {
  const [orders, setGetOrders] =  useState<any[]>([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("/api/get-all-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
  
        setGetOrders(data)
      } catch (error) {
        throw new Error(`There was a problem with creating this order:, ${error}`);
      }
    };

    getOrders()
  }, []);

  return (
    <main>
      <Header/>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Orders orders={orders} />
        </div>
      </div>
    </main>
  );
}
