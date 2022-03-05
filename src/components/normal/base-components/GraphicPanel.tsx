import React, { ReactNode, useCallback } from "react";
import { Button } from "./BaseComponents";

interface GraphicPanelProps {
  id: string;
  onClick?: (id: string) => void;
  info?: {
    desc?: string | ReactNode;
    color?: string;
  };
}
const GraphicPanel: React.FC<GraphicPanelProps> = (props) => {
  const { id, info, onClick } = props;
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);
  return (
    <div
      className=" flex-1 justify-around items-center"
      style={{ border: `1px soild ${info.color ?? "#fff"}` }}
    >
      <div>{id}</div>
      <div>{info.desc}</div>
      <div>
        <Button onClick={handleClick}>edit</Button>
      </div>
    </div>
  );
};

export default GraphicPanel
