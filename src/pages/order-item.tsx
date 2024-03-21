import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MenuItemType } from '@/components/menu-item';
import CartPage from '@/components/cart';
import PageHeader, { HeaderItem } from '@/components/page-header';

const headerItems : HeaderItem[] =
  [{pageName: "Home", pageLink: "/"}, {pageName: "View Menu", pageLink: "/view-menu"}];

const callToAction : HeaderItem =
  {pageName: "Sign up", pageLink: "/sign-up"};



export default function OrderItemPage() {
    const [cart, setCart] = useState<MenuItemType[]>([]);
    const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
    const [addedMessage, setAddedMessage] = useState<{ [key: string]: string }>({});
    


    const addToCart = (item: MenuItemType) => {
        setCart(prevCart => [...prevCart, item]);
        setAddedToCart(prev => ({ ...prev, [item.name]: true }));
        setAddedMessage(prev => ({ ...prev, [item.name]: 'Added to cart' }));
        setTimeout(() => {
            setAddedMessage(prev => ({ ...prev, [item.name]: '' }));
        }, 500);
    };


    const toggleCartModal = () => {
        setIsCartModalOpen(prev => !prev);
    };

    const updateCart = (newCart: MenuItemType[]) => {
        setCart(newCart);
    };

    const menuItems: MenuItemType[] = [
        { name: "Butter Chicken", price: 17.00, description: "Yummy food! Chicken, butter, cream, ...", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false},
        { name: "Shahi Paneer", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: true, isDairyFree: false},
        { name: "Organic Parsnip, Carrot & Apple Soup", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: true, isVegan: true, isVegetarian: true, isDairyFree: false},
        { name: "Garden Salad w/ Balsamic Vinaigrette", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: true, isVegan: true, isVegetarian: true, isDairyFree: false},
        { name: "Albacore Tuna Cheddar Melt on Ciabatta w/ Chips & Slaw", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false},
        { name: "Tourtiere w/ Greens", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false},
        { name: "Chocolate Swirl Cheesecake w/ Organic Raspberry Sauce", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false}
    ];    

    return (
        <main className="dark:bg-gray-800">
            <PageHeader headerItems={headerItems} callToAction={callToAction}/>
            <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 px-4 py-2 mb-4">
                <h1 className="font-bold text-xl">Order Items</h1>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 dark:text-white mr-2 cursor-pointer" onClick={toggleCartModal} />
                    <span>{cart.length}</span>
                </div>
            </div>
            <div className="container mx-auto py-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 py-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name} - ${item.price}</h2>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                        <div>
                            {addedMessage[item.name] && <p className="text-gray-500">{addedMessage[item.name]}</p>}
                            <button
                                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded"
                                onClick={() => addToCart(item)}
                            >
                                {addedMessage[item.name] ? 'Added' : 'Add to Order'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isCartModalOpen && <CartPage cart={cart} onClose={toggleCartModal} updateCart={updateCart} />}
        </main>
    );
}


