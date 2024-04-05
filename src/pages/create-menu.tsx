// Place for the staff to create a new menu, by adding new items to it, reviewing it, and finalizing it as that day's menu
// We also want them to be able to access a list of previous meals they've made - a component here would be helpful
// use isModifiable boolean value to determine
// FUTURE TO DO: add different sections for drinks, meal, dessert

import AddItemForm from "@/components/create-menu/add-item-form";
import Header from "@/components/header";
import Menu from "@/components/menu";
import {
  CreateMenuItemType,
  CreateMenuType,
  MenuItemType,
  MenuType,
} from "@/lib/types";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const defaultMenu: MenuType = {
  id: "temporary",
  createdAt: new Date(),
  items: [],
};
const defaultItem: CreateMenuItemType = {
  name: "",
  description: "",
  price: 0,
  isVegan: false,
  isVegetarian: false,
  isGlutenFree: false,
  isDairyFree: false,
};

const isMenuItemIdentical = (a: MenuItemType, b: CreateMenuItemType) => {
  let isSame = true;
  isSame = isSame && a.name === b.name;
  isSame = isSame && a.description === b.description;
  isSame = isSame && a.price === b.price;
  isSame = isSame && a.isVegan === b.isVegan;
  isSame = isSame && a.isVegetarian === b.isVegetarian;
  isSame = isSame && a.isGlutenFree === b.isGlutenFree;
  isSame = isSame && a.isDairyFree === b.isDairyFree;
  return isSame;
};

export default function CreateMenuPage() {
  const [currMenu, setCurrMenu] = useState<MenuType>(defaultMenu);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onAddItem = (item: CreateMenuItemType) => {
    setIsLoading(true);
    // Let's check if the item already exists!
    const existingItem = menuItems.find((i) => isMenuItemIdentical(i, item));

    // It does exist, so we'll just add it to the current menu state and return early.
    if (existingItem) {
      setCurrMenu({
        ...currMenu,
        items: [...currMenu.items, existingItem],
      });
      setIsLoading(false);
      return;
    }

    // It doesn't exist, so now we'll add it to the database
    fetch("/api/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data: MenuItemType) => {
        console.log("Item created:", data);

        // We know it has been successfully created, so now we'll add it to the current menu state
        setCurrMenu({
          ...currMenu,
          items: [...currMenu.items, data],
        });
        setIsLoading(false);
      });
  };

  const onRemoveItem = (item: MenuItemType) => {
    setCurrMenu({
      ...currMenu,
      items: currMenu.items.filter((i) => i !== item),
    });
  };

  const onAddMenu = () => {
    setIsLoading(true);
    // Let's check if the menu already exists
    const existingMenu = menus.find((menu) => {
      const menuDate = new Date(menu.createdAt);
      console.log(menu);
      return (
        menuDate.toLocaleDateString() == currMenu.createdAt.toLocaleDateString()
      );
    });

    // It does exist, so we'll just tell the user that it was already published.
    if (existingMenu) {
      alert("Today's Menu was already published.");
      return;
    }

    const menu: CreateMenuType = {
      itemIDs: currMenu.items.map((item) => item.id),
    };

    // It doesn't exist, so now we'll add it to the database
    fetch("/api/create-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((data: MenuType) => {
        console.log("Menu published:", data);
        alert("Menu published!");
      });
  };

  useEffect(() => {
    // If menuItems has already been loaded, we don't need to fetch it again
    if (menuItems.length > 0) {
      return;
    }

    // Go get those menu items!!
    fetch("/api/get-all-items")
      .then((res) => res.json())
      .then((data: MenuItemType[]) => {
        console.log("Menu items loaded:", data);
        setMenuItems(data);
      });
  }, [menuItems.length]);

  useEffect(() => {
    if (menus.length > 0) {
      return;
    }

    fetch("api/get-all-menus")
      .then((res) => res.json())
      .then((data: MenuType[]) => {
        console.log("Menus loaded:", data);
        setMenus(data);
      });
  }, [menus.length]);

  return (
    <main className="bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="basis-full lg:basis-1/3">
            <div className="p-8">
              <h1 className="font-bold text-center text-3xl lg:text-5xl">Add Menu Item</h1>
              <AddItemForm
                defaults={defaultItem}
                existingItems={menuItems}
                onSubmit={onAddItem}
              />
              {isLoading && (
                <FaceSmileIcon className="animate-spin mt-4 w-8 h-8" />
              )}
            </div>
          </div>
          <div className="basis-full lg:basis-2/3 lg:min-h-full">
            <Menu
              menu={currMenu}
              beingOrdered={true}
              removedItem={onRemoveItem}
            />
          </div>
        </div>
        <div className="m-10 mb-15 text-center">
          <button
            className="bg-[#B89112] hover:bg-[#9c8439] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.preventDefault();
              onAddMenu();
            }}
          >
            Publish Menu!
          </button>
        </div>
      </div>
    </main>
  );
}
