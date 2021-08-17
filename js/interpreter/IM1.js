/**
 * Created by 七夕小雨 on 2019/3/17.
 */
IM.Message = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;


    this.init = function(){
        RV.NowCanvas.message.setThis(event.args[5] == "1" , event.args[3],event.args[4]);
        if(event.args.length >= 15){
            RV.NowCanvas.message.setFace(event.args[8],event.args[9],event.args[10]);
            RV.NowCanvas.message.setOther(parseFloat(event.args[6]) / 100,parseFloat(event.args[7]) / 100,
                parseInt(event.args[11]), parseInt(event.args[12]),parseInt(event.args[13]),parseInt(event.args[14]));
        }

        RV.NowCanvas.message.talk(event.args[0],event.args[1],event.args[2]);

        return false;
    };

    this.isFinish = function(){
        if(RV.NowCanvas.message.isClick) return;
        if(RV.NowCanvas.message.isNext || (!RV.NowCanvas.message.isShowing() && RF.IsNext())){
            var name = RF.TextAnalysisNull(event.args[0]);
            var msg = RF.TextAnalysisNull(RF.MakerValueText(event.args[1]));
            if(msg != ""){
                var logText = {
                    name : name,
                    msg : msg
                };
                RV.GameData.setMsgLog(logText);
            }
            //RV.NowCanvas.message.re();
            return true;
        }
        return false;
    };
};

IM.TextChoice = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.choice.setupChoice(event.args , 1000);
        return false;
    };

    this.finish = function(){
        var index = RV.NowCanvas.choice.index;
        var tempChoice = {
            name : "",
            msg : "➤ "+ RF.TextAnalysisNull(event.args[index])
        };
        RV.GameData.setMsgLog(tempChoice);
        if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(index);
        main.insertEvent(event.events[index].events);
    };

    this.isFinish = function(){
        return !RV.NowCanvas.choice.isW;
    };
};

IM.TextChoiceEX = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.NowCanvas.choice.setupChoiceEx(event);
        if(event.args[0] == "1"){
            RV.NowCanvas.choice.timeEnd = function(){
                RV.NowCanvas.choice.index = parseInt(event.args[5]) - 1;
            };
        }
        return false;
    };

    this.finish = function(){
        var index = RV.NowCanvas.choice.index;
        var tempChoice = {
            name : "",
            msg : "➤ "+ RF.TextAnalysisNull(event.args[index])
        };
        RV.GameData.setMsgLog(tempChoice);
        if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(index);
        main.insertEvent(event.events[index].events);
    };

    this.isFinish = function(){
        return !RV.NowCanvas.choice.isW;
    };
};

IM.Tips = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;


    this.init = function(){
        RF.ShowTips(event.args[0]);
        return false;
    };
};

IM.MessageBox = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    var index = -1;

    this.init = function(){
        var msg = RF.MakerValueText(event.args[0]);
        var endMsg = msg.replaceAll("\\\\","\\\\") + "||" + event.args[1] + "||" + event.args[2];
        var ui =  RV.NowUI.uis[5];
        var sui = null;
        if(main.ui == null){
            if(ui != null && IVal.scene instanceof  SMain){
                sui = IVal.scene.initSelfUI(ui,"\"" + endMsg + "\"");
            }
        }else{
            sui = main.ui.showChildfUI(ui,"\"" + endMsg + "\"");
        }
        if(sui != null){
            var oldEnd = sui.endDo;
            sui.endDo = function(e){
                index = e;
                oldEnd();
            }
        }else{
            index = 1;
        }
        return false;
    };

    this.finish = function(){
        if(event.events.length - 1 >= index){
            if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(index);
            main.insertEvent(event.events[index].events);
        }
    };

    this.isFinish = function(){
        return index >= 0;
    };
};

IM.CloseMessage = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;


    this.init = function(){
        RV.NowCanvas.message.re();
        return false;
    };
};

