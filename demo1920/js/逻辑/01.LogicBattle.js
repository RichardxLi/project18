/**
 * 战斗逻辑
 * 封装运算单元，管理战斗流程
 */
class LogicBattle {
    // 数据设置
    setup(id) {
        this.gameBattle.enemyId = id;
        this.gameBattle.init();
    }

    // 主状态机
    stateMain() {
        if(this.gameTemp.waitingAnim) return;
        log(this.gameBattle.state);

        switch (this.gameBattle.state) {
            case GameBattle.Init:
                this.gameBegin();
                break;
            case GameBattle.InitProcess:
                this.gameBeginProcess();
                break;
            case GameBattle.TurnBegin:
                this.turnBegin();
                break;
            case GameBattle.TurnBeginAbility:
                this.turnBeginAbility();
                break;
            case GameBattle.TurnBeginStatus:
                this.turnBeginStatus();
                break;
            case GameBattle.TurnBeginDone:
                this.turnBeginDone();
                break;
            case GameBattle.PartyAct:
                this.partyAct();
                break;
            case GameBattle.EnemyAct:
                this.enemyAct();
                break;
            case GameBattle.ActDone:
                this.actDone();
                break;
            case GameBattle.EnemyCast:
                this.enemyCast();
                break;
            case GameBattle.EnemyQuickAct:
                this.enemyQuickAct();
                break;
            case GameBattle.Main:
                this.main();
                break;
            case GameBattle.Cast:
                this.cast();
                break;
            case GameBattle.QuickAct:
                this.quickAct();
                break;
            case GameBattle.TurnEnd:
                this.turnEnd();
                break;
            case GameBattle.TurnEndAbility:
                this.turnEndAbility();
                break;

        }
    }

    // 游戏开始
    gameBegin() {
        // todo: <开幕>被动 进队列

        this.gameTemp.inputEnable = false;
        this.gameBattle.state = GameBattle.InitProcess;
    }

    // <开幕>处理
    gameBeginProcess() {
        // todo: 当前无结算 取队列

        // todo: 无可用被动
        if(true) {
            this.gameBattle.state = GameBattle.TurnBegin;
            return;
        }

        // todo: 结算

    }

    // 回合开始
    turnBegin() {
        this.gameBattle.turn++;
        this.gameBattle.log.push(`★ 第${this.gameBattle.turn}回合`);

        // todo: <先制>被动 进队列

        this.gameBattle.state = GameBattle.TurnBeginAbility;
    }

    // <先制>处理
    turnBeginAbility() {
        // todo: 当前无结算 取队列

        // todo: 无可用被动
        if(true) {
            this.gameBattle.state = GameBattle.TurnBeginStatus;
            return;
        }

        // todo: 被动结算

    }

    // <中毒>处理
    turnBeginStatus() {
        //todo:

        // todo: 无可用状态
        if(true) {
            this.gameBattle.state = GameBattle.TurnBeginDone;
            return;
        }
    }

    // <活力> <眩晕> <WT>处理
    turnBeginDone() {
        // 设置<活力>
        if(this.gameBattle.turn > 1) {
            for(let i=0; i<this.gameParty.battlers.length; i++) {
                let b = this.gameParty.battlers[i];
                if(b.playingSkill==null && !b.stun) {
                    b.boost = true;
                }
            }
        }

        // 解除<眩晕>
        for(let i=0; i<this.gameParty.battlers.length; i++) {
            let b = this.gameParty.battlers[i];
            b.stun = false;
        }

        // 技能步进
        for(let i=0; i<this.gameParty.battlers.length; i++) {
            let b = this.gameParty.battlers[i];
            if(b.playingSkill!=null) {
                b.playingSkill.wtDone++;
            }
        }
        for(let i=0; i<this.gameEnemy.playingSkills.length; i++) {
            let s = this.gameEnemy.playingSkills[i];
            s.wtDone++;
        }

        this.gameBattle.state = GameBattle.PartyAct;
    }

    // 玩家技能结算
    partyAct() {
        // 当前无结算 取技能
        if(this.gameTemp.actSkill == null) {
            for(let i=0; i<this.gameParty.battlers.length; i++) {
                let b = this.gameParty.battlers[i];
                if(b.playingSkill!=null && b.wt<=0) {
                    this.gameTemp.actSkill = b.playingSkill;
                    this.gameTemp.actBattler = b;
                    break;
                }
            }
        }

        // todo: 无可用技能
        if(this.gameTemp.actSkill == null) {
            this.gameBattle.state = GameBattle.EnemyAct;
            return;
        }

        // todo: 结算
        this.doAct();
    }

    // 敌人技能结算
    enemyAct() {
        // todo: 当前无结算 取技能

        // todo: 无可用技能
        if(true) {
            this.gameBattle.state = GameBattle.ActDone;
            return;
        }

        // todo: 结算

    }

    // 主结算结束
    actDone() {
        // todo: 状态步进

        // todo: 弱点暴露

        // 连击归0
        this.gameParty.combo = 0;

        this.gameBattle.state = GameBattle.EnemyCast;
    }

    // 敌人技能释放
    enemyCast() {
        // todo: 技能进队列

        this.gameBattle.state = GameBattle.EnemyQuickAct;
    }

    enemyQuickAct() {
        // todo: 当前无结算 取技能

        // todo: 无可用技能
        if(true) {
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // todo: 结算

    }

    // 等待用户输入
    main() {
        this.gameTemp.inputEnable = true;
        if(this.gameTemp.selectSkill != null) {
            this.gameBattle.state = GameBattle.Cast;
            return;
        }
    }

    cast() {
        this.gameTemp.inputEnable = false;
        this.gameTemp.selectBattler.playingSkill = this.gameTemp.selectSkill;
        this.gameTemp.selectBattler = null;
        this.gameTemp.selectSkill = null;
        this.gameBattle.state = GameBattle.QuickAct;
    }

    quickAct() {
        // todo: 当前无结算 取技能

        // todo: 无可用技能
        if(true) {
            this.gameBattle.state = GameBattle.TurnEnd;
            return;
        }

        // todo: 结算

    }

    // 回合结束
    turnEnd() {
        // todo: <后发>被动 进队列

        this.gameBattle.state = GameBattle.TurnEndAbility;
    }

    // 后发处理
    turnEndAbility() {
        // todo: 当前无结算 取队列

        // todo: 无可用被动
        if(true) {
            this.gameBattle.state = GameBattle.TurnBegin;
            return;
        }

        // todo: 被动结算

    }

    // 我方技能结算
    doAct() {
        // todo: 计算伤害
        this.gameTemp.enemyDamage = 100;
        this.gameEnemy.damage(this.gameTemp.enemyDamage);

        // 设置回调
        this.gameTemp.callback = this.doActCallback
    }

    // 技能结算回调 ()
    doActCallback() {
        RV.GameData.Temp.callback = null;
        RV.GameData.Temp.actSkill.wtDone = 0;
        RV.GameData.Temp.actSkill = null;
        RV.GameData.Temp.actBattler.playingSkill = null;
        RV.GameData.Temp.actBattler = null;
    }

    // 胜负判断
    // 1胜利 -1败北 0未分胜负
    judge() {
        return 0;
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameParty() {
        return RV.GameData.Battle.party;
    }

    get gameEnemy() {
        return RV.GameData.Battle.enemy;
    }
}