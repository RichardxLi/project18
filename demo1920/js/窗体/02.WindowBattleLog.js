/**
 * 战斗日志窗体
 * 仅展示最近两条战斗消息
 * 常驻于战斗画面顶端，右侧展开按钮关联WindowBattleLogs
 */
class WindowBattleLog extends WindowBase {
    constructor() {
        super(0, 0, RV.System.Width, 54);
        this.sButton = null;
        this.wBattleLogs = new WindowBattleLogs(this);
    };

    init() {
        super.init(RF.LoadCache("Window/battle_log_bg.png"));
        this.createSprite();
        this.z = 5000;
        this.wBattleLogs.init();
    };

    createSprite() {
        let bitmap = RF.LoadCache("Window/battle_log_down.png");
        this.sButton = new ISprite(bitmap, this._viewport);
        this.sButton.x = this.contentWidth - this.sButton.width;
        this.sButton.z = 2;
    };

    dispose() {
        if(this.sButton!=null) this.sButton.disposeMin();
        this.wBattleLogs.dispose();
        super.dispose();
    };

    update() {
        super.update();
        this.wBattleLogs.update();
        if(this._content.visible) this.updateContent();
        if(this.active) this.updateInput();
    };

    updateContent() {
        this.clear();
        let n = RV.GameData.Battle.log.length;
        let text = "";
        if(n>0) {
            text = RV.GameData.Battle.log[n-1];
            this.drawTextEx(text, 0, 0);
        }
    };

    updateInput() {
        if(this.sButton.isSelected() && IInput.up) {
            IInput.up = false;
            this.hide();
            this.wBattleLogs.show();
            this.wBattleLogs.active = true;
        }
    };
}