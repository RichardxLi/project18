/**
 * 精灵 -- 技能队列
 * SpriteBattler内部使用
 */
class SpriteEnemyActions {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;

        this.bgBmp = IBitmap.CBitmap(300,425);
        this.bg = new ISprite(this.bgBmp, viewport);
        this.bg.drawRect(new IRect(0,0,300,425), IColor.Black());
        this.bg.z = 200;

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

    get gameActions() {
        return [];
    }
}