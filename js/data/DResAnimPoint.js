/**
 * Created by 七夕小雨 on 2019/3/14.
 * 动画显示位置数据结构
 */
function DResAnimPoint(rd){
    //位置类型，相对、绝对
    this.type = rd.readShort();
    //X坐标
    this.x = rd.readShort();
    //Y坐标
    this.y = rd.readShort();
    //相对方向
    this.dir = rd.readShort();

}