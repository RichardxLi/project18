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
        this.healing = 0; // 当前结算治疗
        this.zeroCast = 0; // 本回合0时延技能使用次数

        this.exchangeDone = false; // 本回合已换人
    }

    newTurn() {
        this.turn++;
        this.log.push(GameBattle.Log.TurnBegin(this.turn));
        this.exchangeDone = false;
        this.zeroCast = 0;
        this.party.newTurn();
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
GameBattle.CastProcess = 402;
GameBattle.Exchange = 403;
GameBattle.ExchangeProcess = 404;
GameBattle.QuickAct = 500;
GameBattle.TurnEnd = 600;
GameBattle.TurnEndAbility = 601;

GameBattle.Log = {};
// 回合开始
GameBattle.Log.TurnBegin = function(turn) {
    return `★ 回合${turn}`;
}
// 技能伤害
GameBattle.Log.Damage = function(attacker, skill, number) {
    let txt = `\c3${attacker}\c0->\c4${skill}`;
    if(number>0) {
        txt += `\c0:\c3${number}`;
    }
    return txt;
}

// 技能回复
GameBattle.Log.Heal = function(healer, skill, number) {
    let txt = `\c3${healer}\c0->\c4${skill}`;
    if(number>0) {
        txt += `\c0:\c5${number}`
    }
    return txt;
}

