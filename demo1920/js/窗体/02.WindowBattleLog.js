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
        this.createWindow();
        this.createViewport();
        this.createSprite();
        this.createContent();
        this.z = 5000;
        this.wBattleLogs.init();
    };

    createWindow() {
        let bitmap = RF.LoadCache("Window/battle_log_bg.png");
        this._window = new ISprite(bitmap);
    };

    createSprite() {
        let bitmap = RF.LoadCache("Window/battle_log_down.png");
        this.sButton = new ISprite(bitmap, this._viewport);
        this.sButton.x = this.contentWidth - this.sButton.width;
        this.sButton.z = 2;
    };

    createContent() {
        let bitmap = new IBitmap.CBitmap(
            this.contentWidth - this.standardPadding - this.sButton.width,
            this.contentHeight);
        this._content = new ISprite(bitmap, this._viewport);
        this._content.z = 1;
    };

    dispose() {
        if(this._window!=null) this._window.disposeMin();
        if(this._content!=null) this._content.dispose();
        if(this.sButton!=null) this.sButton.disposeMin();
    };

    update() {
        super.update();
        this.wBattleLogs.update();
        if(this._content.visible) this.updateContent();
        if(this.active) this.updateBasic();
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

    updateBasic() {
        if(this.sButton.isSelected() && IInput.up) {
            IInput.up = false;
            this.hide();
            this.wBattleLogs.show();
            this.wBattleLogs.active = true;
        }
    };
}