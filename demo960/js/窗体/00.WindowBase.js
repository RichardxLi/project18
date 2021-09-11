/**
* 基础窗体
* 所有窗体的父类，不提供实例化
*/
class WindowBase {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.z = 1000;
        this.width = width;
        this.height = height;
        this.standardPadding = RV.System.Padding;
        this.fontSize = RV.System.FontSize;
        this.active = false;
        this.textColor = IColor.White();


        // 背景色
        this._colorBackgroud = new IColor(0,0,0,180);
        // 窗口精灵
        this._window = null;
        // 主视窗
        this._viewport = null;
        // 内容精灵
        this._content = null;
        // 无窗口模式
        this._noWindow = false;

        this._currentTextColor = IColor.White();
        this._text = "";
    };

    // 初始化
    init(noWindow=false) {
        this._noWindow = noWindow;
        this.createWindow(noWindow);
        this.createViewport();
        this.createContent();
    };

    createWindow(noWindow) {
        if(this._window!=null) this._window.dispose();
        this._window = new ISprite(this.width, this.height, this._colorBackgroud);
        if(noWindow) {
            this._window.opacity = 0;
        }
    };

    createViewport() {
        if(this._viewport!=null) this._viewport.dispose();
        this._viewport = new IViewport(0, 0, this.contentWidth, this.contentHeight);
    };

    createContent() {
        if(this._content != null) this._content.dispose();
        let bitmap = null
        if(this.contentWidth>0 && this.contentHeight>0) {
            bitmap = new IBitmap.CBitmap(this.contentWidth, this.contentHeight)
        } else {
            bitmap = new IBitmap.CBitmap(1, 1)
        }
        this._content = new ISprite(bitmap, this._viewport);
        this._content.z = 1;
    };

    // 析构
    dispose() {
        if(this._window != null) this._window.dispose();
        if(this._content != null) this._content.dispose();
    };

    // 主循环 - 需主动请求
    update() {
        this.updateWindow();
        this.updateViewport();
    };

    updateWindow() {
        if(this._window == null) return;
        this._window.width = this.width;
        this._window.height = this.height;
        this._window.x = this.x;
        this._window.y = this.y;
        this._window.z = this.z;
    };

    updateViewport() {
        if(this._viewport == null) return;
        this._viewport.width = this.contentWidth;
        this._viewport.height = this.contentHeight;
        this._viewport.x = this.x + this.standardPadding;
        this._viewport.y = this.y + this.standardPadding;
        this._viewport.z = this.z + 1;
    };

    // 长度计算
    get contentWidth() {
        return this.width - 2 * this.standardPadding;
    };

    get contentHeight() {
        return this.height - 2 * this.standardPadding;
    };

    // 基础操作
    open() {
        if(!this._window.visible) {
            this._window.opacity = 0;
            this._window.visible = true;
        }
        if(!this._viewport.visible) {
            this._viewport.opacity = 0 ;
            this._viewport.visible = true;
        }
        if(!this._noWindow) {
            this._window.fadeTo(1, 6);
        }
        this._viewport.fadeTo(1, 6);
    };

    close() {
        this._window.fadeTo(0, 6);
        let w = this._window;
        this._window.setOnEndFade(function(){
            w.visible = false;
        });
        let v = this._viewport;
        this._viewport.fadeTo(0, 6);
        this._viewport.setOnEndFade(function(){
            v.visible = false;
        });
        this.active = false;
    };

    hide() {
        this._window.visible = false;
        this._viewport.visible = false;
        this.active = false;
    };

    show() {
        this._window.visible = true;
        this._viewport.visible = true;
    };

    // 文本操作
    drawText(text, x, y, color) {
        this._content.drawTextQ(text,x,y,color,this.fontSize);
    };

    drawTextEx(text, x, y, color=null) {
        if(color != null) {
            this.textColor = color;
            this._currentTextColor = color;
        }
        this._text = text;
        let height = IFont.getHeight(this._text, this.fontSize)
        let pos = {x:x, y:y, new_x:x, lineHeight:height}
        while(true) {
            let c = this._text.substring(0,1);
            this._text = this._text.substring(1, this._text.length);
            this._processCharacter(c, pos);
            if(this._text.length<=0) {
                break;
            }
        }
    };

    _processCharacter(c, pos) {
        switch(c) {
            case '\n': // new line
                this._processNewLine(pos);
                break;
            case '\f': //  new page
                this._processNewPage(pos);
                break;
            case '\c': // color
                this._processColor();
                break;
            default:
                this._processNormalCharacter(c, pos);
        }
    };

    _processNormalCharacter(c, pos) {
        this.drawText(c, pos.x, pos.y, this._currentTextColor);
        pos.x += IFont.getWidth(c, this.fontSize)
    };

    _processNewLine(pos) {
        pos.x  = pos.new_x;
        pos.y += pos.lineHeight;
        pos.lineHeight = IFont.getHeight(this._text,this.fontSize);
    };

    _processNewPage(pos) {};

    _processColor() {
        let c = this._text.substring(0,1);
        this._text = this._text.substring(1 , this._text.length);
        switch (parseInt(c)) {
            case 0:
                this._currentTextColor = this.C0;
                break;
            case 1:
                this._currentTextColor = this.C1;
                break;
            case 2:
                this._currentTextColor = this.C2;
                break;
            case 3:
                this._currentTextColor = this.C3;
                break;
            case 4:
                this._currentTextColor = this.C4;
                break;
            case 5:
                this._currentTextColor = this.C5;
                break;
            default:
                this._currentTextColor = this.C0;
        }
    };

    // 文本颜色
    get C0() {
        return this.textColor;
    }
    get C1() {
        return IColor.White();
    }
    get C2() {
        return IColor.Black();
    }
    get C3() {
        return IColor.Red();
    }
    get C4() {
        return IColor.Blue();
    }
    get C5() {
        return IColor.Green();
    }

    // 清空内容
    clear() {
        this._content.clearBitmap();
    };
}
