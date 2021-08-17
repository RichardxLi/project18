/**
 * Created by 七夕小雨 on 2019/3/19.
 */
IM.Flash = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var color = new IColor(parseInt(event.args[2]),parseInt(event.args[3]),parseInt(event.args[4]),parseInt(event.args[1]));
        RV.NowCanvas.flash(color,parseInt(event.args[0]));
        return false;
    };

};


IM.Shack = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.startShack(parseInt(event.args[1]) , parseInt(event.args[2]) , parseInt(event.args[0]));
        return false;
    };

};

IM.ShackMessageBox = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.message.StartShack(parseInt(event.args[1]) , parseInt(event.args[2]) , parseInt(event.args[0]));
        return false;
    };

};

IM.MaskIn = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var color = new IColor(parseInt(event.args[2]),parseInt(event.args[3]),parseInt(event.args[4]),parseInt(event.args[1]));
        RV.NowCanvas.maskFadeIn(color,parseInt(event.args[0]));
        return false;
    }

};

IM.MakeOut = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.maskFadeOut(parseInt(event.args[0]));
        return false;
    }
};

IM.Weather = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.weather.setWeatherType(parseInt(event.args[0]));
        RV.GameData.canvasData.weatherIndex = parseInt(event.args[0]);
        return false;
    }
};

IM.PicShow = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var id = parseInt(event.args[0]) - 1;
        if(RV.NowCanvas.pics[id] != null){
            RV.NowCanvas.pics[id].dispose();
            RV.NowCanvas.pics[id] = null;
        }
        var path = "";
        if(event.args[1] == "0"){
            path = event.args[2];
        }else if(event.args[1] == "1"){
            path = RV.GameData.getValues(parseInt(event.args[2]));
        }
        var point = 0;
        if(event.args[3] == "1"){
            point = 0.5;
        }
        var x = 0;
        var y = 0;
        if(event.args[4] == "0"){
            x = parseInt(event.args[5]);
            y = parseInt(event.args[6]);
        }else{
            x = RV.GameData.getValueNum(parseInt(event.args[5]),0);
            y = RV.GameData.getValueNum(parseInt(event.args[6]),0);
        }
        var view = RV.NowCanvas.getView();
        var sp = new ISprite(RF.LoadBitmap("Picture/" + path),view);
        sp.path = path;
        sp.yx = point;
        sp.yy = point;
        sp.x = x;
        sp.y = y;
        sp.zoomX = parseInt(event.args[7]) / 100;
        sp.zoomY = parseInt(event.args[8]) / 100;
        sp.opacity = parseInt(event.args[9]) / 255;
        sp.angle = parseInt(event.args[10]);

        sp.mirror = event.args[11] == "1";

        sp.z = 10 + id;
        RV.NowCanvas.pics[id] = sp;
        return false;
    };
};

IM.PicMove = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    var wait = 0;

    this.init = function(){
        var id = parseInt(event.args[0]) - 1;
        if(RV.NowCanvas.pics[id] != null){
            var w = parseInt(event.args[1]);
            if(event.args[2] == "1"){
                wait = w;
            }
        }
        var point = 0;
        if(event.args[3] == "1"){
            point = 0.5;
        }
        var x = 0;
        var y = 0;
        if(event.args[4] == "0"){
            x = parseInt(event.args[5]);
            y = parseInt(event.args[6]);
        }else{
            x = RV.GameData.getValueNum(parseInt(event.args[5]),0);
            y = RV.GameData.getValueNum(parseInt(event.args[6]),0);
        }
        var sp = RV.NowCanvas.pics[id];
        if(sp == null) return false;
        sp.yx = point;
        sp.yy = point;
        sp.slideTo(x,y,w);
        sp.scaleTo(parseInt(event.args[7]) / 100 , parseInt(event.args[8]) / 100,w);
        sp.fadeTo(parseInt(event.args[9]) / 255,w);
        sp.rotateTo(parseInt(event.args[10]),w);
        sp.mirror = event.args[11] == "1";

        return false;
    };

    this.update = function(){
        wait -= 1
    };

    this.isFinish = function(){
        return wait <= 0
    };
};

IM.PicDel = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var id = parseInt(event.args[0]) - 1;
        if(RV.NowCanvas.pics[id] != null){
            RV.NowCanvas.pics[id].dispose();
            delete RV.NowCanvas.pics[id];
        }
        return false;
    };
};

IM.ShowAnim = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var oldX = parseInt(event.args[2]) - 5;
        var oldY = parseInt(event.args[3]) - 5;
        var rect = new IRect(oldX , oldY , oldX + 10, oldY + 10);
        var am = RV.NowCanvas.playAnim(event.args[1],null,null,event.args[4] == "0",rect,event.args[0]);
        if(am != null){
            am.resId = event.args[1];
            am.single = event.args[4] == "0";
            am.id = event.args[0];
            am.oldX = oldX;
            am.oldY = oldY;
        }
        return false;
    };
};

IM.StopAnim = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var am = RV.NowCanvas.findAnim(event.args[0]);
        if(am != null){
            am.dispose();
            RV.NowCanvas.anim.remove(am);
        }
    }

};



IM.ViewMove = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var view = RV.NowCanvas.getView();
        var x = parseInt(event.args[0]) * -1;
        var y = parseInt(event.args[1]) * -1;
        view.shifting(view.ox,view.oy,view.ox + x , view.oy + y,parseInt(event.args[2]));
        return false;
    };
};

IM.ViewReset = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var view = RV.NowCanvas.getView();
        view.ox = 0;
        view.oy = 0;
        return false;
    };
};
