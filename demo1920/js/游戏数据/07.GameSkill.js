/**
 * 游戏数据 -- 技能
 * 作为GameActor的内部使用
 */
class GameSkill {
    constructor(id) {
        this.id = id; // 技能数据库编号
        this.power = this.data.power; // 威力
        this.acc = this.data.acc; // 命中
        this.pt = this.data.pt; // 能量
        this.wt = this.data.wt; // 时延
        this.eRatePlus = this.data.eRate; // 感染率
    }

    reset() {
        this.power = this.data.power;
        this.acc = this.data.acc;
        this.pt = this.data.pt;
        this.wt = this.data.wt;
        this.eRatePlus = this.data.eRate;
    }

    get data() {
        return RD.Skill(this.id);
    }
}
