import { kv } from "@vercel/kv";
import { MenuItemType, MenuType, OrderType } from "@/lib/types";

// Item setter
export async function createItem(item: MenuItemType) {
  await kv.set(`item.${item.id}`, item);
  await kv.lpush("ItemList", item.id);
}

export async function createOrder(order: OrderType, userID: string) {
  await kv.set(`order.${order.id}`, order);
  await kv.lpush("OrderList", order.id);
  await kv.lpush(`UserOrderList.${userID}`, order.id);
}

export async function createMenu(menu: MenuType) {
  await kv.set(`menu.${menu.id}`, menu);
  await kv.lpush("MenuList", menu.id);
}

export async function getItem(itemID: string) {
  return await kv.get(`item.${itemID}`);
}

export async function getAllItems() {
  const itemIDs = await kv.lrange("ItemList", 0, -1);
  const itemPromises = itemIDs.map((itemID) => {
    return kv.get(`item.${itemID}`);
  });

  return (await Promise.all(itemPromises)) as MenuItemType[];
}

export async function getAllMenus() {
  const menuIDs = await kv.lrange("MenuList", 0, -1);
  const menuPromises = menuIDs.map((menuID) => {
    return kv.get(`menu.${menuID}`);
  });

  return (await Promise.all(menuPromises)) as MenuType[];
}

export async function getAllOrders() {
  const orderIDs = await kv.lrange("OrderList", 0, -1);
  const orderPromises = orderIDs.map((orderID) => {
    return kv.get(`order.${orderID}`);
  });

  return (await Promise.all(orderPromises)) as OrderType[];
}

export async function getOrderItems(orderID: string) {
  const order = (await kv.get(`order.${orderID}`)) as OrderType;
  return order.items;
}

export async function getMenuItems(menuID: string) {
  const menu = (await kv.get(`menu.${menuID}`)) as MenuType;
  return menu.items;
}

export async function getUserOrders(userID: string) {
  const userOrderIDs = await kv.lrange(`UserOrderList.${userID}`, 0, -1);
  const userOrderPromises = userOrderIDs.map((userOrderID) => {
    return kv.get(`order.${userOrderID}`);
  });

  return (await Promise.all(userOrderPromises)) as OrderType[];
}
