/**
 * 精灵 -- 队伍状态
 * SpritesetBattle内部使用
 */
class SpritePartyStatus {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;

        this.bgBmp = IBitmap.CBitmap(300,425);
        this.bg = new ISprite(this.bgBmp, viewport);
        this.bg.drawRect(new IRect(0,0,300,425), IColor.White());
        this.bg.z = 100;

        this.updatePosition();
    }

    dispose() {
        this.bg.dispose();
    }

    update() {
        //this.updatePosition();
    }

    updatePosition() {
        this.bg.x = this.x;
        this.bg.y = this.y;
    }

    get width() {
        return this.bg.width;
    }

    get gameParty() {
        return RV.GameData.Battle.party;
    }

    get gameBuffs() {
        return this.gameParty.buffs;
    }

    get gameDebuffs() {
        return this.gameParty.debuffs;
    }
}