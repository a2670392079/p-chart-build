import { Basic, generator } from "./CreateBaseComponents";

export const Button = generator({
  suffixCls: {
    default:
      "inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 max-w-max",
  },
  tagName: "button",
  displayName: "Button",
})(Basic);
