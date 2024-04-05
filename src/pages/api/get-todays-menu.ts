import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllMenus } from "@/lib/server/db";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = await getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const menus = await getAllMenus();
    const todaysMenu = menus.find(
      (menu) =>
      {
        const menuDate = new Date(menu.createdAt);
        console.log(menuDate.toLocaleDateString());
        console.log(new Date().toLocaleDateString());
        return menuDate.toLocaleDateString() === new Date().toLocaleDateString();
      }
    );
    if (!todaysMenu){
      return res.status(404).json({ error: "Today's menu has not been published yet"});
    }
    console.log(todaysMenu);
    res.status(200).json(todaysMenu);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
