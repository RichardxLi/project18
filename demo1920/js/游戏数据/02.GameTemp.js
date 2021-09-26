/**
 * 游戏数据 -- 临时使用
 * 状态机过程中数据，无需持久化
 */
class GameTemp {
    constructor() {
        this.enemyId = 0; // 当前敌人编号

        this.wait = 0; // 等待帧
        this.waitingAnim = false; // 等待动画播放完毕
        this.pauseState = false; // 暂停逻辑状态机
        this.selectMenu = -1; // 菜单选项

        this.selectSkill = null; // 选中技能
        this.selectBattler = null; // 选中主战者
        this.selectBattlerIndex = -1; // 选中主战者索引
        this.actSkill = null; // 结算中技能
        this.actBattler = null; // 结算中主战者
        this.callback = null; // 动画结束后回调

    }

    resetBattle() {
        this.wait = 0;
        this.waitingAnim = false;
        this.pauseState = false;
        this.selectMenu = -1;
        this.selectSkill = null;
        this.selectBattler = null;
        this.selectBattlerIndex = -1;
        this.actSkill = null;
        this.actBattler = null;
        this.callback = null;
    }
}
