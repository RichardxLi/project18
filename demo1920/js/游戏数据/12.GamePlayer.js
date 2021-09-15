/**
 * 游戏数据 - 玩家
 */
class GamePlayer {
    constructor() {
        this._members = [new GameActor(0)];
        this._battlerIds = [0,0,0];
        this._supporterId = 0;
        this._reserverIds = [];

        this.damage = 0; // 当前承受伤害
        this.level = 1; // 难度等级
        this.battlerNum = 3; // 主战者数量
    }

    addMember(actor) {
        let n = this._members.length;
        this._members[n] = actor;
        actor.init(n);
        this.pushReserver(n);
    }

    deleteMember(id) {
        this.removeReserver(id);
        for(let i=0; i<this._battlerIds.length; i++) {
            if(this._battlerIds[i] == id) this._battlerIds[i] = 0;
        }
        if(this._supporterId == id) {
            this._supporterId = 0;
        }
    }

    actor(id) {
        return this._members[id];
    }

    battler(index) {
        return this._members[this._battlerIds[index]];
    }

    supporter() {
        return this._members[this._supporterId];
    }

    setBattler(index, id) {
        this._battlerIds[index] = id;
        for(let i=0; i<this._battlerIds.length; i++) {
            if(i == index) continue;
            if(this._battlerIds[i] == id) this._battlerIds[i] = 0;
        }
        if(this._supporterId == id) this._supporterId = 0;
    }

    setSupporter(id) {
        this._supporterId = id;
        for(let i=0; i<this._battlerIds.length; i++) {
            if(this._battlerIds[i] == id) this._battlerIds[i] = 0;
        }
    }

    pushReserver(id) {
        this._reserverIds.push(id);
    }

    removeReserver(id) {
        let n = this._reserverIds.length;
        let target = -1;
        for(let i=0; i<n; i++) {
            if(this._reserverIds[i] == id) {
                target = i;
            }
        }
        if(target == -1){
            return;
        }
        this._reserverIds.splice(target, 1);
    }

    get lpPlus() {
        // todo: 被动-耐久指挥
        return 0;
    }

    get atPlus() {
        // todo: 被动-攻击指挥
        return 0;
    }

    get maxLp() {
        let maxLp = 0;
        for(let i=0; i<this._battlerIds; i++) {
            maxLp += this.battler(i).hp;
        }
        maxLp += this.supporter().hp;
        return maxLp;
    }

    get lp() {
        let lp = this.maxLp - this.damage;
        if(lp < 0) lp = 0;
        return lp;
    }
}