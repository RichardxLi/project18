/**
 * Created by 七夕小雨 on 2019/3/19.
 */
IM.SaveGame = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RF.SaveGame();
        return false;
    };
};

IM.LoadGame = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.isLoad = true;

        return false;
    };
};


IM.Script = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var _sf = null;
        var obj = null;
        if(main.ctrl != null){
            _sf = main.ctrl;
            obj = main.ctrl.obj;
        }
        if(main.ctrl == null && main.ui != null){
            _sf = main.ui;
        }
        eval(event.args[0]);
        return false;
    };
};

IM.callSelfUI = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){

        if(main.ui == null){
            var ui =  RV.NowUI.uis[event.args[0]];
            if(ui != null && IVal.scene instanceof  SMain){
                IVal.scene.initSelfUI(ui,event.args[1]);
            }
        }else{
            ui =  RV.NowUI.uis[event.args[0]];
            main.ui.showChildfUI(ui,event.args[1]);
        }
        return false;
    };

};

