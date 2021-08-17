/**
 * Created by 七夕小雨 on 2019/3/19.
 */
IM.BGMPlay = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.playBGM("Audio/" + event.args[0],parseInt(event.args[1]));
        return false;
    };
};


IM.BGSPlay = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.playBGS("Audio/" + event.args[0],parseInt(event.args[1]));
        return false;
    };
};

IM.SEPlay = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.playSE("Audio/" + event.args[0],parseInt(event.args[1]));
        return false;
    };
};

IM.VoicePlay = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.playVoice("Audio/" + event.args[0],parseInt(event.args[1]));
        return false;
    };
};

IM.BGMFade = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.nowBGMFile = "";
        IAudio.BGMFade(parseInt(event.args[0]));
        return false;
    };
};

IM.BGSFade = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.nowBGSFile = "";
        IAudio.BGSFade(parseInt(event.args[0]));
        return false;
    };
};

IM.SEStop = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        IAudio.stopSE();
        return false;
    };
};
IM.VoiceStop = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        IAudio.stopVoice();
        return false;
    };
};
