import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartPage from "@/components/cart";
import { MenuItemType, MenuType } from "@/lib/types";
import Header from "@/components/header";

export interface MenuItemTypeWithQuantity extends MenuItemType {
  quantity: number;
}

export default function OrderPage() {
  const [menu, setMenu] = useState<MenuType | null>(null);
  const [cart, setCart] = useState<MenuItemTypeWithQuantity[]>([]);
  const [addedMessage, setAddedMessage] = useState<{ [key: string]: string }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch menu data from the API
    fetch("/api/get-todays-menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const addToCart = (item: MenuItemType) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }

    setAddedMessage((prev) => ({ ...prev, [item.name]: "Added to cart" }));
    setTimeout(() => {
      setAddedMessage((prev) => ({ ...prev, [item.name]: "" }));
    }, 500);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen((prev) => !prev);
  };

  const updateCart = (newCart: MenuItemTypeWithQuantity[]) => {
    setCart(newCart);
  };

//creating an order
const createOrder = async (order: MenuItemTypeWithQuantity[]) => {
  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("Order created:", data);
    alert("Order created successfully!");
  } catch (error) {
    console.error('Error creating order:', error);
    // Handle error gracefully, such as displaying an error message to the user
    alert("There was a problem with creating the order. Please try again later.");
  }
};

  return (
    <main className="bg-white dark:bg-gray-900">
      <Header />
      <div className="sticky top-0 bg-gray-200 dark:bg-gray-700 px-4 py-2 mb-4 z-10 flex justify-between items-center">
        <h1 className="font-bold text-xl">Order Food</h1>
        <div className="flex items-center">
          <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-gray-600 dark:text-white ml-2 cursor-pointer"
            onClick={toggleCartModal}
          />
        </div>
      </div>
      <div className="container mx-auto py-8">
        {menu &&
          menu.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 dark:border-gray-600 py-4"
            >
              <div className="mb-4 sm:mb-0 sm:mr-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.name} - ${item.price}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
              <div>
                {addedMessage[item.name] && (
                  <p className="text-gray-500">{addedMessage[item.name]}</p>
                )}
                <button
                  className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                  onClick={() => addToCart(item)}
                >
                  {addedMessage[item.name] ? "Added" : "Add to Order"}
                </button>
              </div>
            </div>
          ))}
      </div>
      {isCartModalOpen && (
        <CartPage cart={cart} onClose={toggleCartModal} updateCart={updateCart} createOrder={createOrder} />
      )}
    </main>
  );
}
