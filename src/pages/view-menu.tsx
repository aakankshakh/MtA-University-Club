import Menu, { MenuType } from "@/components/menu";
import PageHeader, { HeaderItem } from "@/components/page-header";

// Hard coded menu to test the display
const menu : MenuType = {
  itemsList: [
    {name: "Butter Chicken", price: 17.00, description: "yummy food! chicken, butter, cream, ...", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: false,
    isDairyFree: false
    },
    {name: "Shahi Paneer", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: true,
    isDairyFree: false
    },
    {name: "Organic Parsnip, Carrot & Apple Soup", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: true, isVegan: true, isVegetarian: true,
    isDairyFree: false
    },
    {name: "Garden Salad w/ Balsamic Vinaigrette", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: true, isVegan: true, isVegetarian: true,
    isDairyFree: false
    },
    {name: "Albacore Tuna Cheddar Melt on Ciabatta w/ Chips & Slaw", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: false,
    isDairyFree: false
    },
    {name: "Tourtiere w/ Greens", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: false,
    isDairyFree: false
    },
    {name: "Chocolate Swirl Cheesecake w/ Organic Raspberry Sauce", price: 15.00, description: "yummy food", lastServed: new Date(),
    isGlutenFree: false, isVegan: false, isVegetarian: false,
    isDairyFree: false
    }
  ]
};

const headerItems : HeaderItem[] =
  [{pageName: "Home", pageLink: "/"}, {pageName: "Sign up", pageLink: "/sign-up"}];

const callToAction : HeaderItem =
  {pageName: "Sign in", pageLink: "/sign-in"};

export default function ViewMenuPage() {
    return (
        <main>
            <PageHeader headerItems={headerItems} callToAction={callToAction}/>
            <Menu beingOrdered={false} menu={menu} />
        </main>
        
    )
}