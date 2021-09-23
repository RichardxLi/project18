/**
 * 精灵组 -- 战斗画面
 */
class SpritesetBattle {
    constructor() {
        this.width = RV.System.Width;
        this.height = RV.System.Height-54;
        this._viewport = new IViewport(0, 54, this.width, this.height);
        this._viewport.z = 200;
        this.sPartyLp = null; // 我方耐力
        this.sEnemyLp = null; // 敌方耐力
        this.sTurnInfo = null; // 中间信息
        this.sPartyBg = null; // 我方面板背景
        this.sMenu = null; // 菜单栏

        // 我方状态栏

        // 主战者*3

        // 敌方背景

        // 敌方前景

        // 敌方状态栏

        // 敌方
    }

    init() {
        this.sPartyLp = new SpritePartyLp(0, this.height/2, this._viewport);
        this.sEnemyLp = new SpriteEnemyLp(this.width, this.height/2, this._viewport);
        this.sTurnInfo = new SpriteTurnInfo(this.width/2, this.height/2-10, this._viewport);

        this.sPartyBg = new ISprite(RF.LoadCache("System/party-bg.png"), this._viewport);
        this.sPartyBg.y = this.height/2;
        this.sPartyBg.z = 10;

        this.sMenu = new SpriteBattleMenu(this.width-186-RV.System.Padding, this.height/2+64+RV.System.Padding, this._viewport);
    }

    dispose() {
        if(this.sPartyLp!=null) this.sPartyLp.dispose();
        if(this.sEnemyLp!=null) this.sEnemyLp.dispose();
        if(this.sTurnInfo!=null) this.sTurnInfo.dispose();
        if(this.sPartyBg!=null) this.sPartyBg.disposeMin();
        if(this.sMenu!=null) this.sMenu.dispose();
    }

    update() {
        if(this.sPartyLp!=null) this.sPartyLp.update();
        if(this.sEnemyLp!=null) this.sEnemyLp.update();
        if(this.sTurnInfo!=null) this.sTurnInfo.update();
        if(this.sMenu!=null) this.sMenu.update();
    }

    get data() {
        return RV.GameData.Battle;
    }
}