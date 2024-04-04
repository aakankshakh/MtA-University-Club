// Place for the staff to create a new menu, by adding new items to it, reviewing it, and finalizing it as that day's menu
// We also want them to be able to access a list of previous meals they've made - a component here would be helpful
// use isModifiable boolean value to determine
// FUTURE TO DO: add different sections for drinks, meal, dessert

import Header from "@/components/header";
import Menu from "@/components/menu";
import { CreateMenuType } from "@/lib/types";
import { useState } from "react";

export default function createMenuPage() {
  const [currMenu, setCurrMenu] = useState<CreateMenuType>({ itemIDs: [] });
  return (
    <main>
      <Header />
      <div className="flex flex-col">
        <div>
          <h1 className="font-bold text-center text-5xl">Add Menu Item</h1>

          <div className="container mx-auto py-8">
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Dietary Options
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="ml-2">Vegan</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="ml-2">Vegetarian</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="ml-2">Gluten-Free</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="ml-2">Dairy-Free</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
        <div>
          <Menu menu={currMenu} beingOrdered={false} />
        </div>
      </div>
    </main>
  );
}
