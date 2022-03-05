import React, { ReactNode, useCallback } from "react";
import { Button } from "./BaseComponents";
import closeIcon from "../../../assets/close.svg";

interface GraphicPanelProps {
  id: string;
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  info?: {
    desc?: string | ReactNode;
    color?: string;
  };
}
const GraphicPanel: React.FC<GraphicPanelProps> = (props) => {
  const { id, info, onClick, onDelete } = props;
  const handleClick = useCallback(() => {
    onClick && onClick(id);
  }, [id, onClick]);
  const handleDelete = useCallback(() => {
    onDelete && onDelete(id);
  }, [id, onDelete]);
  return (
    <div
      className="bg-indigo-800 mt-3"
      style={{
        backgroundColor: info?.color ?? "bg-indigo-800",
        borderRadius: "1rem",
      }}
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span
              className="flex p-2 rounded-lg bg-indigo-800"
              style={{ backgroundColor: info?.color ?? "bg-indigo-800" }}
            ></span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                {" "}
                {id}
                {info.desc ? `: ${info.desc}` : ""}
              </span>
              <span className="hidden md:inline">{id}</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              onClick={handleClick}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {" "}
              edit{" "}
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              onClick={handleDelete}
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              {/* <img src={closeIcon} className="h-6 w-6 text-white" /> */}
              <svg className="icon h-6 w-6 text-white">
                <use xlinkHref="#iconclose"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div style={{
    //   border: `1px solid ${info?.color ?? "red"}`,
    //   borderRadius: 4
    // }} className="flex flex-1 justify-between items-center pl-2 pr-8 w-auto my-4 mr-4">
    //   <div>{id}</div>
    //   <div>{info.desc}</div>
    //   <div>
    //     <Button onClick={handleClick}>edit</Button>
    //   </div>
    // </div>
  );
};

export default GraphicPanel;
