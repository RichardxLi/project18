/**
 * Created by 七夕小雨 on 2019/3/14.
 * 粒子动画数据结构
 */
function DResAnimParticle(rd){
    //粒子文件组
    this.files = [];
    //动画ID
    this.id = rd.readShort();
    //动画名称
    this.name = rd.readString();
    //动画说明
    this.msg = rd.readString();
    //动画出现位置
    this.point = new DResAnimPoint(rd);

    //发射类型
    this.launchType = rd.readShort();
    //发射半径
    this.radius = rd.readShort();
    //是否拥有重力
    this.isGravity = rd.readBool();
    //区域宽度
    this.width = rd.readShort();
    //区域高度
    this.height = rd.readShort();
    //发射距离
    this.distance = rd.readShort();
    //发射方向
    this.dir = rd.readShort();
    //衰弱时间
    this.time = rd.readShort();
    //粒子数量
    this.number = rd.readShort();
    //储存结构文件
    this.file = rd.readString();

    var length = rd.readInt();
    for(var i = 0;i<length;i++){
        this.files.push(rd.readString());
    }
    //粒子音效
    this.sound = new DSetSound(rd);
}