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
        this.processing = false; // 处理中，禁止输入
    }

    init() {
        this.turn = 0;
        this.log = [];
        this.party.setup();
        this.enemy.setup(this.enemyId);

        this.state = GameBattle.Init;
        this.processing = false;
    }

    get skillEnable() {
        return this.state == GameBattle.Main;
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
GameBattle.TurnEnd = 500;
GameBattle.TurnEndAbility = 501;