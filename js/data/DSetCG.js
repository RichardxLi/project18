/**
 * Created by 七夕小雨 on 2020/7/15.
 */
function DSetCG(rd){
    this.id = rd.readInt();
    this.name = rd.readString();
    this.text = rd.readString();
    this.cover = rd.readString();
    this.type = rd.readInt();
    this.pic = rd.readString();
    this.mapId = rd.readInt();
    this.autoTimes = rd.readInt();
}