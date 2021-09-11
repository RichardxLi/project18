/**
 * 调试用
 */
class SceneDebug extends SceneBase {
    constructor() {
        super();
        this.button1 = null;
        this.button2 = null;
        this.button3 = null;
        this.button4 = null;
    }

    init() {
        super.init();
        this.createButton();
        return true;
    }

    createButton() {
        // 按钮 -- 跳转SceneTest
        this.button1 = new ISprite(120,30,IColor.Black());
        this.button1.drawTextQ("SceneTest",8,8,IColor.White(),18);
        this.button1.x = 20;
        this.button1.y = 10;
        this.button1.z = 1001;

        // 按钮 -- 初始化战斗数据
        this.button2 = new ISprite(120,30,IColor.Black());
        this.button2.drawTextQ("初始化",8,8,IColor.White(),18);
        this.button2.x = 20;
        this.button2.y = 50;
        this.button2.z = 1001;

        // 按钮 -- 战斗测试
        this.button3 = new ISprite(120,30,IColor.Black());
        this.button3.drawTextQ("开始战斗",8,8,IColor.White(),18);
        this.button3.x = 20;
        this.button3.y = 90;
        this.button3.z = 1001;

        // 按钮 -- 临时数据设置
        this.button4 = new ISprite(120,30,IColor.Black());
        this.button4.drawTextQ("临时设置",8,8,IColor.White(),18);
        this.button4.x = 20;
        this.button4.y = 130;
        this.button4.z = 1001;
    }

    dispose() {
        super.dispose();
        this.button1.dispose();
        this.button2.dispose();
        this.button3.dispose();
        this.button4.dispose();
    }

    update() {
        super.update();
        if(this.loading) return;

        this.updateInput();
    }

    updateInput() {
        // 鼠标抬起
        if(IInput.up) {
            this.updateMouseUp();
            IInput.up = false;
        }
    }

    updateMouseUp() {
        if(this.button1.isSelected()) {
            this.goto(new SceneTest());
        }
        if(this.button2.isSelected()) {
            this.initGameBattle();
        }
        if(this.button3.isSelected()) {
            this.goto(new SceneBattle());
        }
        if(this.button4.isSelected()) {
            this.setTemp();
        }
    }

    // -----------------------
    initGameBattle() {
        RV.GameData.Battle.log[0] = "战斗开始";
        RV.GameData.Battle.log[1] = "\c2----------";
        RV.GameData.Battle.log[2] = "第1回合";
        RV.GameData.Battle.log[3] = "\c3京豪\c0结算\c4送终刀锋\c0造成\c310000\c0伤害";
    }

    setTemp() {
        this.setTemp1();
    }

    setTemp1() {

    }

}