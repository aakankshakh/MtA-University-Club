import { OrdersType } from "@/components/orders";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order } = req.body as { order: OrdersType };
  res.status(200).json({ name: "John Doe" });
}
