import React from "react";
import { useMemo } from "react";

export interface BasicProps extends React.HTMLAttributes<HTMLElement | HTMLLabelElement> {
  prefixCls?: string;
  classType?: string;
}

export type TagName = "button" | "input" | "label";

interface BasicPropsWithTagName extends BasicProps {
  tagName: TagName;
}

export interface GeneratorProps {
  suffixCls: Record<string, string>;
  tagName: TagName;
  displayName: string;
}

export const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = `${prefixCls} ${className ?? ""}`;
  return React.createElement(
    tagName,
    { className: classString, ...others },
    children
  );
};

export const generator = (
  { suffixCls, displayName, tagName }: GeneratorProps,
  adapterProps?: (
    props: BasicProps,
    suffixCls: Record<string, string>
  ) => string
) => {
  return (BasicComponent: typeof Basic) => {
    const Adapter: React.Factory<BasicProps|any> = (props) => {
      const { classType } = props;

      const prefixCls = () => {
        if (typeof adapterProps === "function") {
          return adapterProps(props, suffixCls);
        }
        return suffixCls[classType] ?? suffixCls["default"] ?? "";
      };
      return (
        <BasicComponent prefixCls={prefixCls()} tagName={tagName} {...props} />
      );
    };

    return Adapter;
  };
};
