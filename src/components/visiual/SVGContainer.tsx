import React, { forwardRef } from "react";

interface SVGContainerProps {
  width: number;
}

const SVGContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SVGContainerProps
> = (props, ref) => {
  return (
    <div
      ref={ref}
      style={{ width: props.width }}
      className=" overflow-auto bg-slate-300 flex flex-col mx-12 mt-12 min-h-screen"
    >
        svg 容器
    </div>
  );
};

export default forwardRef<HTMLDivElement, SVGContainerProps>(SVGContainer);
