/**
 * Created by 七夕小雨 on 2019/1/4.
 */
function SStart(){
    var load = 0;
    //读取工程数据
    RV.NowProject = new DProject(function(){
        load += 1;
    });
    //读取设置数据
    RV.NowSet = new DSet(function(){
        load += 1;
    });
    //读取游戏UI
    RV.NowUI = new DUI(function (){
        load += 1;
    });

    // //起屏
    var logoBmp = RF.LoadBitmap("Picture/game_logo.png");
    var logo = null;
    var background = null;
    var logoWait = 120;
    if(logoBmp != null){
        background = new ISprite(IVal.GWidth , IVal.GHeight,IColor.White());
        background.z = 9000;
        var w = IFont.getWidth("EA 0.0.0",18);
        background.drawTextQ("EA 0.0.0",
            IVal.GWidth - w - 10,IVal.GHeight - 30,
            IColor.CreatColor(87,87,87),18);
        logo = new ISprite(logoBmp);
        logo.z = 9010;
        logo.yx = 0.5;
        logo.yy = 0.5;
        logo.x = IVal.GWidth / 2;
        logo.y = IVal.GHeight / 2;
    }

    this.update = function() {

    };





    // //主更新
    // this.update = function(){
    //     if(logoBmp != null){
    //         logoWait -= 1;
    //         if(logoWait > 0){
    //             return;
    //         }
    //     }
    //     if(load >= 3){
    //     //读取设置数据
    //         RV.SaveInfo = new GSaveData();
    //         RV.SaveInfo.loadAll();
    //         RV.GameSet = new GSet();
    //         RV.GameSet.load();
    //         RV.InterpreterMain = new IMain();
    //         RV.InterpreterOther = [];
    //         this.dispose();
    //         RV.GameData = new GMain();
    //         load = -1;
    //         IVal.scene = new STitle();
    //     }
    // };
    // //释放
    // this.dispose = function(){
    //     if(logoBmp != null){
    //         background.fadeTo(0,40);
    //         logo.fadeTo(0,40);
    //         background.setOnEndFade(function(){
    //             logo.dispose();
    //             background.dispose();
    //         });

    //     }
    // };

}