/**
 * 精灵组 -- 战斗画面
 */
class SpritesetBattle {
    constructor() {
        this.width = RV.System.Width;
        this.height = RV.System.Height-54;
        this.battlerPadding = 100;

        this._viewport = new IViewport(0, 54, this.width, this.height);
        this._viewport.z = 200;
        this.sPartyLp = null; // 我方耐力
        this.sEnemyLp = null; // 敌方耐力
        this.sTurnInfo = null; // 中间信息
        this.sPartyBg = null; // 我方面板背景
        this.sMenu = null; // 菜单栏
        this.sPartyStatus = null; // 我方状态栏
        this.sBattlers = []; // 主战者

        // 敌方背景

        // 敌方前景

        // 敌方状态栏

        // 敌方行动栏
    }

    init() {
        this.sPartyLp = new SpritePartyLp(0, this.height/2, this._viewport);
        this.sEnemyLp = new SpriteEnemyLp(this.width, this.height/2, this._viewport);
        this.sTurnInfo = new SpriteTurnInfo(this.width/2, this.height/2-10, this._viewport);

        this.sPartyBg = new ISprite(RF.LoadCache("System/party-bg.png"), this._viewport);
        this.sPartyBg.y = this.height/2;
        this.sPartyBg.z = 10;

        this.sMenu = new SpriteBattleMenu(this.width-186-RV.System.Padding-100, this.height/2+this.sPartyLp.height+RV.System.Padding+100, this._viewport);
        this.sPartyStatus = new SpritePartyStatus(RV.System.Padding, this.height/2+this.sPartyLp.height+RV.System.Padding, this._viewport);

        for(let i=0; i<this.gameBattle.party.battlers.length; i++) {
            this.sBattlers[i] = new SpriteBattler(i, this._viewport);
            this.sBattlers[i].x = RV.System.Padding+this.sPartyStatus.width+this.battlerPadding+(this.sBattlers[i].width+this.battlerPadding)*i;
            this.sBattlers[i].y = this.height/2+this.sPartyLp.height+RV.System.Padding;
        }
    }

    dispose() {
        if(this.sPartyLp!=null) this.sPartyLp.dispose();
        if(this.sEnemyLp!=null) this.sEnemyLp.dispose();
        if(this.sTurnInfo!=null) this.sTurnInfo.dispose();
        if(this.sPartyBg!=null) this.sPartyBg.disposeMin();
        if(this.sMenu!=null) this.sMenu.dispose();
        if(this.sPartyStatus!=null) this.sPartyStatus.dispose();
        for(let i=0; i<this.gameBattle.party.battlers.length; i++) {
            this.sBattlers[i].dispose();
        }
    }

    update() {
        if(this.sPartyLp!=null) this.sPartyLp.update();
        if(this.sEnemyLp!=null) this.sEnemyLp.update();
        if(this.sTurnInfo!=null) this.sTurnInfo.update();
        if(this.sMenu!=null) this.sMenu.update();
        if(this.sPartyStatus!=null) this.sPartyStatus.update();
        for(let i=0; i<this.gameBattle.party.battlers.length; i++) {
            this.sBattlers[i].update();
        }
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }
}