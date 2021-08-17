/**
 * Created by 七夕小雨 on 2019/3/18.
 */
IM.Wait = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    var wait = 0;

    this.init = function(){
        wait = parseInt(event.args[0]);
        if(wait >= 30){
            RV.NowCanvas.message.re();
        }
        return false;
    };

    this.update = function(){
        wait -= 1
    };

    this.isFinish = function(){
        return wait <= 0
    };

};


IM.Value = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var index1 = parseInt(event.args[0]);
        var val = RV.GameData.value[index1];
        var val2 = null;
        if(val != null){
            if(val === true || val === false){
                if(event.args[1] == "0"){
                    RV.GameData.value[index1] = event.args[2] == "1";
                }else if(event.args[1] == "1"){
                    val2 = RV.GameData.value[parseInt(event.args[2])];
                    if(val2 != null){
                        RV.GameData.value[index1] = val2;
                    }
                }else if(event.args[1] == "2"){
                    val2 = RV.GameData.value[parseInt(event.args[2])];
                    if(val2 != null){
                        RV.GameData.value[index1] = !val2;
                    }
                }
            }else if(typeof(val)=='string'){
                RV.GameData.value[index1] = event.args[1];
            }else if(!isNaN(val)){
                if(event.args[2] == "0"){
                    val2 = parseInt(event.args[3]);
                }else if(event.args[2] == "1"){
                    val2 = RV.GameData.value[parseInt(event.args[3])];
                }else if(event.args[2] == "2"){
                    val2 = rand(parseInt(event.args[3]),parseInt(event.args[4]))
                }else if(event.args[2] == "3"){
                    val2 = makeGameDataText(parseInt(event.args[3]),parseInt(event.args[4]),parseInt(event.args[5]));
                }
                RV.GameData.value[index1] = Calculation(parseInt(event.args[1]),RV.GameData.value[index1],val2);
            }
        }
        return false;
    };

    function makeGameDataText(type, s1, s2) {
        var val = 0;
        if (type == 0) {
            var bag = RV.GameData.findItem(0,s1);
            if(bag != null){
                return bag.num;
            }
        } else if (type == 1) {
            bag = RV.GameData.findItem(1,s1);
            if(bag != null){
                return bag.num;
            }
        } else if (type == 2) {
            bag = RV.GameData.findItem(2,s1);
            if(bag != null){
                return bag.num;
            }
        } else if (type == 3) {
            if(s1 == 0){
                return RV.GameData.actor.getMaxHP();
            }else if(s1 == 1){
                return RV.GameData.actor.getMaxMp();
            }else if(s1 == 2){
                return RV.GameData.actor.hp;
            }else if(s1 == 3){
                return RV.GameData.actor.mp;
            }else if(s1 == 4){
                return RV.GameData.actor.getWAtk();
            }else if(s1 == 5){
                return RV.GameData.actor.getWDef();
            }else if(s1 == 6){
                return RV.GameData.actor.getMAtk();
            }else if(s1 == 7){
                return RV.GameData.actor.getMDef();
            }else if(s1 == 8){
                return RV.GameData.actor.getSpeed();
            }else if(s1 == 9){
                return RV.GameData.actor.getLuck();
            }else if(s1 == 10){
                return RV.GameData.actor.level;
            }
        } else if (type == 4) {
            var rect = null;
            var et = null ;
            if (s1 == -10) {
                et = RV.NowMap.getActor();
                rect = RV.NowMap.getActor().getCharacter().getCharactersRect();
            } else if (s1 == -20) {
                et = RV.NowMap.findEvent(main.NowEventId);
                if(et != null){
                    rect = et.getRect();
                }

            } else {
                et = RV.NowMap.findEvent(s1);
                if(et != null){
                    rect = et.getRect();
                }
            }
            if (s2 == 0) {
                if(rect != null){
                    return parseInt(rect.centerX / RV.NowProject.blockSize);
                }

            } else if (s2 == 1) {
                if(rect != null){
                    return parseInt((rect.bottom - RV.NowProject.blockSize) / RV.NowProject.blockSize);
                }
            } else if (s2 == 2) {
                if(et != null){
                    return et.getDir();
                }
            }
        } else if (type == 5) {
            if (s1 == 0) {
                return RV.NowMap.getData().id;
            } else if (s1 == 1) {
                return RV.GameData.money;
            } else if (s1 == 2) {
                return IInput.x;
            } else if (s1 == 3) {
                return IInput.y;
            }
        }else if(type == 6){
            rect = null;
            et = RV.NowMap.findEnemy(s1);
            if(et != null){
                rect = et.getRect();
            }
            if (s2 == 0) {
                if(rect != null){
                    return parseInt(rect.centerX / RV.NowProject.blockSize);
                }

            } else if (s2 == 1) {
                if(rect != null){
                    return parseInt((rect.bottom - RV.NowProject.blockSize) / RV.NowProject.blockSize);
                }
            } else if (s2 == 2) {
                if(et != null){
                    return et.getDir();
                }
            }
        }
        return val;
    }


    function Calculation(fuc,val1,val2){
        if(fuc == 0) return val2;
        if(fuc == 1) return val1 + val2;
        if(fuc == 2) return val1 - val2;
        if(fuc == 3) return val1 * val2;
        if(fuc == 4) return parseInt(val1 / val2);
        if(fuc == 5) return val1 % val2;
    }

};


