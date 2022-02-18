import React from "react";
import './global.css';
import SVGContainer from "./components/visiual/SVGContainer";
import FormContainer from './components/normal/FormContainer';
import ReactDOM from "react-dom";


const MainApp: React.FC = () => {
  return (
    <div className=" flex flex-col min-h-screen h-screen w-screen">
      <SVGContainer width={600} />
      <FormContainer />
    </div>
  );
};


export default () => {
  ReactDOM.render(
    <MainApp />,
    document.getElementById('root')
  )
}



