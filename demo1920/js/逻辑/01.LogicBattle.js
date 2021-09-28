/**
 * 战斗逻辑
 * 封装运算单元，管理战斗流程
 */
class LogicBattle {
    constructor() {
        this.lAct = new LogicBattleAct();
    }

    // 数据设置
    setup() {
        this.gameTemp.resetBattle();
        this.gameBattle.init(RV.GameData.Temp.enemyId);
    }

    // 菜单事件
    updateMenu() {
        switch (this.gameTemp.selectMenu) {
            case 0:
                // 跳过
                this.gameBattle.state = GameBattle.TurnEnd;
                break;
            case 1:
                // 换人
                this.gameBattle.state = GameBattle.Exchange;
                break;
            case 2:
                IVal.scene.goto(new SceneBattle());
                break;
            case 3:
            case 4:
        }
        RV.GameData.Temp.selectMenu = -1;
    }

    // 主状态机
    // 当前为一段式，后续增加"时点"重构成二段式，提升动画灵活性
    stateMain() {
        if(this.gameTemp.waitingAnim || this.gameTemp.pauseState) return;

        if(this.gameTemp.callback != null) {
            this.gameTemp.callback();
            return;
        }

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
            case GameBattle.CastProcess:
                this.castProcess();
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
            case GameBattle.Exchange:
                this.exchange();
                break;
        }
    }

    // 游戏开始
    gameBegin() {
        // todo: <开幕>被动 进队列

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
        this.gameBattle.newTurn();

        // todo: <先制>被动 进队列

        // todo: <中毒>进队列

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
        // todo: 取双方中毒状态

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
                if(b.playingSkill!=null && b.playingSkill.remainWt<=0) {
                    this.gameTemp.actSkill = b.playingSkill;
                    this.gameTemp.actBattler = b;
                    break;
                }
            }
        }

        // 无可用技能
        if(this.gameTemp.actSkill == null) {
            this.gameBattle.state = GameBattle.EnemyAct;
            return;
        }

        // 结算
        this.lAct.battlerAct();
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
        if(this.gameTemp.selectSkill != null) {
            this.gameBattle.state = GameBattle.Cast;
            return;
        }
    }

    cast() {
        let b = this.gameTemp.selectBattler;
        let s = this.gameTemp.selectSkill;

        b.playingSkill = this.gameTemp.selectSkill;
        // 消耗PT
        this.gameParty.pt -= s.pt;
        this.gameBattle.state = GameBattle.CastProcess;

    }

    castProcess() {
        let b = this.gameTemp.selectBattler;
        let s = this.gameTemp.selectSkill;

        // <活力> 增加PT
        if(b.boost) {
            b.boost = false;
            this.gameParty.pt++;
        }
        // wt修正
        s.wtDone -= this.gameParty.wtFix;
        // 行动数+1
        if(s.remainWt==0 && this.gameBattle.zeroCast==0) {
            this.gameBattle.zeroCast++;
        } else {
            this.gameParty.act++;
        }
        b.played = true;

        this.gameTemp.selectBattler = null;
        this.gameTemp.selectSkill = null;
        this.gameBattle.state = GameBattle.QuickAct;
    }


    quickAct() {
        // 当前无结算 取技能
        if(this.gameTemp.actSkill == null) {
            for (let i = 0; i < this.gameParty.battlers.length; i++) {
                let b = this.gameParty.battlers[i];
                if (b.playingSkill != null && b.playingSkill.remainWt <= 0) {
                    this.gameTemp.actSkill = b.playingSkill;
                    this.gameTemp.actBattler = b;
                    break;
                }
            }
        }

        // 无可用技能
        if(this.gameTemp.actSkill == null) {
            if(this.gameParty.remainAct > 0) {
                this.gameBattle.state = GameBattle.Main;
            } else {
                this.gameBattle.state = GameBattle.TurnEnd;
            }
            return;
        }

        // 结算
        this.lAct.battlerAct();
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

    // 换人
    exchange() {
        if(this.gameParty.supporter.isEmpty || this.gameParty.pt <= 0 || this.gameBattle.exchangeDone) {
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // 取消
        if(RC.IsRightClick()) {
            IInput.up = false;
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // 确认
        if(this.gameTemp.selectBattlerIndex >= 0) {
            this.gameParty.pt--;
            this.gameParty.exchange(this.gameTemp.selectBattlerIndex);
            this.gameBattle.state = GameBattle.Main;
            this.gameBattle.exchangeDone = true;
            this.gameTemp.selectBattlerIndex = -1;
        }
    }

    // 胜负判断
    // 1胜利 -1败北 0未分胜负
    judge() {
        if(this.gameParty.lp <= 0) return -1;
        if(this.gameEnemy.lp <= 0) return 1;
        return 0;
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameParty() {
        return this.gameBattle.party;
    }

    get gameEnemy() {
        return this.gameBattle.enemy;
    }
}
