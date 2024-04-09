// import Header from "@/components/header";
// import Orders, { OrdersType } from "@/components/orders";
// import { useEffect, useState } from "react";
// import { getAuth } from "@clerk/nextjs/server";

// export default function MyOrders() {
//   const [orders, setGetOrders] =  useState<any[]>([]);
//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const response = await fetch("/api/get-user-orders", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data)
  
//         setGetOrders(data)
//       } catch (error) {
//         throw new Error(`There was a problem with creating this order:, ${error}`);
//       }
//     };

//     getOrders()
//   }, []);

//   return (
//     <main>
//       <Header/>
//       <div className="container mx-auto py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Orders orders={orders} />
//         </div>
//       </div>
//     </main>
//   );
// }

import Header from "@/components/header";
import Orders from "@/components/orders";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Specify type as Error | null

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("/api/get-user-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error); // Explicitly cast error to Error type
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Orders orders={orders} />
        </div>
      </div>
    </main>
  );
}
