import React from "react";
import { SVGConfig } from "../../utils/SVGUtils";
import {Button} from './base-components/BaseComponents';
import CreateSVGDialog from './form-components/CreateSVGDialog'

interface FormContainerProps {
  addSVG: (config: SVGConfig) => void;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const {addSVG} = props;
  return (
    <div className=" flex-grow overflow-auto mx-12 mt-12 p-4 min-h-screen">
      <CreateSVGDialog onOk={(v) => console.log(v)} />
    </div>
  );
};

export default FormContainer;
