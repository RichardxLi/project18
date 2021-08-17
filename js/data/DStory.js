/**
 * Created by 七夕小雨 on 2019/1/4.
 * 地图数据
 */
function DStory(rd){
    var _sf = this;
    //地图ID
    this.id = 0;
    //地图名称
    this.name = "";
    //是否是指令模式
    this.isHard = false;
    //地图的父ID（游戏无效）
    this.fid = -1;
    //队列排序
    this.order = 0;
    //事件集合
    this.events = [];
    //区域集合
    this.regions = [];

    //读取数据
    this.id = rd.readShort();
    this.name = rd.readString();
    this.isHard = rd.readBool();
    this.fid = rd.readShort();
    this.order = rd.readShort();

    var length = rd.readInt();
    if(this.isHard){
        for(var i = 0;i<length;i++){
            var e = new DEvent();
            e.read(rd);
            this.events.push(e);
        }
    }else{
        for(i = 0;i<length;i++){
            e = new DRegion(null);
            e.read(rd);
            this.regions.push(e);
        }
        regionsToEvents();
    }


    function regionsToEvents(){
        for(var i = 0;i< _sf.regions.length;i++){
            _sf.events = _sf.events.concat(regionOne(_sf.regions[i], null));
        }
    }

    function regionOne(region,event){
        var events = [];
        if(region.events.length > 0){
            events = events.concat(region.events);
        }else{
            var e = new DEvent(event);
            e.code = region.code;
            e.args = region.args;
            e.events = [];
            for(var i = 0;i<region.regions.length;i++){
                e.events = e.events.concat(regionOne(region.regions[i],e));
            }
            events.push(e);
        }
        return events;
    }


}