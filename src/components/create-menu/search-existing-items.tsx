import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MenuItemType } from "@/lib/types";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

type SearchExistingProps = {
  existingItemNames: string[];
  onSelect: (itemName: string) => void;
};
export default function SearchExistingItemsInput(props: SearchExistingProps) {
  const { existingItemNames, onSelect } = props;
  const [selected, setSelected] = useState(existingItemNames[0]);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? existingItemNames
      : existingItemNames.filter((itemName) =>
          itemName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        console.log("Selected:", value);
        setSelected(value);
        onSelect(value);
      }}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(itemName: string) => itemName}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredItems.length === 0 && query !== "" ? (
              <Combobox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-600 text-white" : "text-gray-900"
                  }`
                }
                value={query}
              >
                New item: &quot;{query}&quot;
              </Combobox.Option>
            ) : (
              filteredItems.map((itemName, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={itemName}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {itemName}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
