/**
 * 游戏数据 -- 战斗模块
 */
class GameBattle {
    constructor() {
        this.turn = 0; // 回合
        this.log = []; // 战斗日志
        this.party = null; // 队伍
        this.enemy = null; // 敌人
    }

    set(party, enemy) {
        this.party = party;
        this.enemy = enemy;
    }

    reset() {
        this.turn = 0;
        this.log = [];
        this.party = null;
        this.enemy = null;
    }
}
