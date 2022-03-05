import React, { ReactNode, useCallback, useMemo } from "react";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<any>;
  renderItem: (item: any) => ReactNode;
  uniKey: string | ((item: any) => string);
}
const List: React.FC<ListProps> = (props) => {
  const { data, renderItem, uniKey, ...rest } = props;
  const getKey = useCallback((item: any) => {
    if (typeof uniKey === "function") {
      return uniKey(item) ?? '';
    }
    return item[uniKey] ?? '';
  }, [])

  // const getKey = (item: any) => {
  //   if (typeof uniKey === "function") {
  //     return uniKey(item);
  //   }
  //   return item[uniKey] ;
  // };


  return (
    <div {...rest}>
      {data.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default List;
