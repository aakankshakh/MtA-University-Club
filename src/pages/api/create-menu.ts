import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { createMenu, getAllItems } from "@/lib/server/db";
import { CreateMenuType, MenuType } from "@/lib/types";
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
    const createMenuData: CreateMenuType = req.body;
    const items = await getAllItems();
    const menuItems = items.filter(
      (item) => createMenuData.itemIDs.indexOf(item.id) != -1,
    );

    const menu: MenuType = {
      id: uuidv4(),
      items: menuItems,
      createdAt: new Date(),
    };
    await createMenu(menu);
    res.status(201).json(menu);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
