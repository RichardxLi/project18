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
        this.drawTitleQ(this.gameSkill.data.name, IColor.White(), this.fontSize);
        let s = this.getSprite();
        s.drawTextQ(this.gameSkill.wt, 254, 8, IColor.Blue(), this.fontSize-4);
        if(this.gameSkill.pt>0) {
            s.drawTextQ(this.gameSkill.pt, 6, 8, IColor.Red(), this.fontSize-4);
        }
        if(this.gameBattler.playingSkill != null) {
            this.setEnable(false);
        } else {
            this.setEnable(this.gameParty.pt >= this.gameSkill.pt);
        }
    }

    updateClick() {
        if(IInput.up && this.isSelected() && this.getEnable()) {
            IInput.up = false;
            log(this.gameSkill);
        }
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