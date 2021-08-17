/**
 * Created by 七夕小雨 on 2019/1/4.
 * 触发内容数据结构
 */
function DEvent(parent){
    //触发编号
    this.code = 0;
    //参数
    this.args = [];
    //子触发内容组
    this.events = null;
    //父触发组
    this.parent = parent;

    //读取数据
    this.read = function(rd){
        this.code = rd.readShort();
        var length = rd.readInt();
        for(var i = 0;i<length;i++){
            this.args.push(rd.readString());
        }
        length = rd.readInt();
        if(length >= 0){
            this.events = [];
            for(i = 0;i<length;i++){
                var et = new DEvent(this);
                et.read(rd);
                this.events.push(et);
            }
        }
    };
}