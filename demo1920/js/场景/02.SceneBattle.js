/**
 * 战斗场景
 */
class SceneBattle extends SceneBase {
    constructor() {
        super();
        this.wLog = new WindowBattleLog();
        this.wDebug = new WindowDebug();
    };

    init() {
        super.init();
        this.initWindow();
        return true;
    };

    initWindow() {
        this.wLog.init();
        this.wLog.active = true;
        this.wDebug.init();
    };

    dispose() {
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
    };
}
