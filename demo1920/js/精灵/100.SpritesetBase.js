/**
 * 基础精灵组
 * 所有精灵组的父类，实现动画功能
 */
class SpritesetBase {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = RV.System.Width;
        this.height = RV.System.Height;
        this.anims = [];
        this._viewport = null;
    }

    init() {
        this._viewport = new IViewport(this.x, this.y, this.width, this.height);
        this._viewport.z = 200;
    }

    dispose() {
        for(let i=0; i<this.anims.length; i++) {
            this.anims[i].disposeMin();
        }
    };

    update() {
        for(let i=0; i<this.anims.length; i++) {
            if(this.anims[i]!=null) {
                this.anims[i].updateBase();
            }
        }
    };

    playAnim(id, rect=null, endFunc=null) {
        if(rect==null) {
            rect = new IRect(0, 0, this.width, this.height);
        }
        let _sf = this;
        let data = RD.Set.findResAnim(id);
        let sa = null;
        if(data instanceof DResAnimFrame) {
            sa = new SpriteAnim(this._viewport, id, rect, true);
        }
        if(sa === null) {
            if(endFunc != null) {
                endFunc();
            }
            return;
        }
        sa.endDo = function() {
            sa.disposeMin();
            _sf.anims.remove(sa)
            if(endFunc != null) {
                endFunc();
            }
        }
        this.anims.push(sa);
        return sa;
    }

    get isAnim() {
        return this.anims.length > 0;
    }
}