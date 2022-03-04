import React, { forwardRef } from "react";
import "./style.css";

interface SVGContainerProps {
  width: number;
}

const SVGContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SVGContainerProps
> = (props, ref) => {
  return (
    <>
      <div
        ref={ref}
        style={{ width: props.width }}
        className=" overflow-auto flex flex-col mx-12 svg-container min-h-full border-r-2 border-gray-300 pt-12 flex-grow"
      >
        <strong>svg container</strong>
      </div>
    </>
  );
};

export default forwardRef<HTMLDivElement, SVGContainerProps>(SVGContainer);
