import React, { useContext } from "react";
import { FormContext } from "./Form";

interface FormItemProps{
    name:string;

}

const Item: React.FC<FormItemProps> = (props) => {
  const { children, name } = props;
  const context = useContext(FormContext);
  return <>{React.Children.map(children, (child) => {
      if(React.isValidElement(child)){
          return React.cloneElement(child, {...child.props})
      }
      return null;
  })}</>;
};
