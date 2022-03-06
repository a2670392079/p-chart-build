import React, { ReactNode, useState } from "react";
import { Tab, Transition } from "@headlessui/react";

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(" ");
}

interface PanelProps {
  key: string;
  className?: string;
}

export const CusPanel: React.FC<PanelProps> = (props) => {
  const { key, className, children, ...rest } = props;
  return (
    <Tab.Panel
      key={key}
      className={classNames(
        "bg-white rounded-xl p-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
        className
      )}
      {...rest}
    >
      {children}
    </Tab.Panel>
  );
};

export const CusTab: React.FC<PanelProps> = (props) => {
  const { key, className, children, ...rest } = props;
  return (
    <Tab
      key={key}
      className={({ selected }) =>
        classNames(
          "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
          selected
            ? "bg-white shadow"
            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
      {...rest}
    >
      {children}
    </Tab>
  );
};

export const CusList: React.FC = (props:any) => {
  const { children, ...rest } = props;
  return (
    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
      {children}
    </Tab.List>
  );
};
