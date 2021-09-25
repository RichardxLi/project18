/**
 * 精灵组 -- 战斗画面
 */
class SpritesetBattle extends SpritesetBase{
    constructor() {
        super(0, 54);
        this.height = RV.System.Height-54;
        this.battlerPadding = 100;

        this.sPartyLp = null; // 我方耐力
        this.sEnemyLp = null; // 敌方耐力
        this.sTurnInfo = null; // 中间信息
        this.sPartyBg = null; // 我方面板背景
        this.sMenu = null; // 菜单栏
        this.sPartyStatus = null; // 我方状态栏
        this.sBattlers = []; // 主战者
        this.sBackground = null; // 背景图
        this.sEnemy = null; // 敌方前景
        this.sEnemyStatus = null; // 敌方状态栏
        this.sEnemyAction = null; // 敌方行动栏
    }

    init() {
        super.init();
        this.sPartyLp = new SpritePartyLp(0, this.height/2, this._viewport);
        this.sEnemyLp = new SpriteEnemyLp(this.width, this.height/2, this._viewport);
        this.sTurnInfo = new SpriteTurnInfo(this.width/2, this.height/2-10, this._viewport);

        this.sPartyBg = new ISprite(RF.LoadCache("System/party-bg.png"), this._viewport);
        this.sPartyBg.y = this.height/2;
        this.sPartyBg.z = 10;

        this.sMenu = new SpriteBattleMenu(this.width-186-RV.System.Padding-100, this.height/2+this.sPartyLp.height+RV.System.Padding+100, this._viewport);
        this.sPartyStatus = new SpriteStatus(RV.GameData.Battle.party, RV.System.Padding, this.height/2+this.sPartyLp.height+RV.System.Padding, this._viewport);
        this.sEnemyStatus = new SpriteStatus(RV.GameData.Battle.enemy, RV.System.Padding, RV.System.Padding, this._viewport);

        for(let i=0; i<this.gameBattle.party.battlers.length; i++) {
            this.sBattlers[i] = new SpriteBattler(i, this._viewport);
            this.sBattlers[i].x = RV.System.Padding+this.sPartyStatus.width+this.battlerPadding+(this.sBattlers[i].width+this.battlerPadding)*i;
            this.sBattlers[i].y = this.height/2+this.sPartyLp.height+RV.System.Padding;
        }

        this.sEnemy = new ISprite(RF.LoadCache("Picture/Enemy/boss.png"), this._viewport);
        this.sEnemy.yx = 0.5;
        this.sEnemy.yy = 0.5;
        this.sEnemy.x = this.width/2;
        this.sEnemy.y = this.height/4;
        this.sEnemy.z = 100;
    }

    dispose() {
        if(this.sPartyLp!=null) this.sPartyLp.dispose();
        if(this.sEnemyLp!=null) this.sEnemyLp.dispose();
        if(this.sTurnInfo!=null) this.sTurnInfo.dispose();
        if(this.sPartyBg!=null) this.sPartyBg.disposeMin();
        if(this.sMenu!=null) this.sMenu.dispose();
        if(this.sPartyStatus!=null) this.sPartyStatus.dispose();
        if(this.sEnemyStatus!=null) this.sEnemyStatus.dispose();
        for(let i=0; i<this.sBattlers.length; i++) {
            this.sBattlers[i].dispose();
        }
        if(this.sBackground!=null) this.sBackground.disposeMin();
        if(this.sEnemy!=null) this.sEnemy.disposeMin();
        super.dispose();
    }

    update() {
        super.update();
        if(this.sPartyLp!=null) this.sPartyLp.update();
        if(this.sEnemyLp!=null) this.sEnemyLp.update();
        if(this.sTurnInfo!=null) this.sTurnInfo.update();
        if(this.sMenu!=null) this.sMenu.update();
        if(this.sPartyStatus!=null) this.sPartyStatus.update();
        if(this.sEnemyStatus!=null) this.sEnemyStatus.update();
        for(let i=0; i<this.sBattlers.length; i++) {
            this.sBattlers[i].update();
        }
        this.updateBase();
    }

    updateBase() {
        if(this.gameTemp.enemyDamage > 0 && !RV.GameData.Temp.waitingAnim) {
            RV.GameData.Temp.waitingAnim = true;
            let skill = this.gameTemp.actSkill;
            let _sf = this;
            this.playEnemyDamage(skill.animId, function() {
                if(_sf.gameTemp.callback != null) _sf.gameTemp.callback();
                _sf.gameTemp.waitingAnim = false;
            });
        }
        if(this.gameTemp.partyDamage > 0 && !RV.GameData.Temp.waitingAnim) {
            //todo: 我方承伤
        }
    }

    playPartyDamage(id, endFunc=null) {
        let rect = new IRect(this.width/2, this.height/4*3, this.width/2, this.height/4*3);
        this.playAnim(id, rect, endFunc);
        this.flashParty(IColor.Red(), 24);
    }

    playEnemyDamage(id, endFunc=null) {
        let rect = new IRect(this.width/2, this.height/4, this.width/2, this.height/4);
        this.playAnim(id, rect, endFunc);
        this.flashEnemy(IColor.White(), 24);
    }

    flashParty(color, frame) {
        for(let i=0; i<this.sBattlers.length; i++) {
            this.sBattlers[i].flash(color, frame);
        }
    }

    flashEnemy(color, frame) {
        this.sEnemy.flash(color, frame);
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get logic() {
        return IVal.scene.logic;
    }
}