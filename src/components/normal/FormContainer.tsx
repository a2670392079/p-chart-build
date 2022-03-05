import React, { useCallback, useRef, useState } from "react";
import { Graphic } from "../../graphic/graphic";
import { SVGConfig } from "../../utils/SVGUtils";
import List from "../normal/base-components/List";
import CreateSVGDialog from "./form-components/CreateSVGDialog";
import "./style.css";
import GraphicPanel from './base-components/GraphicPanel';

interface FormContainerProps {
  addSVG: () => HTMLDivElement;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { addSVG } = props;
  const graphicRef = useRef<Array<Graphic>>([]);
  const [data, setData] = useState([]);

  const editGraphic = useCallback((id:string) => {

  },[])
  const handleOk = useCallback((config: SVGConfig) => {
    if (!graphicRef.current.find((graphic) => graphic.uniKey === config.id)) {
      const graphic = new Graphic(config, addSVG);
      graphicRef.current.push(graphic);
      setData((pre) => {
        pre.push({
          id: graphic.uniKey,
          info: {
            color: graphic.svgInfo.styles.borderColor,
          },
          onClick: editGraphic
        });
        return pre;
      });
    }
  }, []);
  return (
    <div className=" overflow-auto mx-12 pt-12 min-h-screen form-contianer">
      <CreateSVGDialog onOk={handleOk} />
      <List data={data} renderItem={GraphicPanel} uniKey="id" />
    </div>
  );
};

export default FormContainer;
