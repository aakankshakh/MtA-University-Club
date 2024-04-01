import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartPage from '@/components/cart';
import PageHeader, { HeaderItem } from '@/components/page-header';
import { MenuItemType } from '@/components/menu-item';

interface MenuItemTypeWithQuantity extends MenuItemType {
    quantity: number;
}

const headerItems: HeaderItem[] = [{ pageName: "Home", pageLink: "/" }, { pageName: "View Menu", pageLink: "/view-menu" }];
const callToAction: HeaderItem = { pageName: "Sign up", pageLink: "/sign-up" };

export default function OrderItemPage() {
    const [cart, setCart] = useState<MenuItemTypeWithQuantity[]>([]);
    const [addedMessage, setAddedMessage] = useState<{ [key: string]: string }>({});
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

    const addToCart = (item: MenuItemType) => {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

        if (existingItemIndex !== -1) {
            const updatedCart = cart.map((cartItem, index) =>
                index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
        }

        setAddedMessage(prev => ({ ...prev, [item.name]: 'Added to cart' }));
        setTimeout(() => {
            setAddedMessage(prev => ({ ...prev, [item.name]: '' }));
        }, 500);
    };

    const toggleCartModal = () => {
        setIsCartModalOpen(prev => !prev);
    };

    const updateCart = (newCart: MenuItemTypeWithQuantity[]) => {
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
    
        <main className="bg-white dark:bg-gray-800">
            <PageHeader headerItems={headerItems} callToAction={callToAction} />
            <div className="sticky top-0 bg-gray-200 dark:bg-gray-700 px-4 py-2 mb-4 z-10 flex justify-between items-center">
                <h1 className="font-bold text-xl">Order Food</h1>
                <div className="flex items-center">
                    <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 dark:text-white ml-2 cursor-pointer" onClick={toggleCartModal} />
                </div>
            </div>
            <div className="container mx-auto py-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 dark:border-gray-600 py-4">
                        <div className="mb-4 sm:mb-0 sm:mr-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name} - ${item.price}</h2>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                        <div>
                            {addedMessage[item.name] && <p className="text-gray-500">{addedMessage[item.name]}</p>}
                            <button
                                className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
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

