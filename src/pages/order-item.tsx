
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MenuItemType } from '@/components/menu-item';
import CartPage from './cart';

export default function OrderItemPage() {
    const [cart, setCart] = useState<MenuItemType[]>([]);
    const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

    const addToCart = (item: MenuItemType) => {
        setCart(prevCart => [...prevCart, item]);
        setAddedToCart(prev => ({ ...prev, [item.name]: true }));
    };

    const removeFromCart = (name: string) => {
        const updatedCart = cart.filter(item => item.name !== name);
        setCart(updatedCart);
        setAddedToCart(prev => ({ ...prev, [name]: false }));
    };

    const toggleCartModal = () => {
        setIsCartModalOpen(prev => !prev);
    };

    const menuItems: MenuItemType[] = [
        { name: "Butter Chicken", price: 17.00, description: "Yummy food! Chicken, butter, cream, ...", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false },
        { name: "Shahi Paneer", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: true, isDairyFree: false },
        { name: "Organic Parsnip, Carrot & Apple Soup", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: true, isVegan: true, isVegetarian: true, isDairyFree: false },
        { name: "Garden Salad w/ Balsamic Vinaigrette", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: true, isVegan: true, isVegetarian: true, isDairyFree: false },
        { name: "Albacore Tuna Cheddar Melt on Ciabatta w/ Chips & Slaw", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false },
        { name: "Tourtiere w/ Greens", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false },
        { name: "Chocolate Swirl Cheesecake w/ Organic Raspberry Sauce", price: 15.00, description: "Yummy food", 
        lastServed: new Date(), isGlutenFree: false, isVegan: false, isVegetarian: false, isDairyFree: false }

    ];

    return (
        <main>
            <div className="flex items-center justify-between bg-gray-200 px-4 py-2 mb-4">
                <h1 className="font-bold text-xl">Order Items</h1>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 mr-2 cursor-pointer" onClick={toggleCartModal} />
                    <span>{cart.length}</span>
                </div>
            </div>
            <div className="container mx-auto py-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-300 py-4">
                        <div>
                            <h2 className="text-xl font-bold">{item.name} - ${item.price}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                        {addedToCart[item.name] ? (
                            <button
                                className="px-4 py-2 bg-gray-500 text-gray-300 rounded cursor-pointer"
                                onClick={() => removeFromCart(item.name)}
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => addToCart(item)}
                            >
                                Add to Order
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {isCartModalOpen && <CartPage cart={cart} onRemove={removeFromCart} onClose={toggleCartModal} />}
        </main>
    );
}
