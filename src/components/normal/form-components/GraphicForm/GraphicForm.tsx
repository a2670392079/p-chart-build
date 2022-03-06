import React, { useCallback, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import { Graphic } from "../../../../graphic/graphic";
import testData from "./testData/data";
import Select from "../../base-components/Select";
import { CusList, CusPanel, CusTab } from "../../base-components/Tabs";
import GraphicData from "../../../../graphic/data/data";
import CreateDataPretrementModal, {
  PretretmentFormData,
} from "./CreateDataPretrementModal";
import ProcessDataModal from "./ProcessDataModal";

interface GraphicFormProps {
  id: string;
  graphicRef: React.MutableRefObject<Graphic[]>;
}

const options = Object.keys(testData).map((v) => ({
  title: v,
  value: v,
}));

const TabData = ["Data", "Primitives", "Animate"];

const GrapgicForm: React.FC<GraphicFormProps> = (props) => {
  const { id, graphicRef } = props;
  const [selected, setSelected] = useState("games");
  const [processID, setProcessID] = useState();
  const [process, setProcess] = useState([]);

  const dataPretrementRef = useRef<GraphicData>(new GraphicData());

  /**
   * @description: 添加预处理数据类
   * @param {*} useCallback
   * @return {*}
   */
  const handleAddPretrement = useCallback((config: PretretmentFormData) => {
    const pre = dataPretrementRef.current.CreateOriginDataPretreaments(
      config.id
    );
    pre.useBuiltInFn(config.pretretments);
    const keys = dataPretrementRef.current.pretreaments.keys();
    const preArr = []
    for(const key of keys){
        preArr.push({
            title: key,
            value: key
        })
    }
    setProcess(preArr)
  }, []);

  const handleProcess = useCallback((info) => {
    dataPretrementRef.current.append(selected, (testData as any)[selected]);
    const data = dataPretrementRef.current.getProcessData(info.dataID, info.process, info.saveID);
    console.log(data);
  }, [selected]);
  return (
    <>
      <Tab.Group>
        <CusList>
          {TabData.map((value) => (
            <CusTab key={value}>{value}</CusTab>
          ))}
        </CusList>
        <Tab.Panels className="mt-2">
          <CusPanel key="Data">
            <Select value={selected} onChange={setSelected} options={options} />
            <CreateDataPretrementModal onOk={handleAddPretrement} />
            <div className=" flex justify-between items-center mt-2">
              <Select
                value={processID}
                options={process}
                onChange={setProcessID}
              />
              <ProcessDataModal onOk={handleProcess} processID={processID} />
            </div>
          </CusPanel>
          <CusPanel key="Primitives"></CusPanel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default GrapgicForm;
