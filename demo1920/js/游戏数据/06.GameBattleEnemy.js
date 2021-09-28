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
            return;
        }
        this.dataId = id;
    }

    setDemo() {
        this.lp = 1000;
        this.maxLp = 1000;
        this.name = "小陈同学";
        this.picture = "boss.png";
    }

    // 威力增强
    get powerPlus() {
        // 状态 - 威力
        return 0;
    }

    // 命中
    get acc() {
        return this.baseAcc + this.accPlus;
    }

    get baseAcc() {
        // 数据库命中修正
        return 0;
    }

    get accPlus() {
        // 状态 - 命中
        return 0;
    }

    // 闪避
    get eva() {
        return this.baseEva + this.evaPlus;
    }

    get baseEva() {
        // 数据库闪避修正
        return 0;
    }

    get evaPlus() {
        // 状态 - 闪避
        return 0;
    }

    // 抵抗
    get def() {
        return this.baseDef + this.defPlus;
    }

    get baseDef() {
        // 数据库防御修正
        return 0;
    }

    get defPlus() {
        // 状态 - 抵抗
        return 0;
    }

    // 元素抵抗
    eDef(elementId) {
        return this.baseEDef(elementId) + this.eDefPlus(elementId);
    }

    baseEDef(elementId) {
        // 默认为0
        return 0;
    }

    eDefPlus(elementId) {
        // 状态 - 元素抵抗
        return 0;
    }

    get data() {
        // todo:数据库
    }

    // 伤害
    doDamage(n) {
        this.lp -= n;
        if(this.lp<0) this.lp = 0;
    }

    // 治疗
    doHeal(n) {
        this.lp += n;
        if(this.lp>this.maxLp) this.lp = this.maxLp;
    }
}
