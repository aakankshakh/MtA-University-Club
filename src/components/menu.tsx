import { MenuItemType, MenuType } from "@/lib/types";
import MenuItem from "./menu-item";
import MenuLegend from "./menu-legend";

// Giving multiple pages the ability to access it
type MenuProps = {
  menu: MenuType;
  beingOrdered: boolean;
  removedItem?: (item: MenuItemType) => void;
  //addToCart: (item: MenuItemType) => void; // Add this line
};

export default function Menu(props: MenuProps) {
  // Creating local variables to store props
  const { menu, beingOrdered, removedItem } = props;
  const today = new Date();

  return (
    <main className="bg-white dark:bg-gray-900 p-8 h-full flex flex-col">
      <div className="flex-none flex flex-col">
        <h1 className="font-bold text-5xl text-center">Current Menu</h1>
        <h3 className="italic text-center">{today.toLocaleDateString()}</h3>
      </div>
      <div className="flex-grow">
        {menu.items.map((item, index) => (
          <MenuItem
            item={item}
            beingOrdered={beingOrdered}
            removedItem={removedItem}
            key={index}
          />
        ))}
        {/*looping through items in itemsList, index helps make sure we are looking at unique items each time*/}
      </div>

      <footer className="flex-none bg-gray-100 dark:bg-gray-800 px-8 py-4 rounded">
        <MenuLegend />
      </footer>
    </main>
  );
}
