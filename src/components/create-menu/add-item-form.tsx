import { CreateMenuItemType, MenuItemType } from "@/lib/types";
import { useState } from "react";
import SearchExistingItemsInput from "./search-existing-items";

type AddItemFormProps = {
  defaults: CreateMenuItemType;
  existingItems: MenuItemType[];
  onSubmit: (item: CreateMenuItemType) => void;
};

export default function AddItemForm(props: AddItemFormProps) {
  const { defaults, onSubmit } = props;
  const [name, setName] = useState(defaults.name);
  const [description, setDescription] = useState(defaults.description);
  const [price, setPrice] = useState(defaults.price);
  const [isVegan, setIsVegan] = useState(defaults.isVegan);
  const [isVegetarian, setIsVegetarian] = useState(defaults.isVegetarian);
  const [isGlutenFree, setIsGlutenFree] = useState(defaults.isGlutenFree);
  const [isDairyFree, setIsDairyFree] = useState(defaults.isDairyFree);

  const didSelectName = (name: string) => {
    // Check if the name is already in the list of existing items
    const existingItem = props.existingItems.find((item) => item.name === name);

    // If the item is found, set the form fields to the existing item's values
    if (existingItem) {
      setName(existingItem.name);
      setDescription(existingItem.description);
      setPrice(existingItem.price);
      setIsVegan(existingItem.isVegan);
      setIsVegetarian(existingItem.isVegetarian);
      setIsGlutenFree(existingItem.isGlutenFree);
      setIsDairyFree(existingItem.isDairyFree);
    } else {
      // Otherwise, just set the name
      setName(name);
    }
  };

  return (
    <form className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-100 font-bold mb-2"
        >
          Name
        </label>
        <SearchExistingItemsInput
          existingItemNames={props.existingItems.map((item) => item.name)}
          onSelect={didSelectName}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 dark:text-gray-100 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-gray-700 dark:text-gray-100 font-bold mb-2"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          // Add a dollar sign!
          value={`$${price}`}
          // Remove the dollar sign, then parse the price as an integer, before we set the variable.
          onChange={(e) => setPrice(parseInt(e.target.value.substring(1)))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-100 font-bold mb-2">
          Dietary Options
        </label>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              value={isVegan ? "true" : "false"}
              onChange={(e) => setIsVegan(e.target.checked)}
            />
            <span className="ml-2">Vegan</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              value={isVegetarian ? "true" : "false"}
              onChange={(e) => setIsVegetarian(e.target.checked)}
            />
            <span className="ml-2">Vegetarian</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              value={isGlutenFree ? "true" : "false"}
              onChange={(e) => setIsGlutenFree(e.target.checked)}
            />
            <span className="ml-2">Gluten-Free</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              value={isDairyFree ? "true" : "false"}
              onChange={(e) => setIsDairyFree(e.target.checked)}
            />
            <span className="ml-2">Dairy-Free</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={(e) => {
          e.preventDefault();

          onSubmit({
            name,
            description,
            price,
            isVegan,
            isVegetarian,
            isGlutenFree,
            isDairyFree,
          });
        }}
      >
        Add Item
      </button>
    </form>
  );
}
