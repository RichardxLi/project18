/**
 * 战斗场景
 */
class SceneBattle extends SceneBase {
    constructor() {
        super();
        this.wLog = new WindowBattleLog();
        this.wDebug = new WindowDebug();
        this.logic = new LogicBattle();
        this.spriteset = new SpritesetBattle();
    };

    init() {
        super.init();
        this.initWindow();
        this.logic.setup();
        this.spriteset.init();
        return true;
    };

    initWindow() {
        this.wLog.init();
        this.wLog.active = true;
        this.wDebug.init();
    };

    dispose() {
        this.spriteset.dispose();
        this.wLog.dispose();
        this.wDebug.dispose();
        super.dispose();
    };

    update() {
        super.update();
        // F9调试
        if(RV.System.Debug && IInput.isKeyDown(120)) {
            if(this.wDebug.active) {
                this.wDebug.close();
            } else {
                this.wDebug.open();
                this.wDebug.active = true;
            }
        }
        if(this.wDebug.active) {
            this.wDebug.update();
            return;
        }

        this.wLog.update();

        if(RV.GameData.Temp.pauseSpriteset) return;
        this.spriteset.update();
        this.logic.updateMenu();
        this.logic.stateMain();
    };
}
