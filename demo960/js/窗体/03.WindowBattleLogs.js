/**
 * 战斗详细日志窗体
 * 作为战斗日志窗体的展开使用
 */
class WindowBattleLogs extends WindowBase {
    constructor(w) {
        let line = 10;
        super(0, 0, RV.System.Width, 42*line+12);
        this.maxLine = line;
        this.sButton = null;
        this._wBattleLog = w;
        this.start = 0;
        this.end = 0;
    }

    init() {
        this.createWindow();
        this.createViewport();
        this.createSprite();
        this.createContent();
        this.z = 5000;
        this.hide();
    }

    createWindow() {
        let bitmap = RF.LoadCache("Window/battle_logs_bg.png");
        this._window = new ISprite(bitmap);
    }

    createSprite() {
        let bitmap = RF.LoadCache("Window/battle_log_up.png");
        this.sButton = new ISprite(bitmap, this._viewport);
        this.sButton.x = this.contentWidth - this.sButton.width;
        this.sButton.z = 2;
    }

    createContent() {
        let bitmap = new IBitmap.CBitmap(
            this.contentWidth - this.standardPadding - this.sButton.width,
            this.contentHeight);
        this._content = new ISprite(bitmap, this._viewport);
        this._content.z = 1;
    }

    dispose() {
        if(this._window!=null) this._window.disposeMin();
        if(this._content!=null) this._content.dispose();
        if(this.sButton!=null) this.sButton.disposeMin();
    }

    show() {
        super.show();
        if(RV.GameData.Battle.log.length == 0) {
            this.start = -1;
            this.end = -1;
        }
        this.start = RV.GameData.Battle.log.length-1;
        this.end = this.start - this.maxLine;
        if(this.end<0) this.end = 0;
    }

    update() {
        super.update();
        this.updateBasic();
        if(!this.active) return;

        if(this.sButton.isSelected() && IInput.up) {
            IInput.up = false;
            this.hide();
            this._wBattleLog.show();
            this._wBattleLog.active = true;
        }
    }

    updateBasic() {
        this.clear();
        let j = 0;
        for(let i=this.start; i>=this.end; i--) {
            let text = RV.GameData.Battle.log[i];
            this.drawTextEx(text, 0, 42*j);
            j++;
        }
    }
}