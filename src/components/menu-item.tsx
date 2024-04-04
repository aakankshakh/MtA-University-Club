import { MenuItemType } from "@/lib/types";
import { TrashIcon } from "@heroicons/react/24/outline";

// Giving multiple pages the ability to access it
type MenuItemProps = {
  item: MenuItemType;
  beingOrdered: boolean; // to display add to order span if the items are being ordered
  removedItem?: (item: MenuItemType) => void; // to remove an item from the menu
  // staffView: boolean; // a staff will see list of everything alongside the last time it was served
};

const Badges = (item: MenuItemType) => {
  return (
    <span className="ml-4 text-sm">
      {item.isVegan && (
        <span className="mr-2 font-bold bg-green-500 text-white px-2 py-1 rounded">
          v
        </span>
      )}
      {item.isVegetarian && item.isVegan == false && (
        <span className="mr-2 font-bold bg-blue-500 text-white px-2 py-1 rounded">
          v
        </span>
      )}
      {item.isGlutenFree && (
        <span className="mr-2 bg-yellow-500 font-bold text-white px-2 py-1 rounded">
          gf
        </span>
      )}
      {item.isDairyFree && (
        <span className="mr-2 bg-orange-500 font-bold text-white px-2 py-1 rounded">
          df
        </span>
      )}
    </span>
  );
};

export default function MenuItem(props: MenuItemProps) {
  // Creating local variables to store props
  const { item, beingOrdered, removedItem } = props;

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">
        {beingOrdered && (
          <button
            className="mr-2 h-5 w-5 text-red-700 dark:text-red-500"
            onClick={() => removedItem && removedItem(item)}
          >
            <TrashIcon className="h-full w-full" />
          </button>
        )}
        {item.name} - ${item.price}
        <Badges {...item} />
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {item.description}
      </p>
    </div>
  );
}
