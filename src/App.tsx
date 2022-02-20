import React, { useRef } from "react";
import "./global.css";
import SVGContainer from "./components/visiual/SVGContainer";
import FormContainer from "./components/normal/FormContainer";
import ReactDOM from "react-dom";
import { appendSVG, SVGConfig} from "./utils/SVGUtils";

const MainApp: React.FC = () => {
  const svgContainerRef = useRef();

  const addSVG = (config: SVGConfig) => {
    appendSVG(svgContainerRef.current, config);
  };
  return (
    <div className=" flex flex-row min-h-screen h-screen w-screen bg-gray-50">
      <SVGContainer ref={svgContainerRef} width={600} />
      <FormContainer addSVG={addSVG} />
    </div>
  );
};

export default () => {
  ReactDOM.render(<MainApp />, document.getElementById("root"));
};
