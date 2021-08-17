/**
 * Created by 七夕小雨 on 2019/3/14.
 * 关键帧动画动作数据结构
 */
function DResAnimFrameAction(rd){
    //闪烁颜色
    this.color = [0,0,0,0];
    //角色闪烁颜色
    this.actorColor = [0,0,0,0];

    //帧数
    this.index = rd.readShort();
    //是否存在判定区域
    this.isAtk = rd.readBool();
    //区域X
    this.AtkX = rd.readShort();
    //区域Y
    this.AtkY = rd.readShort();
    //区域宽度
    this.AtkWidth = rd.readShort();
    //区域高度
    this.AtkHeight = rd.readShort();
    //是否闪烁
    this.isFlash = rd.readBool();
    this.color[0] = rd.readShort();
    this.color[1] = rd.readShort();
    this.color[2] = rd.readShort();
    this.color[3] = rd.readShort();

    //闪烁完成时间
    this.flashTime = rd.readShort();
    //是否透明
    this.isOpactiy = rd.readBool();
    //不透明度
    this.opacity = rd.readShort();
    //透明完成时间
    this.opacityTime = rd.readShort();

    //是否缩放
    this.isZoom = rd.readBool();
    //缩放X坐标
    this.zoomX = rd.readShort();
    //缩放Y坐标
    this.zoomY = rd.readShort();
    //缩放完成时间
    this.zoomTime = rd.readShort();
    //是否角色闪烁
    this.isActorFlash = rd.readBool();
    this.actorColor[0] = rd.readShort();
    this.actorColor[1] = rd.readShort();
    this.actorColor[2] = rd.readShort();
    this.actorColor[3] = rd.readShort();
    //角色闪烁完成时间
    this.actorFlashTime = rd.readShort();


}