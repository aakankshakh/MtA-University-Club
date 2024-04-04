import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getMenuItems } from "@/lib/server/db";

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
    const { menuID } = req.query;
    const items = await getMenuItems(menuID as string);
    res.status(200).json(items);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
