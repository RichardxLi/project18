/**
 * 基础场景
 * 所有场景的父类，不提供实例化
 */
class SceneBase {
    constructor() {
        // 场景启动
        this.start = false;
        // 加载中
        this.loading = false;
        // 背景精灵 <ISprite>
        this.background = null;
        // 动画
        this.anims = [];
        // 渐变
        this.transform = true;
    }

    update() {
        // alt+F4 强制退出
        if(RC.IsKeyExit()) {
            gameClose();
        }

        // alt+Enter 全屏
        if(RC.IsKeyFull()) {
            RV.System.Full = (RV.System.Full+1)%2;
            setWindowStatus(RV.System.Full);
        }

        // 加载中 - 不执行循环
        if(this.loading) return;

        // 初始化场景
        if(!this.start) {
            this.loading = true;
            this.start = true;
            if(this.init()) {
                this.loading = false;
            }
            return;
        }

        for(let i=0; i<this.anims.length; i++) {
            if(this.anims[i]!=null) {
                this.anims[i].updateBase();
            }
        }
    }

    init() {
        // 设置背景
        this.background = new ISprite(IVal.GWidth, IVal.GHeight, IColor.White());
        this.background.z = 1000;
        return true;
    }

    // transform: 是否渐变
    dispose() {
        if(this.transform) {
            this.background.fadeTo(0,40);
            let __bg = this.background;
            this.background.setOnEndFade(function(){
                __bg.dispose();
            });
        } else {
            this.background.dispose();
        }
    }

    // transform: 是否渐变
    goto(scene, transform=true) {
        this.transform = transform;
        this.dispose();
        IVal.scene = scene;
    }

    // 播放预设动画
    playAnim(id, rect, endFunc) {
        let _sf = this;
        let data = RD.Set.findResAnim(id);
        let sa = null;
        if(data instanceof DResAnimFrame) {
            sa = new SpriteAnim(this.background.viewport, id, rect, true);
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
}
