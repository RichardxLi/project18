/**
 * 战斗逻辑
 * 封装运算单元，管理战斗流程
 */
class LogicBattle {
    // 数据设置
    setup() {
        this.gameTemp.resetBattle();
        this.gameBattle.init(RV.GameData.Temp.enemyId);
    }

    // 主状态机
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

        // 无可用技能
        if(this.gameTemp.actSkill == null) {
            this.gameBattle.state = GameBattle.EnemyAct;
            return;
        }

        // 结算
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

        // 无可用技能
        if(this.gameTemp.actSkill == null) {
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // 结算
        this.doAct();
    }

    // 等待用户输入
    main() {
        if(this.gameTemp.selectSkill != null) {
            this.gameBattle.state = GameBattle.Cast;
            return;
        }
    }

    cast() {
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

    // 换人
    exchange() {
        if(this.gameParty.supporter.isEmpty || this.gameParty.pt <= 0 || this.gameBattle.exchangeDone) {
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // 取消
        if(RC.IsRightClick()) {
            this.gameBattle.state = GameBattle.Main;
            return;
        }

        // 确认
        if(this.gameTemp.selectBattlerIndex >= 0) {
            let t = this.gameParty.supporter;
            this.gameParty.supporter = this.gameParty.battlers[this.gameTemp.selectBattlerIndex];
            this.gameParty.battlers[this.gameTemp.selectBattlerIndex] = t;
            this.gameParty.pt--;
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

    // -----------------------------------------------
    // 我方技能结算
    doAct() {
        let a = this.gameTemp.actBattler;
        let p = this.gameParty;
        let d = this.gameBattle.enemy;
        let s = this.gameTemp.actSkill;
        let e = a.element;
        let at = a.at * (100+p.atPlus) / 100;
        let baseDamage = at * (s.power+p.powerPlus) / 20;
        let minDamage = 0.05*baseDamage;

        switch (s.type) {
            case GameSkill.Type.ATTACK:
                // 修正计算
                let elementRate = (100 + this.gameParty.ePlus(e.id)) / 100; // 被动提供的元素易伤
                let dmgRate = this.dmgRateWithDebuffs(d.debuffs, e.id); // 目标debuff提供的易伤
                let defRate = this.defRateWithDebuffs(d.buffs, e.id); // 目标buff提供的抵抗
                let fixedDamage = baseDamage * elementRate * dmgRate * (100 - defRate) / 100; // 修正伤害
                if(fixedDamage < minDamage) fixedDamage = minDamage;

                // 命中计算
                let acc = 100;
                if(s.acc >= 0) {
                    acc = s.acc + p.acc - d.eva;
                    if(acc < 0) acc = 0;
                }
                this.gameTemp.isHit = this.isHit(acc);

                let damage = 0;
                if(this.gameTemp.isHit) {
                    damage = this.comboRate()*fixedDamage;
                } else {
                    damage = 0.1*baseDamage;
                    if(damage > fixedDamage) {
                        damage = fixedDamage;
                    }
                }

                // 设置伤害
                if(damage<=0) damage = 1;
                this.gameBattle.damage = parseInt(damage);
                this.gameTemp.enemyDamage = this.gameBattle.damage;
                this.gameTemp.callback = this.enemyDamageCallback
                break;
            case GameSkill.Type.Heal:
                break;
            case GameSkill.Type.Buff:
                break;
            case GameSkill.Type.Debuff:
                break;
        }
    }

    // 敌人承伤回调
    enemyDamageCallback() {
        let gameTemp = RV.GameData.Temp;
        let gameBattle = RV.GameData.Battle
        let gameEnemy = gameBattle.enemy;
        gameEnemy.doDamage(gameBattle.damage);
        if(gameTemp.isHit) {
            gameBattle.party.combo++;
            // todo: 附加状态
        }
        gameTemp.callback = null;
        gameTemp.actSkill.wtDone = 0;
        gameTemp.actSkill = null;
        gameTemp.actBattler.playingSkill = null;
        gameTemp.actBattler = null;
    }

    // debuff提供的伤害易伤
    dmgRateWithDebuffs(debuffs, elementId) {

    }

    // buff提供的伤害抵抗
    defRateWithDebuffs(buffs, elementId) {

    }

    // 命中判定
    isHit(acc) {
        return acc > rand(0,99);
    }

    // 连击倍率
    comboRate() {
        let rate = 100;
        for(let i=0; i<this.gameBattle.party.combo; i++) {
            rate += 20+i*10;
        }
        if(rate>300) rate = 300;
        return rate / 100;
    }
}
