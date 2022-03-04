import React, { useCallback, useRef } from "react";
import { Graphic } from "../../graphic/graphic";
import { SVGConfig } from "../../utils/SVGUtils";
import { Button } from "./base-components/BaseComponents";
import CreateSVGDialog from "./form-components/CreateSVGDialog";
import './style.css'

interface FormContainerProps {
  addSVG: () => HTMLDivElement;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { addSVG } = props;
  const graphicRef = useRef<Array<Graphic>>([]);

  const handleOk = useCallback((config: SVGConfig) => {
    if (!graphicRef.current.find((graphic) => graphic.uniKey === config.id)) {
      graphicRef.current.push(new Graphic(config, addSVG));
    }
  }, []);
  return (
    <div className=" overflow-auto mx-12 pt-12 min-h-screen form-contianer">
      <CreateSVGDialog onOk={handleOk} />
    </div>
  );
};

export default FormContainer;
