export type MenuItemType = {
    name: string;
    price: number;
    description: string;
    lastServed: Date;
    // booleans: Gluten-free, vegan, vegetarian, dairy-free
    isGlutenFree: boolean;
    isVegan: boolean;
    isVegetarian: boolean;
    isDairyFree: boolean;
}

// Giving multiple pages the ability to access it
type MenuItemProps = {
    item: MenuItemType;
    isModifiable: boolean;
}

export default function MenuItem(props: MenuItemProps) {
    // Creating local variables to store props
    const {item, isModifiable} = props;
    return (
    <main>
        <h2 className="text-xl font-bold">{item.name} - ${item.price}</h2>
            <p className="text-gray-600">{item.description}</p>
            <div className="mb-4 ">
              {item.isVegan && (
                <button className="mr-2 bg-green-500 text-white px-2 py-1 rounded">Vegan</button>
              )}
              {item.isVegetarian && (
                <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Vegetarian</button>
              )}
              {item.isGlutenFree && (
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Gluten-free</button>
              )}
              {item.isDairyFree && (
                <button className="bg-orange-500 text-white px-2 py-1 rounded">Dairy-free</button>
              )}

            </div>
        {/* 
        <h3 className="font-medium indent-10">
            {item.name}
        </h3>

        <h3 className="italic indent-16">
            Price: ${item.price}
            {/* 
            * only print this if isModifiable! or if we're looking at prev. items
            * Last served: {item.lastServed.toLocaleDateString()}
        </h3>
        {item.isGlutenFree === true && <button className="px-4 py-2 bg-gray-500 rounded-full">Gluten-free</button>}
        {item.isVegan === true && <button className="px-4 py-2 bg-gray-500 rounded-full">Vegan</button>}
        {item.isVegetarian === true && item.isVegan == false && <button className="px-4 py-2 bg-gray-500 rounded-full">Vegetarian</button>}
        {item.isDairyFree === true && <button className="px-4 py-2 bg-gray-500 rounded-full">Dairy-free</button>}
        */}
    </main>
    )
} 