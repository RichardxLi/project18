/**
 * 精灵 -- 战斗菜单
 * SpriteBattleMenu
 */
class SpriteBattleMenu {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;

        this.buttons = [];
        let txt = ["跳过", "换人", "重开", "帮助", "菜单"];
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

        if(!this.gameBattle.menuEnable) return;

        for(let i=0; i<this.buttons.length; i++) {
            this.buttons[i].update();
            if(this.buttons[i].isLeftClick()) {
                this.gameTemp.selectMenu = i;
            }
        }
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
