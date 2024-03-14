import { MenuItemType } from '@/components/menu-item';

interface Props {
    cart: MenuItemType[];
    onRemove: (name: string) => void;
    onClose: () => void;
}

export default function CartPage({ cart, onRemove, onClose }: Props) {
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const checkout = () => {
        //I will implement the checkout logic later
        console.log('Checkout clicked!');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)] overflow-y-auto w-1/2 relative">
                <button className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700" onClick={onClose}>Close</button>
                <h1 className="font-bold text-center text-5xl mb-6">Your Cart</h1>
                <div className="container mx-auto">
                    {cart.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h2 className="text-xl font-bold mb-2">{item.name} - ${item.price}</h2>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onRemove(item.name)}>Remove</button>
                        </div>
                    ))}
                    <div className="font-bold text-xl mb-4">Total Price: ${calculateTotalPrice()}</div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={checkout}>Checkout</button>
                </div>
            </div>
        </div>
    );
}
