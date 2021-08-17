/**
 * Created by 七夕小雨 on 2019/3/14.
 * 音效音乐数据结构
 */
function DSetSound(rd){
    //文件
    this.file = "";
    //音量
    this.volume = 80;

    if(rd != null){
        this.file = rd.readString();
        this.volume = rd.readShort();
    }

    /**
     * 播放
     * @param type 0、播放BGM 1、播放BGS 2、播放SE
     */
    this.play = function(type){
        if(this.file == "") return;
        if(type == null) type = 2;
        if(type == 0){
            RV.GameSet.playBGM("Audio/" + this.file , this.volume);
        }else if(type == 1){
            RV.GameSet.playBGS("Audio/" + this.file , this.volume);
        }else if(type == 2){
            RV.GameSet.playSE("Audio/" + this.file , this.volume);
        }
    }

}