import { CreateMenuType, MenuType } from "@/lib/types";
import MenuItem from "./menu-item";
import MenuLegend from "./menu-legend";
import { useEffect } from "react";

// Giving multiple pages the ability to access it
type MenuProps = {
  menu: MenuType | CreateMenuType;
  beingOrdered: boolean;
  //addToCart: (item: MenuItemType) => void; // Add this line
};

function isCreateMenuType(
  menu: CreateMenuType | MenuType,
): menu is CreateMenuType {
  return (menu as CreateMenuType).itemIDs !== undefined;
}

export default function Menu(props: MenuProps) {
  // Creating local variables to store props
  const { menu, beingOrdered } = props;
  const today = new Date();

  useEffect(() => {
    if (isCreateMenuType(menu)) {
      menu.itemIDs.map((itemID) => {
        fetch("/api/get-item")
          .then((res) => res.json())
          .then((data) => console.log(data));
      });
    }
  }, [menu]);
  return (
    <main className="bg-white dark:bg-gray-900">
      <h1 className="font-bold text-5xl text-center">University Club Menu</h1>
      <h3 className="italic text-center">{today.toLocaleDateString()}</h3>
      <div>
        {menu.items.map((item, index) => (
          <MenuItem item={item} beingOrdered={beingOrdered} key={index} />
        ))}
        {/*looping through items in itemsList, index helps make sure we are looking at unique items each time*/}
      </div>

      <footer>
        <MenuLegend />
      </footer>
    </main>
  );
}
