import { isObject } from "lodash-es";

export enum JSDataType{
    Number,
    String,
    Date,
    Array,
    Object,
}

export class DataType{
    data: any;
    type: JSDataType;
    JSArrayChildren: DataType;
    constructor(data:any){
        this.data = data;
    }

    public analysis(){
        if(Array.isArray(this.data)){
            this.type = JSDataType.Array;
        }else if(isObject(this.data)){
            this.type = JSDataType.Object;
        }else if(Date == this.data.constructor){
            this.type = JSDataType.Date;
        }else if(typeof this.data === "number"){
            this.type = JSDataType.Number;
        }else if(typeof this.data === "string"){
            this.type = JSDataType.String
        }
        // todo
    }
    
}