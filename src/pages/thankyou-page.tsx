import React from 'react';

interface Props {
    onClose: () => void;
}

const ThankYouPage: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)] overflow-y-auto w-1/2 relative">
            <button className="absolute top-0 right-0 m-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400" onClick={onClose}>Close</button>
            <h1 className="font-bold text-center text-5xl text-gray-900 dark:text-white mb-6">Order Placed</h1>
            <p className="text-green-500 font-bold text-center mb-6">Thank you for your order</p>
        </div>
    );
};

export default ThankYouPage;
