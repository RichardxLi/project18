/**
 * 游戏数据 -- 我方战斗队伍
 * 处理战斗场景，我方队伍数据
 * 作为GameBattle的内部使用
 */
class GameBattleParty {
    constructor() {
        this.name = "";
        this.maxLp = 0;
        this.lp = 0;
        this.pt = 0;
        this.maxPt = 0;
        this.battlers = []; // <GameBattleActor>
        this.supporter = null;
        this.combo = 0;
        this.maxAct = 0;
        this.act = 0;

        this.buffs = []; // <GameBuff>
        this.debuffs = []; // <GameDebuff>
    }

    setup() {
        let gamePlayer = RV.GameData.Player;
        this.name = gamePlayer.partyName;
        this.pt = 0;
        this.maxPt = 5;
        this.maxAct = 1;
        this.act = 0;
        this.combo = 0;
        this.buffs = [];
        this.debuffs = [];
        this.maxLp = gamePlayer.maxLp;
        this.lp = gamePlayer.lp;
        this.battlers = [];
        for(let i=0; i<gamePlayer.battlerNum; i++) {
            let actor = new GameBattleActor(gamePlayer.battler(i));
            this.battlers.push(actor);
        }
        this.supporter = new GameBattleActor(gamePlayer.supporter());
    }

    newTurn() {
        this.act = 0;
        for(let i=0; i<this.battlers.length; i++) {
            this.battlers[i].played = false;
        }
    }

    // 攻击增强
    get atPlus() {
        // todo 被动 - 攻击指挥
        return 1;
    }

    // 元素增伤
    ePlus(elementId) {
        // todo 被动 - 元素强击
        return 0;
    }

    // 威力增强
    get powerPlus() {
        // 状态 - 威力
        return 0;
    }

    // 治疗增益
    get healPlus() {
        // todo 被动 - 治疗修正
        return 0;
    }

    // 命中
    get acc() {
        return this.baseAcc + this.accPlus;
    }

    get baseAcc() {
        // todo 被动 - 命中指挥
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
        // todo 被动 - 闪避指挥
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
        // todo 被动 - 防御指挥
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
        // todo 被动 - 元素抵抗
        return 0;
    }

    eDefPlus(elementId) {
        // 状态 - 元素抵抗
        return 0;
    }

    // 时延修正 正数延后 负数提前
    get wtFix() {
        // 状态 - 时延
        return 0;
    }

    get remainAct() {
        return this.maxAct - this.act;
    }

    // 换人
    exchange(index) {
        let t = this.battlers[index];
        this.battlers[index] = this.supporter;
        this.supporter = t;
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
