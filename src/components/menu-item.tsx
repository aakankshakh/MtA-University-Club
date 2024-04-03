import { MenuItemType } from "@/lib/types";

// Giving multiple pages the ability to access it
type MenuItemProps = {
  item: MenuItemType;
  beingOrdered: boolean; // to display add to order button if the items are being ordered
  // staffView: boolean; // a staff will see list of everything alongside the last time it was served
};

export default function MenuItem(props: MenuItemProps) {
  // Creating local variables to store props
  const { item, beingOrdered } = props;
  return (
    <main>
      <h2 className="text-xl font-bold">
        {item.name} - ${item.price}
      </h2>
      <p className="text-gray-600">{item.description}</p>
      <div className="mb-4 ">
        {item.isVegan && (
          <button className="mr-2 bg-green-500 text-white px-2 py-1 rounded">
            v
          </button>
        )}
        {item.isVegetarian && item.isVegan == false && (
          <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
            V
          </button>
        )}
        {item.isGlutenFree && (
          <button className="bg-yellow-500 text-white px-2 py-1 rounded">
            gf
          </button>
        )}
        {item.isDairyFree && (
          <button className="bg-orange-500 text-white px-2 py-1 rounded">
            df
          </button>
        )}
      </div>
    </main>
  );
}
