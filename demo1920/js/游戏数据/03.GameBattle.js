/**
 * 游戏数据 -- 战斗模块
 */
class GameBattle {
    constructor() {
        this.enemyId = 0; // 敌人编号
        this.turn = 0; // 回合
        this.log = []; // 战斗日志
        this.party = new GameBattleParty(); // 队伍
        this.enemy = new GameBattleEnemy(); // 敌人
        this.background = "";

        this.state = 0; // 状态机
        this.damage = 0; // 当前结算伤害

        this.exchangeDone = false; // 本回合已换人
    }

    newTurn() {
        this.turn++;
        this.log.push(GameBattle.Log.TurnBegin(this.turn));
        this.exchangeDone = false;
    }

    init(enemyId) {
        this.enemyId = enemyId;
        this.turn = 0;
        this.log = [];
        this.party.setup();
        this.enemy.setup(this.enemyId);
        //todo:background

        this.state = GameBattle.Init;
        this.damage = 0;
        this.exchangeDone = false;
    }

    // 允许技能输入
    get skillEnable() {
        return this.state == GameBattle.Main;
    }

    // 允许菜单输入
    get menuEnable() {
        return this.state == GameBattle.Main;
    }

    // 允许换人选择输入
    get exchangeEnable() {
        return this.state == GameBattle.Exchange;
    }
}

GameBattle.Init = 0;
GameBattle.InitProcess = 1;
GameBattle.TurnBegin = 100;
GameBattle.TurnBeginAbility = 101;
GameBattle.TurnBeginStatus = 102;
GameBattle.TurnBeginDone = 103;
GameBattle.PartyAct = 200;
GameBattle.EnemyAct = 201;
GameBattle.ActDone = 202;
GameBattle.EnemyCast = 300;
GameBattle.EnemyQuickAct = 301;
GameBattle.Main = 400;
GameBattle.Cast = 401;
GameBattle.QuickAct = 402;
GameBattle.Exchange = 403;
GameBattle.ExchangeProcess = 404;
GameBattle.TurnEnd = 500;
GameBattle.TurnEndAbility = 501;

GameBattle.Log = {};
// 回合开始
GameBattle.Log.TurnBegin = function(turn) {
    return `★ 第${turn}回合`;
}
// 技能造成伤害
GameBattle.Log.Damage = function(attacker, skill, damage) {
    return `\c3${attacker}\c0->\c4${skill}\c0造成\c3${damage}\c0伤害`;
}
