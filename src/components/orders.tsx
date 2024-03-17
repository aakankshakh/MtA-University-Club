import { MenuItemType } from "./menu-item"

type Order = {
    id: number;
    customer: string;
    items: MenuItemType[];
    totalPrice: number;
}

export type OrdersType = {
    ordersList : Order[];
}

type OrdersProps = {
  orders: OrdersType;
}

export default function Orders(props: OrdersProps) {
    const {orders} = props;
    return (
        <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Online Orders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.ordersList.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
            <p className="text-gray-600 mb-2">Customer Name: {order.customer}</p>
            <p className="text-gray-600 mb-2">Total Price: {order.totalPrice}</p>
            <p className="text-gray-600 mb-2">Items: {order.items.map(item => item.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
    );
}