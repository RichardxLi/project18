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
        let gamePlayer = RV.GameData.Player;
        for(let i=1; i<=5; i++) {
            let actor = new GameActor(i);
            actor.init();
            gamePlayer.addMember(actor);
        }
        gamePlayer.setBattler(0, 1);
        gamePlayer.setBattler(1, 2);
        gamePlayer.setBattler(2, 3);
        gamePlayer.setSupporter(4);

    };

    setTemp() {
        this.temp1();
        this.temp2();
    };

    temp1() {
        let gameBattle = RV.GameData.Battle;
        gameBattle.log[0] = "★ 第1回合";
        gameBattle.log[1] = "\c3部长.豪\c0->\c4送终刀锋";
        gameBattle.log[2] = "★ 第2回合";
        gameBattle.log[3] = "\c3主任.杰\c0->\c4普通攻击";
        gameBattle.log[4] = "★ 第3回合";
        gameBattle.log[5] = "\c3主任.杰\c0->\c4自动攻击\c0造成\c35000\c0伤害";
        gameBattle.log[6] = "\c3部长.豪\c0->\c4送终刀锋\c0造成\c310000\c0伤害";
        gameBattle.log[7] = "\c3杂鱼士兵\c0<-\c5破甲II\c0持续\c31\c0回合";
        gameBattle.log[8] = "\c3主任.杰\c0->\c4普通攻击\c0造成\c37500\c0伤害";
        gameBattle.log[9] = "\c3杂鱼士兵\c0->\c4蓄力攻击\c0造成\c31000\c0伤害";
        gameBattle.log[10] = "\c3杂鱼士兵\c0<-\c5破甲II\c0移除";
        gameBattle.log[11] = "\c3杂鱼士兵\c0<-\c5苍穹弱点\c0持续\c31\c0回合";
        gameBattle.log[12] = "\c3部长.豪\c0->\c4普通攻击";
        gameBattle.log[13] = "★ 第4回合";
        gameBattle.log[14] = "\c3部长.豪\c0->\c4普通攻击\c0造成\c39000\c0伤害";
        gameBattle.log[15] = "\c3杂鱼士兵\c0<-\c5苍穹弱点\c0移除";
        gameBattle.log[16] = "\c3杂鱼士兵\c0->\c5普通攻击\c0造成\c3500\c0伤害";
        gameBattle.log[17] = "★ 第5回合";
        gameBattle.log[18] = "★ 第6回合";
        gameBattle.log[19] = "★ 第7回合";
        gameBattle.log[20] = "★ 第8回合";
    };

    temp2() {
        let gameBattle = RV.GameData.Battle;
        let gameParty = gameBattle.party;
        let gameEnemy = gameBattle.enemy;
        gameParty.damage(200);
        gameEnemy.damage(200);
        gameBattle.turn += 1;
        gameParty.pt += 1;

        let b1 = gameParty.battlers[0];
        b1.playingSkill = b1.skill1;
    }
}
