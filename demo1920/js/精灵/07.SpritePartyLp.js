/**
 * 精灵 -- 队伍耐久
 * SpritesetBattle内部使用
 */
class SpritePartyLp {
    constructor(x, y, viewport) {
        this.fontSize = 34;
        this.x = x;
        this.y = y;

        this._backBmp = RF.LoadCache("System/party-lp_0.png");
        this._back = new ISprite(this._backBmp, viewport);
        this._back.z = 100;

        this._frontBmp = RF.LoadCache("System/party-lp_1.png");
        this._frontBCof = new IBCof(this._frontBmp, 0, 0, this._back.width, this._back.height);
        this._front = new ISprite(this._frontBCof, viewport);
        this._front.z = 101;

        this._textBmp = IBitmap.CBitmap(RV.System.Width/3, this.fontSize * 2);
        this._text = new ISprite(this._textBmp, viewport);
        this._text.z = 102;
        this.drawText();

        this.animFrame = 12; // 动画持续帧数
        this._nowFrame = 0; // 当前播放帧数

        this.updatePosition();
    }

    dispose() {
        this._back.disposeMin();
        this._front.disposeMin();
        this._text.dispose();
        //this._frontBCof.dispose();
    }

    update() {
        //this.updatePosition();
        // 伤害动画
        if(this._frontBCof.width != this.frontWidth) {
            this.damaging();
        }
    }

    updatePosition() {
        this._back.x = this.x;
        this._back.y = this.y;
        this._front.x = this.x;
        this._front.y = this.y;
        this._text.x = this.x+RV.System.Padding;
        this._text.y = this.y-this.fontSize;
    }

    drawText() {
        this._text.clearBitmap();
        this._text.drawTextQ(this.gameParty.name, 10, 0, IColor.Black(), this.fontSize);
        let height = IFont.getHeight(this.gameParty.name, this.fontSize)
        this._text.drawTextQ(this.gameParty.lp, 30, height, IColor.Black(), this.fontSize);
    }

    damaging() {
        RV.GameData.Temp.waitingAnim = true;
        let remain = this.frontWidth - this._frontBCof.width;
        let remainFrame = this.animFrame - this._nowFrame;
        let frameDiff = remain / remainFrame;
        this._frontBCof.width += frameDiff;
        this._nowFrame++;
        if(this._nowFrame >= this.animFrame) {
            this._frontBCof.width = this.frontWidth;
            this._nowFrame = 0;
            this.drawText();
            RV.GameData.Temp.waitingAnim = false;
        }
    }

    get gameParty() {
        return RV.GameData.Battle.party;
    }

    get frontWidth() {
        return parseInt(this._front.width * this.gameParty.lp / this.gameParty.maxLp);
    }

    get height() {
        return this._back.height;
    }
}
