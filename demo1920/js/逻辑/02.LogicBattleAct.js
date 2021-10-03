/**
 * 技能结算逻辑
 * 作为LogicBattle内部使用
 * 为方便计算，相关变量作为类的属性传递上下文
 */
class LogicBattleAct {
    // 主战者技能结算
    battlerAct() {
        this.a = this.gameTemp.actBattler;
        this.p = this.gameParty;
        this.d = this.gameBattle.enemy;
        this.s = this.gameTemp.actSkill;
        this.e = this.a.element;
        this.at = this.a.at * (100+this.p.atPlus) / 100;
        this.baseDamage = this.at * (this.s.power+this.p.powerPlus) / 20;
        this.minDamage = 0.05*this.baseDamage;
        this.gameTemp.isHit = this.makeBattlerHit();    // 命中判定

        // 特殊效果结算
        if(this.specialAct(this.s.ex)) return;

        // 一般结算
        switch (this.s.type) {
            case GameSkill.Type.ATTACK: {
                this.damage = this.makeBattlerDamage();
                // 设置伤害
                this.gameBattle.damage = parseInt(this.damage);
                this.gameTemp.enemyDamage = this.gameBattle.damage;
                this.gameTemp.callback = this.enemyDamagedCallback;
                break;
            }
            case GameSkill.Type.Heal: {
                // 修正计算
                let healing = this.baseDamage * (100 + this.gameParty.healPlus) / 100;
                // 设置治疗
                this.gameBattle.healing = parseInt(healing);
                this.gameTemp.partyHealing = this.gameBattle.healing;
                this.gameTemp.callback = this.partyHealedCallback;
                break;
            }
            case GameSkill.Type.Buff: {
                // 设置buff 治疗=0
                this.gameBattle.healing = 0;
                this.gameTemp.partyHealing = this.gameBattle.healing;
                this.gameTemp.callback = this.partyHealedCallback;
                break;
            }
            case GameSkill.Type.Debuff: {
                // 设置debuff 伤害=0
                this.gameBattle.damage = 0;
                this.gameTemp.enemyDamage = this.gameBattle.damage;
                this.gameTemp.callback = this.enemyDamagedCallback;
                break;
            }
        }
    }

    // 计算主战者产生伤害
    // @return 伤害值
    makeBattlerDamage() {
        // 修正计算
        let elementRate = (100 + this.gameParty.ePlus(this.e.id)) / 100; // 被动提供的元素易伤
        let dmgRate = this.dmgRateWithDebuffs(this.d.debuffs, this.e.id); // 目标debuff提供的易伤
        let defRate = this.defRateWithDebuffs(this.d.buffs, this.e.id); // 目标buff提供的抵抗
        let fixedDamage = this.baseDamage * elementRate * dmgRate * defRate; // 修正伤害
        if (fixedDamage < this.minDamage) fixedDamage = this.minDamage;

        // 最终伤害
        let damage = 0;
        if (this.gameTemp.isHit) {
            damage = this.comboRate() * fixedDamage;
        } else {
            damage = 0.1 * this.baseDamage;
            if (damage > fixedDamage) {
                damage = fixedDamage;
            }
        }
        if (damage <= 0) damage = 1;
        return damage;
    }

    // 队伍命中
    makeBattlerHit() {
        let acc = 100;
        if (this.s.acc >= 0) {
            acc = this.s.acc + this.p.acc - this.d.eva;
            if (acc < 0) acc = 0;
        }
        return this.isHit(acc);
    }

    // 敌人承伤回调
    enemyDamagedCallback() {
        let gameTemp = RV.GameData.Temp;
        let gameBattle = RV.GameData.Battle;
        let a = gameTemp.actBattler;
        let d = gameBattle.enemy;
        let s = gameTemp.actSkill;
        gameBattle.log.push(GameBattle.Log.Damage(a.name, s.name, gameBattle.damage));

        d.doDamage(gameBattle.damage);
        if(gameTemp.isHit) {
            gameBattle.party.combo++;
            // todo: 附加状态 队伍&敌人
        }

        // 结算清空
        gameTemp.callback = null;
        gameTemp.actSkill.wtDone = 0;
        gameTemp.actSkill = null;
        gameTemp.actBattler.playingSkill = null;
        gameTemp.actBattler = null;
    }

    // 队伍治疗回调
    partyHealedCallback() {
        let gameTemp = RV.GameData.Temp;
        let gameBattle = RV.GameData.Battle;
        let h = gameTemp.actBattler;
        let s = gameTemp.actSkill;
        gameBattle.log.push(GameBattle.Log.Heal(h.name, s.name, gameBattle.healing));

        if(gameBattle.healing > 0) {
            gameBattle.party.doHeal(gameBattle.healing);
            // todo: 随机清除debuff
        }

        // todo:附加状态 队伍

        // 结算清空
        gameTemp.callback = null;
        gameTemp.actSkill.wtDone = 0;
        gameTemp.actSkill = null;
        gameTemp.actBattler.playingSkill = null;
        gameTemp.actBattler = null;
    }

    // 特殊效果结算
    // @return 是否阻止一般结算
    specialAct(ex) {
        let stop = false;
        // todo
        switch (ex) {
            case GameSkill.Ex.Win:
                stop = this.exWin();
                break;
            case GameSkill.Ex.PHeal:
                stop = this.exPHeal();
                break;
            case GameSkill.Ex.Stun:
                stop = this.exStun();
                break;
        }
        return stop;
    }

    exWin() {
        // 设置伤害
        this.gameBattle.damage = 0;
        this.gameTemp.enemyDamage = this.gameBattle.damage;
        this.gameTemp.callback = this.winCallback;
        return true;
    }

    winCallback() {
        let gameTemp = RV.GameData.Temp;

        // todo

        // 结算清空
        gameTemp.callback = null;
        gameTemp.actSkill.wtDone = 0;
        gameTemp.actSkill = null;
        gameTemp.actBattler.playingSkill = null;
        gameTemp.actBattler = null;
    }

    exPHeal() {
        // 修正计算
        let healing = this.gameParty.maxLp * this.s.power;
        // 设置治疗
        this.gameBattle.healing = parseInt(healing);
        this.gameTemp.partyHealing = this.gameBattle.healing;
        this.gameTemp.callback = this.partyHealedCallback;
        return true;
    }

    exStun() {
        let randIndex = [];
        if(this.gameTemp.isHit) {
            for(let i=0; i<this.gameParty.battlers; i++) {
                randIndex.push(i);
            }
        }
        randIndex = RF.shuffle(randIndex);
        for(let i=0; i<randIndex.length; i++) {
            if(!this.gameParty.battlers[i].stun) {
                this.gameParty.battlers[i].stun = true;
                break;
            }
        }
        return false;
    }

    // -------------------------------------------------------------------------------
    // debuff提供的伤害易伤 增益后倍率
    dmgRateWithDebuffs(debuffs, elementId) {
        // todo:
        return 1;
    }

    // buff提供的伤害抵抗 减免后倍率
    defRateWithDebuffs(buffs, elementId) {
        // todo:
        return 1;
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