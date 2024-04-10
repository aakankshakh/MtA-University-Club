import { NextApiRequest, NextApiResponse } from "next";
import { getAllOrders } from "@/lib/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const orders = await getAllOrders();
    const todaysOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      console.log(orderDate.toLocaleDateString());
      console.log(new Date().toLocaleDateString());
      return orderDate.toLocaleDateString() === new Date().toLocaleDateString();
    });
    if (!todaysOrders) {
      return res
        .status(404)
        .json({ error: "No orders placed" });
    }
    console.log(todaysOrders);
    res.status(200).json(todaysOrders);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
