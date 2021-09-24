/**
 * 游戏数据 -- 临时使用
 * 状态机过程中数据，无需持久化
 */
class GameTemp {
    constructor() {
        this.enemyId = 0; // 当前敌人编号

        this.wait = 0; // 等待帧
        this.selectSkill = null; // 选中技能
        this.selectBattler = null; // 选中主战者
        this.waitingAnim = false; // 等待动画播放完毕
        this.inputEnable = false; // 允许玩家输入
        this.actSkill = null; // 结算中技能
        this.actBattler = null; // 结算中主战者
        this.partyDamage = 0; // 队伍当前承受伤害
        this.enemyDamage = 0; // 敌人当前承受伤害
        this.callback = null; // 动画结束后回调

    }

    resetBattle() {
        this.wait = 0;
        this.selectSkill = null;
        this.selectBattler = null;
        this.waitingAnim = false;
        this.inputEnable = false;
        this.actSkill = null;
        this.actBattler = null;
        this.partyDamage = 0;
        this.enemyDamage = 0;
        this.callback = null;
    }
}
