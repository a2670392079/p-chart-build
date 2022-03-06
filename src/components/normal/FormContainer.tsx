import React, { useCallback, useRef, useState } from "react";
import { Graphic } from "../../graphic/graphic";
import { SVGConfig } from "../../utils/SVGUtils";
import List from "../normal/base-components/List";
import CreateSVGDialog from "./form-components/CreateSVGDialog";
import "./style.css";
import GraphicPanel from "./base-components/GraphicPanel";
import Slide from "../normal/base-components/Slide";
import GrapgicForm from "../normal/form-components/GraphicForm/GraphicForm";

interface FormContainerProps {
  addSVG: () => HTMLDivElement;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { addSVG } = props;
  const graphicRef = useRef<Array<Graphic>>([]);
  const [data, setData] = useState([]);
  const [slideShow, setSlideShow] = useState("");

  const renderItem = useCallback((item: any) => {
    return <GraphicPanel {...item} />;
  }, []);

  const editGraphic = useCallback((id: string) => {
    setSlideShow(id);
  }, []);

  const closeSlide = useCallback(() => {
    setSlideShow("");
  }, []);

  const deleteGraphic = useCallback((id: string) => {
    graphicRef.current = graphicRef.current.filter(
      (graphic) => graphic.uniKey !== id
    );

    document.getElementById(id)?.remove();
    setData((pre) => {
      return [...pre.filter((info) => info.id !== id)];
    });
  }, []);
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
          onClick: editGraphic,
          onDelete: deleteGraphic,
        });
        return [...pre];
      });
    }
  }, []);
  return (
    <div className=" overflow-auto mx-12 pt-12 min-h-screen form-contianer">
      <CreateSVGDialog onOk={handleOk} />
      <List data={data} renderItem={renderItem} uniKey="id" />
      <Slide title="Edit graphic" show={!!slideShow} onClose={closeSlide}>
        <GrapgicForm graphicRef={graphicRef} id={slideShow} />
      </Slide>
    </div>
  );
};

export default FormContainer;
