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

    //changed
  if (req.method === "POST") {
    const createOrderData: any[] = req.body; //from input
    const items = await getAllItems();
    const orderItems = items.filter((item) => { 
      const orderData = createOrderData.filter(order => order.id !== item.id);

      return orderData;
    });


    const order: OrderType | any = {
      id: uuidv4(),
      createdAt: new Date(),
      status: "placed",
      items: createOrderData,
      customer: userId,
    };
    await createOrder(order, userId);
    res.status(201).json(order);
    
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
