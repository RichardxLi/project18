/**
 * 游戏数据 -- 单位
 * 作为GamePlayer的内部使用
 */
class GameActor {
    constructor(classId) {
        this.id = 0; // 唯一识别号 玩家获取时分配
        this.classId = classId;
        this.name = this.class.name;
        this.face = this.class.face;
        this.picture = this.class.picture;

        this.exp = 0;
        this.level = 0;
        this.abilitys = [this.class.ability, 0, 0, 0];
        this.skill = [];
        for(let i=0; i<this.class.skills.length; i++) {
            this.skill[i] = new GameSkill(this.class.skills[i]);
        }
    }

    init(id) {
        this.id = id;
        // 随机被动
        if(this.class.randAbility.length != 0) {
            let i = rand(0, this.class.randAbility.length);
            this.abilitys[1] = this.class.randAbility[i];
        }
        for(let i=0; i<this.class.skills.length; i++) {
            this.skill[i].actorId = this.id;
        }
    }

    get class() {
        return RD.Class(this.classId);
    }

    get element() {
        return RD.Element(this.class.element);
    }

    get hpBase() {
        return parseInt(this.class.hp * this.rate);
    }

    get atBase() {
        return parseInt(this.class.at * this.rate);
    }

    get hpPlus() {
        // todo: 被动-耐久训练
        return 0;
    }

    get atPlus() {
        // todo: 被动-攻击训练
        return 0;
    }

    get hp() {
        return parseInt(this.hpBase * (100 + this.hpPlus) / 100);
    }

    get at() {
        return parseInt(this.atBase * (100 + this.atPlus) / 100);
    }

    get skillEx() {
        return this.skill[0];
    }

    ability(i) {
        return null;
    }

    get maxExp() {
        let maxs = [1, 2, 4, 6, 9, -1];
        return maxs[this.level];
    }

    // 基础数值倍率
    get rate() {
        let rates = [1, 1, 1.5, 2.25, 4, 7.7];
        return rates[this.level];
    }

    // 元素感染率
    get eRate() {
        let eRates = [0, 15, 20, 25, 30, 40];
        return eRates[this.level];
    }
}
