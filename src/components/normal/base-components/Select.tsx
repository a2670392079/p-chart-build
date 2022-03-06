import React, { Fragment, useState, ReactNode, useCallback, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export interface SelectOption {
  value: any;
  title: string | ReactNode;
}

interface SelectProps {
  value?: any;
  onChange?: (data: any) => void;
  options: Array<SelectOption>;
}
const Select: React.FC<SelectProps> = (props) => {
  const { value, onChange, options } = props;

  const [selected, setSelected] = useState(value);
  useEffect(() => {
    setSelected(value)
},[value])

  const handleChange = useCallback(
    (v) => {
      onChange && onChange(v);
      setSelected(v);
    },
    [onChange]
  );
  return (
    <div className="w-72 top-16">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1"  >
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {options.find((item) => item.value === value ?? selected)?.title}
              {
                !options.find((item) => item.value === value ?? selected) && <span className=" block truncate opacity-50">place select</span>
              }
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
              {options.map((item, personIdx) => (
                <Listbox.Option
                  key={item.value}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};


export default Select