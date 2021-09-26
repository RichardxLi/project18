/**
 * 精灵 -- 主战者
 * SpritesetBattle内部使用
 */
class SpriteBattler {
    constructor(index, x, y, viewport) {
        this.index = index;
        this.x = x;
        this.y = y;

        if(this.gameBattler.isEmpty) {
            this.bmp = RF.LoadCache("Picture/Battler/empty.png");
            this.battler = new ISprite(this.bmp, viewport);
            this.battler.z = 100;

            this.skills = [];
            this.playingSkill = new SpritePlayingSkill(index, viewport);
            return;
        }

        this.bmp = RF.LoadCache("Picture/Battler/"+this.gameActor.picture);
        this.battler = new ISprite(this.bmp, viewport);
        this.battler.z = 100;

        this.skills = [];
        for(let i=0; i<3; i++) {
            this.skills[i] = new SpriteSkill(index*3+i, viewport);
            this.skills[i].z = 101;
        }

        this.playingSkill = new SpritePlayingSkill(index, viewport);
        this.playingSkill.z = 101;

        this.updatePosition();
    }

    dispose() {
        this.battler.disposeMin();

        for(let i=0; i<this.skills.length; i++) {
            this.skills[i].disposeMin();
        }
        this.playingSkill.disposeMin();
    }

    update() {
        //this.updatePosition();
        if(this.gameBattler.isEmpty) return;

        this.updateBase();
        this.updateInput();

        if(!this.gameBattle.skillEnable) return;

        for(let i=0; i<this.skills.length; i++) {
            this.skills[i].update();
            this.skills[i].updateInput();
        }
    }

    updatePosition() {
        this.battler.x = this.x;
        this.battler.y = this.y+this.headHeight;
        for(let i=0; i<this.skills.length; i++) {
            this.skills[i].x = this.x+8;
            this.skills[i].y = this.y+180+62*i;
        }
        this.playingSkill.x = this.x;
        this.playingSkill.y = this.y;
    }

    updateBase() {
        this.bmp = RF.LoadCache("Picture/Battler/"+this.gameActor.picture);
        this.battler.clearBitmap();
        this.battler.setBitmap(this.bmp);
        this.battler.drawRect(new IRect(0,0,this.width,40), new IColor(50,125,255));
        this.battler.drawTextQ("L"+this.gameBattler.level, 4, 6, IColor.White(), RV.System.FontSize);
        this.battler.drawTextQ("AT "+this.gameBattler.at, 60, 4, IColor.Red(), RV.System.FontSize+8);
        let elementBmp = RF.LoadCache("Picture/Element/"+this.gameActor.element.icon);
        this.battler.drawBitmap(elementBmp,this.width-40,0,false);
        for(let i=0; i<3; i++) {
            this.skills[i].updateBase();
        }
        this.playingSkill.updateBase();

        if(this.gameTemp.actBattler == this.gameBattler) {
            this.battler.z = 200;
        } else {
            this.battler.z = 100;
        }
    }

    updateInput() {
        if(!this.gameBattle.exchangeEnable) return;

        if(RC.IsLeftClick() && this.battler.isSelected()) {
            this.gameTemp.selectBattlerIndex = this.index;
        }
    }

    flash(color, frame) {
        if(this.gameBattler.isEmpty) return;
        this.battler.flash(color, frame);
    }

    get headHeight() {
        return 80;
    }

    get width() {
        return this.battler.width;
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameBattler() {
        return this.gameBattle.party.battlers[this.index];
    }

    get gameActor() {
        return this.gameBattler.actor;
    }
}

/**
 * 精灵 -- 支援者
 * SpritesetBattle内部使用
 */
class SpriteSupporter {
    constructor(viewport) {
        this.x = 0;
        this.y = 0;
        if(this.gameSupporter.isEmpty) return;

        this.bmp = RF.LoadCache("Picture/Battler/"+this.gameActor.picture);
        this.supporter = new ISprite(this.bmp, viewport);
        this.supporter.z = 500;
        this.supporter.opacity = 0;

        this.down = new ISprite(RF.LoadCache("System/down.png"), viewport);
        this.down.yx = 0.5;
        this.down.z = 500;
        this.down.opacity = 0;
    }

    dispose() {
        if(this.gameSupporter.isEmpty) return;
        this.supporter.disposeMin();
        this.down.disposeMin();
    }

    update() {
        if(this.gameSupporter.isEmpty) return;
        this.updatePosition();
    }

    updatePosition() {
        this.supporter.x = this.x;
        this.supporter.y = this.y;
        this.down.x = this.x + this.supporter.width/2;
        this.down.y = this.y + this.supporter.height;
        if(this.gameBattle.exchangeEnable) {
            this.supporter.opacity = 1;
            this.down.opacity = 1;
        } else {
            this.supporter.opacity = 0;
            this.down.opacity = 0;
        }
    }

    get height() {
        return this.supporter.height+this.down.height;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameSupporter() {
        return this.gameBattle.party.supporter;
    }

    get gameActor() {
        return this.gameSupporter.actor;
    }
}
