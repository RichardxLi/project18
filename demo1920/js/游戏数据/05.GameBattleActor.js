/**
 * 游戏数据 -- 我方战斗成员
 * 处理战斗场景，我方单位数据
 * 作为GameParty的内部使用
 */
class GameBattleActor {
    constructor(actor) {
        this.actor = actor;
        this.level = actor.level;
        this.hp = actor.hp;
        this.at = actor.at;
        this.element = actor.element;
        this.skill1 = actor.skill[1];
        this.skill2 = actor.skill[2];
        this.skillEx = actor.skillEx;

        this.stun = false;
        this.boost = false;
        this.wt = 0;
        this.playingSkill = null;
    }

    reset() {
        this.stun = false;
        this.boost = false;
        this.wt = 0;
        this.playingSkill = null;
    }
}
