import {  getAuth } from "@clerk/nextjs/server";
import {  NextApiRequest, NextApiResponse } from "next";
import {  getAllMenus } from "@/lib/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {  userId } = await getAuth(req);

  if (!userId) {
    res.status(401).json({  error: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const menus = await getAllMenus();
    const todaysMenu = menus.find((menu) => menu.createdAt.toDateString() == new Date().toDateString())
    res.status(200).json({todaysMenu});
  } else {
    res.status(405).json({  error: "Method not allowed" });
  }
}