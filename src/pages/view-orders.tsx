import Orders, { OrdersType } from "@/components/orders"

const orders : OrdersType = {
  ordersList : [
    {id: 1,
    customer: 'Aakanksha',
    items: [{name: "Butter Chicken", price: 17.00, description: "yummy food! chicken, butter, cream, ...", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: false,
    isDairyFree: false}],
    totalPrice: 17.00}
  ]
}
export default function ViewOrders() {
    return (
        <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Online Orders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Orders orders={orders}/>
      </div>
    </div>
    );
}