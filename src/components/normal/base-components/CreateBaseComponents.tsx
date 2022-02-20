import React from "react";

export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  classType?: string;
}

export type TagName = "button";

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

export const generator = ({ suffixCls, displayName, tagName }: GeneratorProps) => {
  return (BasicComponent: typeof Basic) => {
    const Adapter: React.Factory<BasicProps> = (props) => {
      const { classType } = props;

      const prefixCls = suffixCls[classType] ?? suffixCls["default"] ?? "";
      return (
        <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />
      );
    };

    return Adapter;
  };
};

