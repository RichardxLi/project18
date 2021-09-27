/**
 * 游戏数据 -- 技能
 * 作为GameActor的内部使用
 */
class GameSkill {
    constructor(id) {
        this.id = id; // 技能数据库编号
        this.name = this.data.name;
        this.animId = this.data.animId;
        this.type = this.data.type;
        this.ex = this.data.ex;
        this.power = this.data.power; // 威力
        this.acc = this.data.acc; // 命中
        this.pt = this.data.pt; // 能量
        this.wt = this.data.wt; // 时延
        this.eRatePlus = this.data.eRate; // 感染率
        this.wtDone = 0; // 已经过回合
    }

    reset() {
        this.power = this.data.power;
        this.acc = this.data.acc;
        this.pt = this.data.pt;
        this.wt = this.data.wt;
        this.wtDone = 0;
        this.eRatePlus = this.data.eRate;
    }

    get wtRemain() {
        let n = this.wt - this.wtDone;
        if(n<0) n=0;
        return n;
    }

    get data() {
        return RD.Skill(this.id);
    }
}

GameSkill.Type = {};
GameSkill.Type.ATTACK = 0;
GameSkill.Type.Heal = 1;
GameSkill.Type.Buff = 2;
GameSkill.Type.Debuff = 3;

GameSkill.Ex = {};
GameSkill.Ex.Win = 1; // 强制胜利
GameSkill.Ex.PHeal = 2; // 百分比治疗 power%
