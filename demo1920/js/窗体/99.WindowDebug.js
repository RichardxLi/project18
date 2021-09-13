/**
 * 战斗详细日志窗体
 * 作为战斗日志窗体的展开使用
 */
class WindowDebug extends WindowBase {
    constructor() {
        super(100,100, 800, 600);
        this.button1 = null;
        this.button2 = null;
        this.button3 = null;
        this.button4 = null;
    };

    init() {
        super.init();
        this.z = 99999;
        this.hide();
        this.createButton();
    };

    createButton() {
        let bitmap = IBitmap.CBitmap(120, 30);

        // 按钮 -- 跳转SceneTest
        this.button1 = new ISprite(bitmap, this._viewport);
        this.button1.drawRect(new IRect(0,0,120,30), IColor.Black());
        this.button1.drawTextQ("SceneTest",8,8,IColor.White(),18);
        this.button1.x = 20;
        this.button1.y = 10;
        this.button1.z = 1001;

        // 按钮 -- 初始化战斗数据
        this.button2 = new ISprite(bitmap, this._viewport);
        this.button2.drawRect(new IRect(0,0,120,30), IColor.Black());
        this.button2.drawTextQ("初始化",8,8,IColor.White(),18);
        this.button2.x = 20;
        this.button2.y = 50;
        this.button2.z = 1001;

        // 按钮 -- 战斗测试
        this.button3 = new ISprite(bitmap, this._viewport);
        this.button3.drawRect(new IRect(0,0,120,30), IColor.Black());
        this.button3.drawTextQ("开始战斗",8,8,IColor.White(),18);
        this.button3.x = 20;
        this.button3.y = 90;
        this.button3.z = 1001;

        // 按钮 -- 临时数据设置
        this.button4 = new ISprite(bitmap, this._viewport);
        this.button4.drawRect(new IRect(0,0,120,30), IColor.Black());
        this.button4.drawTextQ("临时设置",8,8,IColor.White(),18);
        this.button4.x = 20;
        this.button4.y = 130;
        this.button4.z = 1001;
    };

    dispose() {
        super.dispose();
        this.button1.dispose();
        this.button2.dispose();
        this.button3.dispose();
        this.button4.dispose();
    };

    update() {
        super.update();
        if(!this.active) return;

        this.updateInput();
    };

    updateInput() {
        // 鼠标抬起
        if(IInput.up) {
            this.updateMouseUp();
            IInput.up = false;
        }
    };

    updateMouseUp() {
        if(this.button1.isSelected()) {
            IVal.scene.goto(new SceneTest());
        }
        if(this.button2.isSelected()) {
            this.initGameBattle();
        }
        if(this.button3.isSelected()) {
            IVal.scene.goto(new SceneBattle());
        }
        if(this.button4.isSelected()) {
            this.setTemp();
        }
    };

    // -----------------------
    initGameBattle() {
        RV.GameData.Battle.log[0] = "★ 第1回合";
        RV.GameData.Battle.log[1] = "\c3部长.豪\c0->\c4送终刀锋";
        RV.GameData.Battle.log[2] = "★ 第2回合";
        RV.GameData.Battle.log[3] = "\c3主任.杰\c0->\c4普通攻击";
        RV.GameData.Battle.log[4] = "★ 第3回合";
        RV.GameData.Battle.log[5] = "\c3主任.杰\c0->\c4自动攻击\c0造成\c35000\c0伤害";
        RV.GameData.Battle.log[6] = "\c3部长.豪\c0->\c4送终刀锋\c0造成\c310000\c0伤害";
        RV.GameData.Battle.log[7] = "\c3杂鱼士兵\c0<-\c5破甲II\c0持续\c31\c0回合";
        RV.GameData.Battle.log[8] = "\c3主任.杰\c0->\c4普通攻击\c0造成\c37500\c0伤害";
        RV.GameData.Battle.log[9] = "\c3杂鱼士兵\c0->\c4蓄力攻击\c0造成\c31000\c0伤害";
        RV.GameData.Battle.log[10] = "\c3杂鱼士兵\c0<-\c5破甲II\c0移除";
        RV.GameData.Battle.log[11] = "\c3杂鱼士兵\c0<-\c5苍穹弱点\c0持续\c31\c0回合";
        RV.GameData.Battle.log[12] = "\c3部长.豪\c0->\c4普通攻击";
        RV.GameData.Battle.log[13] = "★ 第4回合";
        RV.GameData.Battle.log[14] = "\c3部长.豪\c0->\c4普通攻击\c0造成\c39000\c0伤害";
        RV.GameData.Battle.log[15] = "\c3杂鱼士兵\c0<-\c5苍穹弱点\c0移除";
    };

    setTemp() {
        this.setTemp1();
    };

    setTemp1() {

    };
}
