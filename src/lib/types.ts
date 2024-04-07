export type MenuItemType = {
  id: string;
  name: string;
  price: number;
  description: string;
  lastServed?: Date;
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isDairyFree: boolean;
};

export type CreateMenuItemType = {
  name: string;
  price: number;
  description: string;
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isDairyFree: boolean;
};

export type UpdateMenuItemType = {
  name?: string;
  price?: number;
  description?: string;
  lastServed?: Date;
  isGlutenFree?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isDairyFree?: boolean;
};

export type MenuType = {
  id: string;
  items: MenuItemType[];
  createdAt: Date;
};

export type CreateMenuType = {
  itemIDs: string[];
};

export type UpdateMenuType = {
  itemsIDs?: string[];
};

export type OrderType = {
  id: string;
  createdAt: Date;
  customer: string;
  items: MenuItemType[];
  totalPrice: number;
  status: "placed" | "fulfilled";
  specialRequest?: string
  orderType: string
};

export type CreateOrderType = {
  customer: string;
  itemIDs: string[];
  totalPrice: number;
};

export type UpdateOrderType = {
  status?: "placed" | "fulfilled";
};
