import * as d3 from "d3";
import { Graphic } from "../graphic";
import Pretretment from "./Pretreatment";

export type GraphicOriginData = string | Buffer;

export default class GraphicData {
  originData: Map<string, GraphicOriginData>;
  pretreaments: Map<string, Pretretment>;
  proccessData: Map<string, any>;
  constructor() {
    this.originData = new Map<string, GraphicOriginData>();
    this.pretreaments = new Map<string, Pretretment>();
    this.proccessData = new Map<string, any>();
  }

  public append(id: string, data: GraphicOriginData) {
    this.originData.set(id, data);
  }

  /**
   * @description: 创建原始数据预处理类
   * @param {string} proccessId
   * @return {Pretretment}
   */
  public CreateOriginDataPretreaments(proccessId: string): Pretretment {
    this.pretreaments.set(proccessId, new Pretretment());
    return this.pretreaments.get(proccessId);
  }

  public getOriginDataPretreaments(proccessId: string): Pretretment {
    return this.pretreaments.get(proccessId);
  }

  /**
   * @description: 获取预处理器处理后原始数据
   * @param {string} dataId
   * @param {string} proccess
   * @return {*}
   */
  public getProcessData(
    dataId: string,
    process: string | Pretretment,
    saveId?: string
  ) {
    const origin = this.originData.get(dataId);
    if (!origin) {
      throw Error("can not find origin data");
    }
    const pretretment =
      typeof process === "string"
        ? this.getOriginDataPretreaments(process)
        : this.pretreaments;
    if (!(pretretment instanceof Pretretment)) {
      throw Error("data pretretment error");
    }
    this.proccessData.set(saveId ?? dataId, pretretment.proccess(origin));
    return this.proccessData.get(saveId ?? dataId);
  }

  static bindGraphic(graphic: Graphic) {
    graphic.data = new GraphicData();
  }
}
