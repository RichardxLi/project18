/**
 * 数据库 -- 技能
 */
class DataSkill {
    constructor() {
        this.id = 0;
        this.name = ""; // 技能名
        this.icon = ""; // 图标
        this.power = 0; // 威力
        this.acc = 0; // 命中
        this.wt = 0; // 时延
        this.pt = 0; // 能量
        this.type = 0; // 0-攻击 1-治疗 2-buff 3-debuff
        this.eRate = 0; // 元素感染率up
        this.buff = []; // 附加增益
        this.debuff = []; // 附加弱化
        this.ex = 0; // 特殊效果 1-强制胜利 2-回复最大耐力9%
        this.desc = ""; // 文本描述
        this.animId = 0; // 技能动画
    }
}
