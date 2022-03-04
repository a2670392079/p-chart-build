import React, { Attributes, ReactNode, useCallback } from "react";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<any>;
  renderItem: (item: any) => ReactNode;
  key: string | ((item: any) => string);
}
const List: React.FC<ListProps> = (props) => {
  const { data, renderItem, key, ...rest } = props;
  const getKey = useCallback(
    (item: any) => {
      if (typeof key === "function") {
        return key(item);
      }
      return item[key];
    },
    [key]
  );
  return (
    <div {...rest}>
      {data.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
};
