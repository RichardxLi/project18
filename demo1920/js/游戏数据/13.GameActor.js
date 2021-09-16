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
    }

    init(id) {
        this.id = id;
        // 随机被动
        if(this.class.randAbility.length != 0) {
            let i = rand(0, this.class.randAbility.length);
            this.abilitys[1] = this.class.randAbility[i];
        }
    }

    get class() {
        return RD.Class(this.classId);
    }

    get element() {
        return RD.Element(this.class.element);
    }

    get baseHp() {
        return parseInt(this.class.hp * this.rate);
    }

    get baseAt() {
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
        let partyPlus = RV.GameData.Player.lpPlus;
        return parseInt(this.baseHp * (100 + this.hpPlus + partyPlus) / 100);
    }

    get at() {
        let partyPlus = RV.GameData.Player.atPlus;
        return parseInt(this.baseAt * (100 + this.atPlus + partyPlus) / 100);
    }

    skill(i) {
        return null;
    }

    get skillEx() {
        return this.skill(2);
    }

    ability(i) {
        return null;
    }

    get maxExp() {
        let maxs = [1, 2, 4, 6, 9, -1];
        return maxs[this.level];
    }

    get rate() {
        let rates = [1, 1, 1.5, 2.25, 4, 7.7];
        return rates[this.level];
    }
}
