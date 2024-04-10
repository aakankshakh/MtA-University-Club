import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { createItem } from "@/lib/server/db";
import { CreateMenuItemType, MenuItemType } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { isChef } from "@/lib/server/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = await getAuth(req);

  if (!userId || !isChef(userId)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.method === "POST") {
    const createItemData: CreateMenuItemType = req.body;
    const item: MenuItemType = {
      id: uuidv4(),
      ...createItemData,
      quantity: 0
    };
    await createItem(item);
    res.status(201).json(item);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
