/**
 * 精灵 -- 技能
 * SpriteBattler内部使用
 */
class SpriteSkill extends IButton{
    constructor(index, viewport) {
        let bmp1 = RF.LoadCache("System/button-skill_1.png");
        let bmp2 = RF.LoadCache("System/button-skill_2.png");
        super(bmp1, bmp2, " ", viewport, true);
        this._bmp1 = bmp1;
        this._bmp2 = bmp2;
        this.fontSize = 36;
        this.index = index;

        this._bmp0 = RF.LoadCache("System/button-skill_0.png");
        this.setEnableBitmap(this._bmp0);
    }

    updateBase() {
        this.drawTitleQ(this.gameSkill.name, IColor.White(), this.fontSize);
        let s = this.getSprite();
        s.drawTextQ(this.gameSkill.wt, 254, 8, IColor.Blue(), this.fontSize-4);
        if(this.gameSkill.pt>0) {
            s.drawTextQ(this.gameSkill.pt, 6, 8, IColor.Red(), this.fontSize-4);
        }
        this.setEnable(this.gameParty.pt >= this.gameSkill.pt);
        if(this.gameBattler.playingSkill != null || this.gameBattler.stun) this.setEnable(false);
    }

    updateClick() {
        if (IInput.up && this.isSelected() && this.getEnable()) {
            IInput.up = false;
            this.gameTemp.selectSkill = this.gameSkill;
            this.gameTemp.selectBattler = this.gameBattler;
        }
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }

    get gameParty() {
        return RV.GameData.Battle.party;
    }

    get gameBattler() {
        let battlerIndex = parseInt(this.index/3);
        return RV.GameData.Battle.party.battlers[battlerIndex];
    }

    get gameSkill() {
        let i = this.index % 3;
        switch (i) {
            case 0:
                return this.gameBattler.skill1;
            case 1:
                return this.gameBattler.skill2;
            case 2:
                return this.gameBattler.skillEx;
        }
    }
}

class SpritePlayingSkill extends ISprite {
    constructor(index, viewport) {
        let bmp = RF.LoadCache("System/button-skill_2.png");
        super(bmp, viewport);
        this.index = index;
        this.bmp = bmp;
        this.fontSize = 36;
    }

    updateBase() {
        if(this.gameSkill==null) {
            this.opacity = 0;
            return;
        }
        this.clearBitmap();
        this.opacity = 1;
        this.drawTextQ(this.gameSkill.name, 16, 6, IColor.White(), this.fontSize);
        this.drawTextQ(this.gameSkill.wtRemain, 254, 8, IColor.Blue(), this.fontSize-4);
    }

    get gameSkill() {
        return RV.GameData.Battle.party.battlers[this.index].playingSkill;
    }
}