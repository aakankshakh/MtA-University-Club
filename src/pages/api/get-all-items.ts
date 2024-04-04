import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllItems } from "@/lib/server/db";
import { isChef } from "@/lib/server/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = await getAuth(req);

  if (!userId || !isChef(userId)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const items = await getAllItems();
    res.status(200).json(items);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
