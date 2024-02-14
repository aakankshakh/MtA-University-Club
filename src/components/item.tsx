export type MenuItemType = {
    name: string;
    price: number;
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
        <h3>
            {item.name}
        </h3>

        <h3>
            Price: ${item.price}
            {/* 
            * only print this if isModifiable! or if we're looking at prev. items
            * Last served: {item.lastServed.toLocaleDateString()}*/}
        </h3>
    </main>
    )
} 