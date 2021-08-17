/**
 * Created by 七夕小雨 on 2019/3/14.
 * 关键帧动画
 */
function DResAnimFrame(rd){
    //动画组
    this.anims = [];
    //关键帧动作集合
    this.actionList = [];

    //动画ID
    this.id = rd.readShort();
    //动画名称
    this.name = rd.readString();
    //动画说明
    this.msg = rd.readString();
    //动画出现位置
    this.point = new DResAnimPoint(rd);
    //动画文件
    this.file = rd.readString();

    //读入动画组与关键帧动作合计
    var length = rd.readInt();
    for(var i = 0;i<length;i++){
        this.anims.push(new DAnimRect(rd));
    }

    length = rd.readInt();
    for(i = 0;i<length;i++){
        this.actionList.push(new DResAnimFrameAction(rd));
    }

}