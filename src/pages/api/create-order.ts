import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder, getAllItems } from "@/lib/server/db";
import { CreateOrderType, OrderType } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = await getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "POST") {
    const createOrderData: CreateOrderType = req.body;
    const items = await getAllItems();
    const orderItems = items.filter(
      (item) => createOrderData.itemIDs.indexOf(item.id) != -1,
    );

    const order: OrderType = {
      id: uuidv4(),
      createdAt: new Date(),
      ...createOrderData,
      status: "placed",
      items: orderItems,
    };
    await createOrder(order, userId);
    res.status(201).json(order);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
