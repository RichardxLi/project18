/**
 * Created by 七夕小雨 on 2019/1/8.
 * 设置·公共触发器
 */
function DSetEvent(rd){
    this.id = rd.readInt();
    this.name = rd.readString();

    //执行逻辑
    this.logic = new DIf(rd);
    //是否同步执行
    this.isParallel = rd.readBool();
    //是否自动执行
    this.autoRun = rd.readBool();

    //触发器内容
    this.events = [];

    var length = rd.readInt();
    for(var i = 0;i<length;i++){
        var et = new DEvent();
        et.read(rd);
        this.events.push(et);
    }

    /**
     * 执行触发器
     */
    this.doEvent = function(){
        if(this.logic.result()){
            //释放在地图的自动执行并行通用触发器
            if(this.autoRun && this.isParallel && !RF.FindOtherEvent("public_event_" + this.id)){
                RF.AddOtherEvent(this.events , "public_event_" + this.id , -1);
            }else if(!this.autoRun && this.isParallel){//通过物品、敌人死亡，怪物，或者在通用触发器中间执行的触发器
                RF.AddOtherEvent(this.events , null , -1);
            }else if(!this.isParallel){//合并在主循环执行的
                RV.InterpreterMain.addEvents(this.events);
            }
        }
    }
}