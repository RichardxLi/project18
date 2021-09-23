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

        this.state = 0; // 状态机
        this.processing = false; // 处理中，禁止输入
    }

    init() {
        this.turn = 0;
        this.log = [];
        this.party.setup();
        this.enemy.setup(this.enemyId);

        this.state = 0;
        this.processing = false;
    }
}
