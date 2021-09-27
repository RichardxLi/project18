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
        this.sSupporter = null; // 支援者
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
            let xOffset = 0;
            if(i>0) xOffset = this.sBattlers[i-1].width+this.battlerPadding;
            let x = RV.System.Padding+this.sPartyStatus.width+this.battlerPadding+xOffset*i;
            let y = this.height/2+this.sPartyLp.height+RV.System.Padding;
            this.sBattlers[i] = new SpriteBattler(i, x, y, this._viewport);
        }
        this.sSupporter = new SpriteSupporter(this._viewport);
        this.sSupporter.x = this.sBattlers[0].x;
        this.sSupporter.y = this.sBattlers[0].y+this.sBattlers[0].headHeight-this.sSupporter.height;

        //todo: background
        //this.sBackground.z = 1;

        this.sEnemy = new ISprite(RF.LoadCache("Picture/Enemy/boss.png"), this._viewport);
        this.sEnemy.yx = 0.5;
        this.sEnemy.yy = 0.5;
        this.sEnemy.x = this.width/2;
        this.sEnemy.y = this.height/4;
        this.sEnemy.z = 100;

        this.sEnemyAction = new SpriteEnemyActions(this.width-400-this.battlerPadding, RV.System.Padding, this._viewport);
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
        this.sSupporter.dispose();
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
        this.sSupporter.update();
        this.updateBase();
    }

    updateBase() {
        // 敌方受击 todo: =0 debuff拆分
        if(this.gameTemp.enemyDamage >= 0) {
            this.gameTemp.enemyDamage = -1;
            this.gameTemp.waitingAnim = true;
            let skill = this.gameTemp.actSkill;
            let _sf = this;
            this.playEnemyDamage(skill.animId, function() {
                _sf.gameTemp.waitingAnim = false;
            });
            return;
        }
        // 我方受击 todo: =0 debuff拆分
        if(this.gameTemp.partyDamage >= 0) {
            this.gameTemp.partyDamage = -1;
            this.gameTemp.waitingAnim = true;
            let skill = this.gameTemp.actSkill;
            let _sf = this;
            this.playPartyDamage(skill.animId, function() {
                _sf.gameTemp.waitingAnim = false;
            });
            return;
        }
        // 敌方治疗
        if(this.gameTemp.enemyHealing >= 0) {
            // todo: 治疗&buff
            return;
        }
        // 我方治疗
        if(this.gameTemp.partyHealing >= 0) {
            // todo: 治疗&buff
            return;
        }
        // 换人选择
        if (this.gameBattle.exchangeEnable) {
            for(let i=0; i<this.sBattlers.length; i++) {
                if(this.sBattlers[i].battler.isSelected()) {
                    this.sSupporter.x = this.sBattlers[i].x;
                    break;
                }
            }
            return;
        }
    }

    playPartyDamage(id, endFunc=null) {
        //todo: 伤害 未命中 伤害=0（debuff)
        let rect = new IRect(this.width/2, this.height/4*3, this.width/2, this.height/4*3);
        this.playAnim(id, rect, endFunc);
        this.flashParty(IColor.Red(), 24);
    }

    playPartyBuff(id, endFunc=null) {

    }

    playPartyDebuff(id, endFunc=null) {

    }

    playEnemyDamage(id, endFunc=null) {
        //todo: 伤害 未命中 伤害=0（debuff)
        let rect = new IRect(this.width/2, this.height/4, this.width/2, this.height/4);
        this.playAnim(id, rect, endFunc);
        this.flashEnemy(IColor.Red(), 24);
    }

    playEnemyBuff() {

    }

    playEnemyDebuff() {

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
}
