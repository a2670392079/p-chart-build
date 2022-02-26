import { InputHTMLAttributes } from "react";
import { Basic, generator } from "./CreateBaseComponents";

export const Button = generator({
  suffixCls: {
    default:
      "inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 max-w-max",
  },
  tagName: "button",
  displayName: "Button",
})(Basic);

export const Input = generator(
  {
    suffixCls: {
      default:
        "focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md sm:text-sm pl-5 pr-5",
    },
    tagName: "input",
    displayName: "Input",
  },
  (props, suffixCls) => {
    switch ((props as InputHTMLAttributes<any>).type) {
      default:
        return suffixCls["default"];
    }
  }
)(Basic);


export const Label = generator({
  suffixCls:{
    default: "block text-sm font-medium text-gray-700",
    middle: "text-sm font-medium text-gray-700 transform translate-x-5 translate-y-2 pl-2 pr-2 bg-white block w-max"
  },
  tagName: 'label',
  displayName: 'Label'
})(Basic);
