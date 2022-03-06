import BuiltInFn from "./BuiltInFn";

export type ProcessFunction = (data: any) => any;

export default class Pretretment {
  processHandle: ProcessFunction[];
  constructor(processHandle?: ProcessFunction[]) {
    this.processHandle = processHandle ? [...processHandle] : new Array<ProcessFunction>();
  }

  public use(fn: ProcessFunction) {
    this.processHandle.push(fn);
    return this;
  }

  public useBuiltInFn(fnArr: Array<string>) {
      console.log("fnArr",fnArr);
    fnArr.forEach((fn) => {
      (BuiltInFn as any)[fn] && this.use((BuiltInFn as any)[fn]);
    });
  }

  public proccess(data: any) {
    const proccessArr = [...this.processHandle];
    while (proccessArr.length) {
      data = proccessArr.shift()(data);
    }
    return data;
  }

  public clone() {
    return new Pretretment(this.processHandle);
  }
}
