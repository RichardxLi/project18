/**
 * 战斗详细日志窗体
 * 作为战斗日志窗体的展开使用
 */
class WindowBattleLogs extends WindowBase {
    constructor(w) {
        let line = 16;
        super(0, 0, RV.System.Width, 42*line+12);
        this.maxLine = line;
        this.sButton = null;
        this._wBattleLog = w;
        this.sScrollbar = null;
        this.start = 0;
        this.end = 0;
    };

    init() {
        super.init(RF.LoadCache("Window/battle_logs_bg.png"));
        this.createSprite();
        this.z = 5000;
        this.hide();
    };

    createSprite() {
        let bitmap = RF.LoadCache("Window/battle_log_up.png");
        this.sButton = new ISprite(bitmap, this._window.viewport);
        this.sScrollbar = new SpriteScrollbar(0, 0, this._window.viewport);
    };

    dispose() {
        if(this.sButton!=null) this.sButton.disposeMin();
        this.sScrollbar.dispose();
        super.dispose();
    };

    update() {
        super.update();
        if(this._content.visible) this.updateContent();
        if(this.active) this.updateInput();
    };

    updateContent() {
        this.sButton.x = this.width - this.standardPadding - this.sButton.width;
        this.sButton.y = this._viewport.y
        this.sButton.z = this.z + 10;

        this.sScrollbar.x = this.sButton.x;
        this.sScrollbar.y = this.sButton.y + this.sButton.height + 10;
        this.sScrollbar.z = this.z + 10;

        this.sScrollbar.update();
        let maxHeight = this._content.height;
        if(maxHeight > this._viewport.height) {
            this._viewport.oy = -(this.sScrollbar.progress * (maxHeight - this._viewport.height));
        } else {
            this._viewport.oy = -(this.sScrollbar.progress * 10);
        }
    };

    updateInput() {
        if(this.sButton.isSelected() && RC.IsLeftClick) {
            this.hide();
            this._wBattleLog.show();
            this._wBattleLog.active = true;
            RV.GameData.Temp.pauseState = false;
        }
    };

    show() {
        super.show();
        if(RV.GameData.Battle.log.length == 0) {
            this.start = -1;
            this.end = -1;
        }
        this.start = RV.GameData.Battle.log.length-1;
        this.end = 0;
        if(this.start-this.end > this.maxLine) this.sScrollbar.visible = true;
        this.drawContent();
    };

    drawContent() {
        if(this.start==-1 || this.end==-1) return;
        let height = (this.start+1)*42;
        let bitmap = new IBitmap.CBitmap(this.contentWidth, height);
        this._content.disposeBitmap();
        this._content.setBitmap(bitmap);

        let j = 0;
        for(let i=this.start; i>=this.end; i--) {
            let text = RV.GameData.Battle.log[i];
            this.drawTextEx(text, 0, 42*j);
            j++;
        }
    };
}