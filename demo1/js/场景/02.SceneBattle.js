/**
 * 战斗场景
 */
class SceneBattle extends SceneBase {
    constructor() {
        super();
        this.wLog = new WindowBattleLog();
    }

    init() {
        super.init();
        this.initWindow();
        return true;
    }

    initWindow() {
        this.wLog.init();
        this.wLog.active = true;
    }

    dispose() {
        this.wLog.dispose();
        super.dispose();
    }

    update() {
        super.update();
        this.wLog.update();
    }
}
