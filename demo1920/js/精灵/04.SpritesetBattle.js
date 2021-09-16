/**
 * 精灵组 -- 战斗画面
 */
class SpritesetBattle {
    constructor() {
        this.width = RV.System.Width;
        this.height = RV.System.Height-54;
        this._viewport = new IViewport(0, 54, this.width, this.height);
        this._viewport.z = 200;
        this.sPartyLp = null;
        this.sEnemyLp = null;
    }

    init() {
        this.sPartyLp = new SpritePartyLp(0, this.height/2, this._viewport);
        this.sEnemyLp = new SpriteEnemyLp(this.width, this.height/2, this._viewport);
    }

    dispose() {
        if(this.sPartyLp!=null) this.sPartyLp.dispose();
        if(this.sEnemyLp!=null) this.sEnemyLp.dispose();
    }

    update() {
        if(this.sPartyLp!=null) this.sPartyLp.update();
        if(this.sEnemyLp!=null) this.sEnemyLp.update();
    }
}