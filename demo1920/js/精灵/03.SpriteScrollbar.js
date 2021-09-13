/**
 * 精灵-滑动条
 * @param x 坐标
 * @param y 坐标
 * @param viewport  所属视窗
 */
class SpriteScrollbar {
    constructor(x, y, viewport) {
        this.x = x;
        this.y = y;
        this.z = 1;
        this._viewport = viewport;
        this._backgroundBmp = RF.LoadCache("System/bar-scroll_0.png");
        this._buttonBmp = RF.LoadCache("System/bar-scroll_1.png");
        this._background = new ISprite(this._backgroundBmp, viewport);
        this._button = new ISprite(this._buttonBmp, viewport);
        this.padding = 10;
        this.visible = false;
        this.offset = 0;
        this.progress = 0;

        this._inputdy = 0;
    }

    dispose() {
        this._background.disposeMin();
        this._button.disposeMin();
    }

    // 刷帧 -- 需手动调用
    update() {
        this.updateVisible();
        this.updatePosition();

        if(this._inputdy!=0) {
            if(IInput.up) {
                this._inputdy = 0;
            } else {
                this.updateOffset();
                this._inputdy = IInput.y;
            }
        } else if (this._button.isSelected() && IInput.down){
            this._inputdy = IInput.y;
        }
    }

    updateVisible() {
        this._background.visible = this.visible;
        this._button.visible = this.visible;
    }

    updatePosition() {
        this._background.x = this.x;
        this._background.y = this.y;
        this._background.z = this.z;
        this._button.x = this.x+4;
        this._button.y = this.y+this.padding+this.offset;
        this._button.z = this.z+1;
    }

    updateOffset() {
        let startY = this._background.y + this.padding;
        let endY = this._background.y + this._background.height - this.padding - this._button.height;
        let max = endY - startY;

        let mouseMove = IInput.y - this._inputdy;
        let buttonY = this._button.y +mouseMove;
        if(buttonY < startY) buttonY = startY;
        if(buttonY > endY) buttonY = endY;

        this.offset = buttonY - startY;
        this.progress = this.offset / max;
    }
}