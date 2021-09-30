/**
 * 精灵 -- 回合信息
 * SpritesetBattler内部使用
 */
class SpriteTurnInfo {
    constructor(x, y, viewport) {
        this.fontSize = 24;
        this.x = x;
        this.y = y;

        // 回合信息
        this._turnBmp = RF.LoadCache("System/turn-info.png");
        this._turn = new ISprite(this._turnBmp, viewport);
        this._turn.yx = 0.5;
        this._turn.z = 200;

        // PT值
        this._ptBmp1 = RF.LoadCache("System/pt-bg.png");
        this._ptBg = new ISprite(this._ptBmp1, viewport);
        this._ptBg.yx = 0.5;
        this._ptBg.z = 201;

        this._ptBmp2 = RF.LoadCache("System/pt-ft.png");
        this._ptBCof1 = new IBCof(this._ptBmp2, 0, 0, this._ptBg.width, this._ptBg.height);
        this._ptFt = new ISprite(this._ptBCof1, viewport);
        this._ptBCof1.width = 0;
        this._ptFt.z = 202;

        this._ptBCof2 = new IBCof(this._ptBmp1, 0, 0, this._ptBg.width, this._ptBg.height);
        this._ptMask = new ISprite(this._ptBCof2, viewport);
        this._ptBCof2.width = 0;
        this._ptMask.x = 0;
        this._ptMask.opacity = 0;
        this._ptMask.z = 203;

        this.animFrame = 12; // 动画持续帧数
        this._nowFrame = 0; // 当前播放帧数

        this.updatePosition();
    }

    dispose() {
        this._turn.disposeMin();
        this._ptBg.disposeMin();
        this._ptFt.disposeMin();
        this._ptMask.disposeMin();
    }

    update() {
        //this.updatePosition();
        this.drawText();
        if(this._ptBCof1.width != this.ptFrontWidth) {
            this.ptChanging();
        }
    }

    updatePosition() {
        this._turn.x = this.x;
        this._turn.y = this.y;
        this._ptBg.x = this.x;
        this._ptBg.y = this.y+this._turn.height;
        this._ptFt.x = this.x-this._ptBg.width/2;
        this._ptFt.y = this._ptBg.y;
        this._ptMask.y = this._ptBg.y;
    }

    drawText() {
        this._turn.clearBitmap();
        this._turn.drawTextQ("回合"+this.gameBattle.turn, 2*RV.System.Padding, RV.System.Padding, IColor.Black(), this.fontSize);
    }

    ptChanging() {
        if(RV.GameData.Temp.waitingAnim == false) {
            this._ptMask.x = this.x-this._ptBg.width/2+this._ptBCof1.width;
            this._ptBCof2.x = this._ptBCof1.width;
            this._ptBCof2.width = this.ptFrontWidth-this._ptBCof1.width;
            this._ptMask.opacity = 1;
        }
        RV.GameData.Temp.waitingAnim = true;
        this._ptBCof1.width = this.ptFrontWidth-1;
        this._ptMask.opacity = 1 - (this._nowFrame / this.animFrame);
        this._nowFrame++;
        if(this._nowFrame >= this.animFrame) {
            RV.GameData.Temp.waitingAnim = false;
            this._ptBCof1.width = this.ptFrontWidth;
            this._nowFrame = 0;
            this._ptMask.opacity = 0;
        }
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameParty() {
        return this.gameBattle.party;
    }

    get ptFrontWidth() {
        return parseInt(this._ptFt.width * this.gameParty.pt / this.gameParty.maxPt);
    }
}
