/**
 * 调试用
 */
class SceneDebug extends SceneBase {
    constructor() {
        super();
        this.wDebug = new WindowDebug();
    };

    init() {
        super.init();
        this.wDebug.init();
        this.wDebug.show();
        this.wDebug.active = true;
        return true;
    };

    dispose() {
        super.dispose();
        this.wDebug.dispose();
    };

    update() {
        super.update();
        if(this.loading) return;

        this.wDebug.update();
    };
}