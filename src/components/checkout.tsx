import React, { useState } from "react";
import { MenuItemTypeWithQuantity } from "@/pages/order"; // Import MenuItemTypeWithQuantity from OrderPage

interface Props {
  onClose: () => void;
  cartItems: MenuItemTypeWithQuantity[];
  total: number;
  clearCartAndCloseModal: () => void;
  createOrder: (order: MenuItemTypeWithQuantity[]) => void;
}

const CheckoutPage: React.FC<Props> = ({
  onClose,
  cartItems,
  total,
  clearCartAndCloseModal,
  createOrder,
}) => {
  const [orderType, setOrderType] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [specifications, setSpecifications] = useState<string>("");

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => { // Pass the event parameter
    e.preventDefault(); // Prevent default form submission behavior

    setIsProcessing(true);
    
    // Construct the order object including orderType and specifications
    const order: MenuItemTypeWithQuantity[] = cartItems.map((item) => ({
      ...item,
      orderType: orderType, // Add orderType to each item
      specifications: specifications, // Add specifications to each item
    }));

    createOrder(order); // Pass the constructed order to createOrder function

    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCartAndCloseModal();
    }, 2000);
  };

  const isOrderTypeSelected = () => {
    return orderType !== "";
  };

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 dark:bg-gray-900 bg-opacity-50 flex justify-center items-center">
        {!orderPlaced ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)] overflow-y-auto w-full sm:w-1/2 relative">
            <button
              className="absolute top-0 right-0 m-4 bg-red-900 font-bold hover:text-white-700 text-white"
              onClick={onClose}
            >
              Back to Cart
            </button>
            <h1 className="font-bold text-center text-5xl text-gray-900 dark:text-white mb-6">
              Checkout
            </h1>
            <div className="container mx-auto">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              {cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2"
                >
                  <p>
                    {cartItem.name} - Quantity: {cartItem.quantity}
                  </p>
                  <p className="mt-2 sm:mt-0">
                    ${cartItem.price * cartItem.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 py-2">
                <p className="font-bold">Total:</p>
                <p className="font-bold">${total}</p>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="orderType" className="font-bold mb-2">
                  Order Type:<span className="text-red-500">*</span>
                </label>
                <select
                  id="orderType"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="takeout">Takeout</option>
                  <option value="eatIn">Eat-in</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="specifications" className="font-bold mb-2">
                  Specifications for the Chef:
                </label>
                <textarea
                  id="specifications"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  placeholder="Write specifications for the chef..."
                ></textarea>
              </div>
              {isProcessing ? (
                <p className="text-blue-500 font-bold">Processing order...</p>
              ) : orderPlaced ? (
                <p className="text-green-500 font-bold">
                  Thank you for your order
                </p>
              ) : (
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md ${!isOrderTypeSelected() && "opacity-50 cursor-not-allowed"
                    }`}
                  disabled={!isOrderTypeSelected()}
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default CheckoutPage;
