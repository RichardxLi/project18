/**
 * 精灵 -- 战斗菜单
 * SpriteBattleMenu
 */
class SpriteBattleMenu {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;

        this.buttons = [];
        let txt = ["换人", "重开", "帮助", "菜单"];
        for(let i=0; i<txt.length; i++) {
            this.buttons[i] = new SpriteButton(txt[i], viewport);
            this.buttons[i].z = 100;
        }

        this.updatePosition();
    }

    dispose() {
        for(let i=0; i<this.buttons.length; i++) {
            this.buttons[i].disposeMin();
        }
    }

    update() {
        //this.updatePosition();
        for(let i=0; i<this.buttons.length; i++) {
            this.buttons[i].updateBase();
        }

        if(!this.gameTemp.inputEnable) return;

        if(this.gameBattle.skillEnable) {
            for(let i=0; i<this.buttons.length; i++) {
                this.buttons[i].update();
            }
        }

        // todo:点击
    }

    updatePosition() {
        for(let i=0; i<this.buttons.length; i++) {
            this.buttons[i].x = this.x;
            this.buttons[i].y = this.y + i*64;
        }
    }

    get gameBattle() {
        return RV.GameData.Battle;
    }

    get gameTemp() {
        return RV.GameData.Temp;
    }
}
