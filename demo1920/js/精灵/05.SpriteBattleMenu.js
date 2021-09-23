/**
 * 精灵 -- 战斗菜单
 * SpriteBattleMenu
 */
class SpriteBattleMenu {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;

        this.button1 = new SpriteButton("换人", viewport);
        this.button1.z = 100;
        this.button2 = new SpriteButton("重开", viewport);
        this.button2.z = 100;
        this.button3 = new SpriteButton("菜单", viewport);
        this.button3.z = 100;
    }

    dispose() {
        this.button1.disposeMin();
        this.button2.disposeMin();
        this.button3.disposeMin();
    }

    update() {
        this.updatePosition();
        this.button1.updateBase();
        this.button2.updateBase();
        this.button3.updateBase();

        if(this.data.processing || RV.GameData.Temp.waitingAnim) return;

        this.button1.update();
        this.button2.update();
        this.button3.update();
    }

    updatePosition() {
        this.button1.x = this.x;
        this.button1.y = this.y;
        this.button2.x = this.x;
        this.button2.y = this.y + 64;
        this.button3.x = this.x;
        this.button3.y = this.y + 2*64;
    }

    get data() {
        return RV.GameData.Battle;
    }
}
