/**
 * 战斗逻辑
 * 封装运算单元，管理战斗流程
 */
class LogicBattle {
    // 数据设置
    setup(id) {
        RV.GameData.enemyId = id;
        RV.GameData.Battle.reset();
    }

    // 开始战斗 启动状态机
    start() {

    }

    // 胜负判断
    // 1胜利 -1败北 0未分胜负
    judge() {
        return 0;
    }
}