/**
 * Created by 七夕小雨 on 2020/7/15.
 */
function DSetBGM(rd){
    this.id = rd.readInt();
    this.name = rd.readString();
    this.text = rd.readString();
    this.cover = rd.readString();
    this.music = rd.readString();
    this.speed = rd.readInt();
}