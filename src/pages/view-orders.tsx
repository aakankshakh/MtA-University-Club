import Orders from "@/components/orders"

export default function ViewOrders() {
    return (
        <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Online Orders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Orders/>
      </div>
    </div>
    );
}