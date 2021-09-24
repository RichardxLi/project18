/**
 * 精灵 -- 状态栏
 * SpritesetBattle内部使用
 */
class SpriteStatus {
    constructor(data, x, y, viewport) {
        this.x = x;
        this.y = y;
        this.data = data;

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

    get gameBuffs() {
        return this.data.buffs;
    }

    get gameDebuffs() {
        return this.data.debuffs;
    }
}