// import { OrderType } from "@/lib/types";

// export type OrdersType = {
//   ordersList: OrderType[];
// };

// type OrdersProps = {
//   orders: OrderType[];
// };

// export default function Orders(props: OrdersProps) {
//   const { orders } = props;
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4">Online Orders</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {orders.map((order) => (
//           <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
//             <p className="text-gray-600 mb-2">
//               Customer: {order.customer}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Items: {order.items.map((item) => (item.name)+ " x " + (item.quantity)).join(", ")}
//             </p>
//             {/* <p className="text-gray-600 mb-2">
//               Ordertype: {order.items.map((type: any) => (type.orderType))}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Specifications: {order.items.map((type: any) => (type.specifications))}
//             </p> */}
//             <p className="text-gray-600 mb-2">
//               Total Price: ${order.items.reduce((total: any, item: any) =>total + (item.price* item.quantity) , 0)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { OrderType } from "@/lib/types";

export type OrdersType = {
  ordersList: OrderType[];
};

type OrdersProps = {
  orders: OrderType[];
};

export default function Orders(props: OrdersProps) {
  const { orders } = props;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Online Orders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
            <p className="text-gray-600 mb-2">
              Customer: {order.customer}
            </p>
            <p className="text-gray-600 mb-2">
              Items:
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.name} quantity: {item.quantity}
                </div>
              ))}
            </p>
            {/* <p className="text-gray-600 mb-2">
              Ordertype: {order.items.map((type: any) => (type.orderType))}
            </p>
            <p className="text-gray-600 mb-2">
              Specifications: {order.items.map((type: any) => (type.specifications))}
            </p> */}
            <p className="text-gray-600 mb-2">
              Total Price: ${order.items.reduce((total: any, item: any) =>total + (item.price* item.quantity) , 0)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
