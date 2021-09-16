/**
 * 游戏数据 -- 战斗敌人
 * 处理战斗场景，敌方数据
 * 作为GameParty的内部使用
 */
class GameBattleEnemy {
    constructor() {
        this.name = "小陈同学";
        this.lp = 0;
        this.maxLp = 0;
    }

    setup(id) {
        if(id==0) {
            this.setDemo();
            return;
        }

    }

    setDemo() {
        this.lp = 1000;
        this.maxLp = 1000;
    }

    // 伤害
    damage(n) {
        this.lp -= n;
        if(this.lp<0) this.lp = 0;
    }
}
