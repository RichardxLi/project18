/**
 * 精灵 -- 回合信息
 * SpritesetBattler内部使用
 */
class SpriteTurnInfo {
    constructor(x, y, viewport) {
        this.fontSize = 24;
        this.x = x;
        this.y = y;

        this._backBmp = RF.LoadCache("System/turn-info.png");
        this._back = new ISprite(this._backBmp, viewport);
        this._back.yx = 0.5;
        this._back.z = 200;

        this._textBmp = IBitmap.CBitmap(this._back.width, this._back.height);
        this._text = new ISprite(this._textBmp, viewport);
        this._text.yx = 0.5;
        this._text.z = 201;

        // todo: PT值
        this._ptBmp = IBitmap.CBitmap(480, 24);
        this._pt = new ISprite(this._ptBmp, viewport);
        this._pt.yx = 0.5;
        this._pt.z = 202;
    }

    dispose() {
        this._back.disposeMin();
        this._text.dispose();
        this._pt.dispose();
    }

    update() {
        this.updatePosition();
        this.drawText();
    }

    updatePosition() {
        this._back.x = this.x;
        this._back.y = this.y;
        this._text.x = this.x;
        this._text.y = this.y;
        this._pt.x = this.x;
        this._pt.y = this.y+this._back.height;
    }

    drawText() {
        this._text.clearBitmap();
        this._text.drawTextQ("回合"+this.data.turn, 2*RV.System.Padding, RV.System.Padding, IColor.Black(), this.fontSize);
        this._pt.clearBitmap();
        this._pt.drawTextQ("PT-"+this.data.party.pt+" todo:换成图片", 100, 0, IColor.Black(), this.fontSize);
    }

    get data() {
        return RV.GameData.Battle;
    }
}
