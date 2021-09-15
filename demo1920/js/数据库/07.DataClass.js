/**
 * 数据库 -- 职业
 */
class DataClass {
    constructor() {
        this.id = 0;
        this.name = ""; // 职业名
        this.face = ""; // 职业头像
        this.picture = ""; // 战斗图
        this.hp = 0; // 耐久值
        this.at = 0; // 攻击力
        this.element = 0; // 元素
        this.skills = [0, 0, 0]; // 主动技能
        this.ability = 0; // 固有被动
        this.randAbility = [0]; // 随机被动池
    }
}
