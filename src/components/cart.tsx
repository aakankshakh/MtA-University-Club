import React, { useState } from 'react';
import { MenuItemType } from '@/components/menu-item';
import CheckoutPage from '@/components/checkout';
import ThankYouPage from '@/pages/thankyou-page';

interface MenuItemTypeWithQuantity extends MenuItemType {
    quantity: number;
}

interface Props {
    cart: MenuItemTypeWithQuantity[];
    onClose: () => void;
    updateCart: (newCart: MenuItemTypeWithQuantity[]) => void;
}

export default function CartPage({ cart, onClose, updateCart }: Props) {
    const [cartItems, setCartItems] = useState<MenuItemTypeWithQuantity[]>(cart);
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    };

    const removeCartItem = (index: number) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
        updateCart(newCart);
    };

    const updateQuantity = (index: number, quantity: number) => {
        const newCart = cartItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity };
            }
            return item;
        });
        setCartItems(newCart);
        updateCart(newCart);
    };

    const incrementQuantity = (index: number) => {
        const newQuantity = cartItems[index].quantity + 1;
        updateQuantity(index, newQuantity);
    };

    const decrementQuantity = (index: number) => {
        const newQuantity = cartItems[index].quantity - 1;
        if (newQuantity > 0) {
            updateQuantity(index, newQuantity);
        } else {
            removeCartItem(index);
        }
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const clearCartAndCloseModal = () => {
        setCartItems([]);
        updateCart([]);
        setOrderPlaced(true);
    };

    const handleClose = () => {
                onClose();
            };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 dark:bg-gray-900 bg-opacity-50 flex justify-center items-center">
            {!orderPlaced ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)] overflow-y-auto w-full sm:w-1/2 relative">
                    <button className="absolute top-0 right-0 m-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400" onClick={onClose}>Close</button>
                    <h1 className="font-bold text-center text-5xl text-gray-900 dark:text-white mb-6">Your Cart</h1>
                    <div className="container mx-auto">
                        {cartItems.map((cartItem, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cartItem.name} - ${cartItem.price}</h2>
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
                        <button
                        className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                        onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <ThankYouPage onClose={onClose} />
            )}
            {showCheckout && <CheckoutPage onClose={handleClose} cartItems={cartItems} total={calculateTotalPrice()} clearCartAndCloseModal={clearCartAndCloseModal} />}
        </div>
    );
}

