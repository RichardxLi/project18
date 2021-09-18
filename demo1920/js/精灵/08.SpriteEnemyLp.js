/**
 * 精灵 -- 敌人耐久
 * SpritesetBattle内部使用
 */
class SpriteEnemyLp {
    constructor(x, y, viewport) {
        this.fontSize = 34;
        this.x = x;
        this.y = y;

        this._backBmp = RF.LoadCache("System/enemy-lp_0.png");
        this._back = new ISprite(this._backBmp, viewport);
        this._back.yx = 1;
        this._back.z = 1;

        this._frontBmp = RF.LoadCache("System/enemy-lp_1.png");
        this._frontBCof = new IBCof(this._frontBmp, 0, 0, this._back.width, this._back.height);
        this._front = new ISprite(this._frontBCof, viewport);
        this._front.yx = 1;
        this._front.z = 2;

        this._textBmp = IBitmap.CBitmap(RV.System.Width/3, this.fontSize * 2);
        this._text = new ISprite(this._textBmp, viewport);
        this._text.yx = 1;
        this._text.z = 3;
        this.drawText();

        this.animFrame = 12; // 动画持续帧数
        this._nowFrame = 0; // 当前播放帧数

        this._frontBCofX = 0; // 由于this._frontBCof.x有bug，独立存储cofx
    }

    dispose() {
        this._back.disposeMin();
        this._front.disposeMin();
        this._text.dispose();
        //this._frontBCof.dispose();
    }

    update() {
        this.updatePosition();
        // 伤害动画
        if(this._frontBCofX != this.frontX) {
            this.damaging();
        }
    }

    updatePosition() {
        this._back.x = this.x;
        this._back.y = this.y;
        this._front.x = this.x;
        this._front.y = this.y;
        this._text.x = this.x-RV.System.Padding;
        this._text.y = this.y-this.fontSize;
    }

    drawText() {
        this._text.clearBitmap();
        let x = this._text.width - IFont.getWidth(this.data.name, this.fontSize);
        this._text.drawTextQ(this.data.name, x - 10, 0, IColor.Black(), this.fontSize);
        x = this._text.width - IFont.getWidth(this.data.lp, this.fontSize);
        let height = IFont.getHeight(this.data.name, this.fontSize)
        this._text.drawTextQ(this.data.lp, x - 30, height, IColor.Black(), this.fontSize);
    }

    damaging() {
        let remain = this.frontX - this._frontBCofX;
        let remainFrame = this.animFrame - this._nowFrame;
        let frameDiff = remain / remainFrame;
        this._frontBCofX += frameDiff
        this._frontBCof.x = this._frontBCofX;
        this._frontBCof.width = this._front.width - this._frontBCofX;
        this._nowFrame++;
        if(this._nowFrame >= this.animFrame) {
            this._frontBCofX = this.frontX;
            this._frontBCof.x = this._frontBCofX;
            this._frontBCof.width = this._front.width - this._frontBCofX;
            this._nowFrame = 0;
            this.drawText();
        }
    }

    get data() {
        return RV.GameData.Battle.enemy;
    }

    get frontX() {
        return parseInt(this._front.width * (1 - this.data.lp / this.data.maxLp));
    }
}
