import type {MenuItemType} from "./menu-item";
import MenuItem from "./menu-item";
import MenuLegend from "./menu-legend";

export type MenuType = {
    itemsList: MenuItemType[];
}
    

// Giving multiple pages the ability to access it
type MenuProps = {
    menu: MenuType;
    beingOrdered: boolean;
}

export default function Menu(props: MenuProps) {
    // Creating local variables to store props
    const {menu, beingOrdered} = props;
    const today = new Date();
    return (
    <main>
        <h1 className ="font-bold text-5xl text-center">
            University Club Menu
        </h1>
        <h3 className = "italic text-center">
            {today.toLocaleDateString()}
        </h3>
        <div>
            {menu.itemsList.map((item, index) => <MenuItem item={item} beingOrdered={beingOrdered} key={index}/>) }
            {/*looping through items in itemsList, index helps make sure we are looking at unique items each time*/}
        </div>
        
        <footer>
            <MenuLegend/>
        </footer>
    </main>
    )
} 