IM.IF = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;


    var id =  main.NowEventId;
    //var et = RV.NowMap.findEvent(id);

    this.init = function(){
        var dif = event2DIF();

        if(dif.result()){
            if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(1);
            main.insertEvent(event.events[0].events);
        }else if(dif.haveElse){
            if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(2);
            main.insertEvent(event.events[1].events);
        }else{
            if(main == RV.InterpreterMain) RV.GameData.storySelectInfo.push(-1);
        }
        return false;
    };

    function event2DIF(){
        var evt = event;
        if (evt.code != 203) return null;
        var dif = new DIf();
        //dif.tag = et;
        dif.type = parseInt(evt.args[0]);
        dif.haveElse = evt.args[1] == "1";
        for (var i = 2; i < evt.args.length; i++) {
            var main = evt.args[i].split('Φ');
            var difi = new DIfItem();
            difi.type = parseInt(main[0]);
            difi.num1Index = parseInt(main[1]);
            difi.fuc = parseInt(main[2]);
            difi.type2 = parseInt(main[3]);
            difi.num2 = main[4];
            difi.num2Index =parseInt(main[5]);
            dif.items.push(difi);
        }
        return dif;
    }

};


IM.Loop = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;


    this.init = function(){
        var newEvents = [];
        for(var i = 0;i<event.events.length;i++){
            newEvents.push(event.events[i]);
        }
        var et = new DEvent();
        et.code = 2041;
        newEvents.push(et);
        main.insertEvent(newEvents);
        return false;
    };

};

IM.LoopUp = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        for(var i = main.pos;i >= 0;i--){
            if(main.event_list[i].code == 204){
                main.pos = i;
                break;
            }else{
                main.event_list.splice(i,1);
            }
        }
        main.pos -= 1;
        return false;
    };

};

IM.LoopBreak = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var index = -1;
        for(var i = main.pos;i < main.event_list.length;i++){
            if(main.event_list[i].code == 2041){
                index = i;
                break;
            }
        }
        for(i = index ;i >= 0;i--){
            if(main.event_list[i].code == 204){
                main.pos = i;
                break;
            }else{
                main.event_list.splice(i,1);
            }
        }
        return false;
    };

};

IM.Event = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        var trigger = RV.NowSet.findEventId(parseInt(event.args[0]));
        main.insertEvent(trigger.events);

    }
};

IM.StoryMove = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    var wait = false;

    this.init = function(){
        if(RV.GameData.playCGIndex != -1) RV.GameData.jumpTime += 1;
        var mapId = 0;
        if(event.args[0] == "0"){
            mapId = parseInt(event.args[1]);
        }else if(event.args[0] == "1"){
            mapId =  RV.GameData.getValue(parseInt(event.args[1]),0);
        }
        var story = RV.NowProject.findMap(mapId);
        RV.GameData.storyId = mapId;
        RV.InterpreterMain.endInterpreter();
        RV.InterpreterMain.addEvents(story.events);

        if(RV.GameData.playCGIndex != -1){
            if(RV.GameData.jumpTime >= RV.GameData.currentCG.autoTimes){
                RV.GameData.jumpTime = 0;
                IVal.scene.dispose();
                IVal.scene = new STitle();
            }
        }else{
            RV.NowCanvas.clear();
            RF.SaveGame();
        }

    };


};

IM.GetCG = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.addCG(parseInt(event.args[0]));
        return true;
    }
};

IM.GetBGM = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameSet.addBGM(parseInt(event.args[0]));
        return true;
    }

};
IM.BackTitle = function(event,main){
    this.base = IEventBase;
    this.base();
    delete this.base;

    this.init = function(){
        RV.GameData.menu = 0;
        IVal.scene.dispose();
        IAudio.BGMFade(2);
        IAudio.BGSFade(2);
        IVal.scene = new STitle();
        return true;
    }

};