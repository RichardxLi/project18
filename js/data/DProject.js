/**
 * Created by 七夕小雨 on 2019/1/4.
 * 工程数据·总结构
 */
function DProject(onload){

    var _sf = this;
    //工程名称
    this.name = "";
    //工程唯一Key
    this.key = "";
    //工程数据版本号
    this.code = 0;
    //工程分辨率·宽度
    this.gameWidth = 960;
    //工程分辨率·高度
    this.gameHeight = 540;
    //工程游戏类型 0、ACT 1、ARPG 2、AVG
    this.gameType = 0;
    //起始地图编号
    this.startId = 1;
    //工程所属用户
    this.owner = "";
    //工程是否被锁定
    this.isLock = false;
    //工程地图数据
    this.maps = [];
    //工程变量数据
    this.values = [];

    //读取工程数据文件
    var file = "Game.ifaction";
    var rd = new IRWFile(file);
    //考虑到Web端文件为异步读取，所以需要设置读取回调给IRWFile;
    var onloadE = onload;

    //读取工程数据
    rd.onload = function(){
        var ms = rd.readMS(8);
        if(ms == "IFACTION"){
            _sf.name = rd.readString();
            _sf.key = rd.readString();
            _sf.code = rd.readInt();rd.readInt();
            _sf.gameWidth = rd.readInt();
            _sf.gameHeight = rd.readInt();
            _sf.gameType = rd.readInt();
            _sf.startId = rd.readInt();rd.readInt();rd.readInt();

            _sf.owner = rd.readString();
            _sf.isLock = rd.readBool();

            var length = rd.readInt();
            for(var i = 0;i<length;i++){
                var mp = new DStory(rd);
                _sf.maps.push(mp);
            }

            length = rd.readInt();
            for(i = 0;i<length;i++){
                var val = new DValue(rd);
                _sf.values.push(val);
            }

            onloadE();

        }
    };

    /**
     * 初始化变量库
     * @param data 原始变量数据
     * @returns {Array} 可用于游戏中使用的变量数据
     */
    this.initValue = function(data){
        var vals = [];
        for(var i = 0;i< _sf.values.length;i++){
            var value = _sf.values[i].defValue;
            if(_sf.values[i].type == 0){
                value = value == "1";
            }else if(_sf.values[i].type == 1){
                value = parseInt(value);
            }
            if(_sf.values[i].staticValue && data != null && data[_sf.values[i].id] != null){
                vals[_sf.values[i].id] = data[_sf.values[i].id];
            }else{
                vals[_sf.values[i].id] = value;
            }

        }
        return vals;
    };

    /**
     * 寻找 ID号对应的地图
     * @param id 地图ID
     * @returns {DMap} 地图数据实例
     */
    this.findMap = function(id){
        for(var i = 0;i<_sf.maps.length;i++){
            if(_sf.maps[i].id == id){
                return _sf.maps[i];
            }
        }
        return null;
    };


}