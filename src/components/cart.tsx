import React, { useState } from 'react';
import { MenuItemType } from '@/components/menu-item';
import CheckoutPage from '@/components/CheckoutPage';
import ThankYouPage from '@/pages/ThankyouPage';

interface Props {
    cart: MenuItemType[];
    onClose: () => void;
    updateCart: (newCart: MenuItemType[]) => void;
}

export default function CartPage({ cart, onClose, updateCart }: Props) {
    const [cartItems, setCartItems] = useState<{ item: MenuItemType; quantity: number }[]>(() => {
        return cart.map(item => ({ item, quantity: 1 }));
    });
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
    };

    const removeCartItem = (index: number) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems.splice(index, 1);
            return updatedCartItems;
        });
        updateCart(cart.filter((_, i) => i !== index));
    };

    const incrementQuantity = (index: number) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.map((item, i) => {
                if (i === index) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            return updatedCartItems;
        });
    };
    
    const decrementQuantity = (index: number) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.map((item, i) => {
                if (i === index && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            if (updatedCartItems[index].quantity === 1) {
                removeCartItem(index);
            }

            return updatedCartItems;
        });
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    // Function to clear the cart, set orderPlaced to true, and close the modal
    const clearCartAndCloseModal = () => {
        setCartItems([]);
        updateCart([]);
        onClose();
        setOrderPlaced(true);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 dark:bg-gray-900 bg-opacity-50 flex justify-center items-center">
            {!orderPlaced ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)] overflow-y-auto w-1/2 relative">
                    <button className="absolute top-0 right-0 m-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400" onClick={onClose}>Close</button>
                    <h1 className="font-bold text-center text-5xl text-gray-900 dark:text-white mb-6">Your Cart</h1>
                    <div className="container mx-auto">
                        {cartItems.map((cartItem, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cartItem.item.name} - ${cartItem.item.price}</h2>
                                    <div className="flex items-center">
                                        <button className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded-full mr-2" onClick={() => decrementQuantity(index)}>-</button>
                                        <span>{cartItem.quantity}</span>
                                        <button className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded-full ml-2" onClick={() => incrementQuantity(index)}>+</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-full ml-2" onClick={() => removeCartItem(index)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Total Price: ${calculateTotalPrice()}</div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            ) : (
                <ThankYouPage onClose={onClose} />
            )}
            {showCheckout && <CheckoutPage onClose={clearCartAndCloseModal} cartItems={cartItems} total={calculateTotalPrice()} clearCartAndCloseModal={clearCartAndCloseModal} />}
        </div>
    );
}
