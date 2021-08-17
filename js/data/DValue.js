/**
 * Created by 七夕小雨 on 2019/1/4.
 * 变量的数据结构
 */
function DValue(rd){
    //变量ID
    this.id = rd.readInt();
    //变量名称
    this.name = rd.readString();
    //变量类型
    this.type = rd.readInt();
    //变量默认值
    this.defValue = rd.readString();
    //是否是多周目变量
    this.staticValue = rd.readBool();
}