/**
 * Created by 七夕小雨 on 2019/1/7.
 * 动画组单个动画帧数据结构
 */
function DAnimRect(rd){
    var _sf = this;
    //相对原图X
    this.x = 0;
    //相对原图Y
    this.y = 0;
    //裁剪宽度
    this.width = 0;
    //裁剪高度
    this.height = 0;
    //偏移X
    this.dx = 0;
    //偏移Y
    this.dy = 0;
    //等待时间
    this.time = 0;
    //是否工具判定
    this.effective = false;
    //音效
    this.sound = "";
    //以你下音量
    this.volume = 80;
    //发射点
    this.points = [];
    //读取数据
    this.x = rd.readInt();
    this.y = rd.readInt();
    this.width = rd.readInt();
    this.height = rd.readInt();
    this.dx = rd.readInt();
    this.dy = rd.readInt();
    this.time = rd.readInt();

    this.effective = rd.readBool();

    var length = rd.readInt();
    for(var i = 0;i<length;i++){
        this.points.push(new APoint(rd));
    }

    this.sound = rd.readString();
    this.volume = rd.readShort();

    this.getRect = function(){
        return new IRect(_sf.x,_sf.y , _sf.x + _sf.width, _sf.y + _sf.height);
    };

    this.collisionRect = new ARect(rd);

}
/**
 * 动画帧发射位置
 */
function APoint(rd){
    this.x = 0;
    this.y = 0;

    this.x = rd.readInt();
    this.y = rd.readInt();
}
/**
 * 动画帧碰撞矩形
 */
function ARect(rd){
    //自动检测碰撞局域
    this.auto = rd.readBool();
    this.x = rd.readInt();
    this.y = rd.readInt();
    this.width = rd.readInt();
    this.height = rd.readInt();
}
