/**
 * 精灵 -- 主战者
 * SpritesetBattle内部使用
 */
class SpriteBattler {
    constructor(index, viewport) {
        this.index = index;
        this.x = 0;
        this.y = 0;

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
        this.playingSkill.z = 100;
    }

    dispose() {
        this.battler.disposeMin();

        for(let i=0; i<this.skills.length; i++) {
            this.skills[i].disposeMin();
        }
        this.playingSkill.disposeMin();
    }

    update() {
        this.updatePosition();
        if(this.gameBattler.isEmpty) return;

        this.updateBase();

        if(!this.gameBattle.skillEnable) return;

        for(let i=0; i<this.skills.length; i++) {
            this.skills[i].update();
            this.skills[i].updateClick();
        }
    }

    updatePosition() {
        this.battler.x = this.x;
        this.battler.y = this.y+80;
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
    }

    flash(color, frame) {
        if(this.gameBattler.isEmpty) return;
        this.battler.flash(color, frame);
    }

    get width() {
        return this.battler.width;
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameBattler() {
        return RV.GameData.Battle.party.battlers[this.index];
    }

    get gameActor() {
        return this.gameBattler.actor;
    }
}
