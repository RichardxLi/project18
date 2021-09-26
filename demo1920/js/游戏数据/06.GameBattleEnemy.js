/**
 * 游戏数据 -- 战斗敌人
 * 处理战斗场景，敌方数据
 * 作为GameParty的内部使用
 */
class GameBattleEnemy {
    constructor() {
        this.dataId = 0;
        this.name = "";
        this.picture = "";
        this.lp = 0;
        this.maxLp = 0;

        this.buffs = [];
        this.debuffs = [];
        this.playingSkills = []; // <GameSkill>
    }

    setup(id) {
        if(id==0) {
            this.setDemo();
            this.name = "小陈同学";
            this.picture = "boss.png";
            return;
        }
        this.dataId = id;
    }

    setDemo() {
        this.lp = 1000;
        this.maxLp = 1000;
    }

    // 伤害
    doDamage(n) {
        this.lp -= n;
        if(this.lp<0) this.lp = 0;
    }
}
