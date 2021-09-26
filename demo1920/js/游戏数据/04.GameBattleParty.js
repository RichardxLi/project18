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

        this.buffs = []; // <GameBuff>
        this.debuffs = []; // <GameDebuff>
    }

    setup() {
        let gamePlayer = RV.GameData.Player;
        this.name = gamePlayer.partyName;
        this.pt = 0;
        this.maxPt = 5;
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

    // 攻击增强
    atPlus() {
        // 被动 - 攻击指挥
        return 0;
    }

    // 命中
    get acc() {
        return this.baseAcc + this.accPlus;
    }

    get baseAcc() {
        // 被动 - 命中指挥
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
        // 被动 - 闪避指挥
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
        // 被动 - 抵抗指挥
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
        // 被动 - 元素抵抗
        return 0;
    }

    eDefPlus(elementId) {
        // 状态 - 元素抵抗
        return 0;
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
}
