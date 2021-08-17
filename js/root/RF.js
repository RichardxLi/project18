/**
 * Created by 七夕小雨 on 2019/1/3.
 * 通用函数
 */
function RF(){}

/**
 * 读取图片
 * @param path 图片地址
 */
RF.LoadBitmap = function(path){
    return IBitmap.WBitmap("Graphics/" + path);
};

/**
 * 读取缓存
 * @param path 图片地址
 * @param func 读取完毕后回调
 * @param tag 读取过程中tag
 * @returns {*} 缓存中图片
 */
RF.LoadCache = function(path,func,tag){
    if(RV.Cache[path] == null){
        RV.Cache[path] = RF.LoadBitmap(path);
        RV.Cache[path].loadTexture();
        if(RV.Cache[path].complete){
            if(func != null) func(RV.Cache[path],tag)
        }else if(func != null){
            RV.Cache[path].onload = function(){
                func(RV.Cache[path],tag);
            };
            RV.Cache[path].onerror = function(){
                func(null,tag);
            };
        }
        return RV.Cache[path];
    }else{
        if(func != null){
            if(func != null) func(RV.Cache[path],tag);
        }
        return RV.Cache[path];
    }
};


/**
 * 预加载UI资源
 * @param fileAry 文件数组
 * @param loadOver 加载完毕后回调 function(ary)
 */
RF.CacheUIRes = function(fileAry,loadOver){
    var index = 0;
    var hash = {};
    if(fileAry.length == 0){
        loadOver([]);
        return;
    }
    for(var i = 0;i<fileAry.length;i++){
        var bitmap = RF.LoadBitmap(fileAry[i]);
        hash[fileAry[i]] = bitmap;
    }
    for(var key in hash){
        bitmap = hash[key];
        if(bitmap.complete){
            index += 1;
            if(index >= Object.keys(hash).length){
                loadOver(hash)
            }
        }else{
            bitmap.onload = function(){
                index += 1;
                if(index >= Object.keys(hash).length){
                    loadOver(hash)
                }
            };
            bitmap.onerror = function(){
                index += 1;
                if(index >= Object.keys(hash).length){
                    loadOver(hash)
                }
            };
        }
    }
};


/**
 *获得时间数字
 * @param s
 * @returns {string}
 * @constructor
 */
RF.MakerTime = function(s){
    var hour = 0;
    var min = 0;
    var sec = 0;
    if(s >= 3600){
        hour = parseInt(s / 3600);
        if(hour < 10) hour = "0"+ parseInt(s / 3600);
        min = (parseInt(s / 60) % 60);
        if(min < 10) min = "0"+ (parseInt(s / 60) % 60);
        sec = parseInt(s % 60);
        if(sec < 10) sec = "0"+ parseInt(s % 60);
    }else if(s >= 60){
        hour = "00";
        min = parseInt(s / 60);
        if(min < 10) min = "0"+ parseInt(s / 60);
        sec = parseInt(s % 60);
        if(sec < 10) sec = "0"+ parseInt(s % 60);
    }else{
        hour = "00";
        min = "00";
        sec = s;
        if(sec < 10) sec = "0"+ s;
    }
    return hour + ":" + min + ":" + sec;
};
/**
 * 获得时间戳
 * @constructor
 */
RF.GetTime = function(){
    var time = Number(new Date());
    return parseInt(time / 1000);
};

/**
 * 绘制连续窗口
 * @param fbmp 目标Sprite
 * @param bmp  资源bitmap
 * @param w    窗口宽度
 * @param h    窗口高度
 * @param x    窗口x偏移
 * @param y    窗口y偏移
 * @param l    单位格尺寸（保证正方形）;
 */
RF.DrawFrame = function( fbmp, bmp,  w, h, x, y , l){
    var width = w;
    var height = h;

    var g = fbmp;

    var lt = l;

    //四个边
    g.drawBitmap(bmp[0], x, y);
    g.drawBitmap(bmp[2], x + width - lt, y);
    g.drawBitmap(bmp[5], x, y + height - lt);
    g.drawBitmap(bmp[7], x + width - lt, y + height - lt);
    //计算长宽
    width = width - lt - lt;
    height = height- lt - lt;

    g.drawBitmapRect(bmp[1], new IRect(x + lt,y, x + lt + width , y + lt),false);//上
    g.drawBitmapRect(bmp[3], new IRect(x,y + lt,x + lt,y + lt + height),false);//左
    g.drawBitmapRect(bmp[6], new IRect(x + lt, y + height + lt, x + lt + width,y + height + lt + lt),false);//下
    g.drawBitmapRect(bmp[4], new IRect(x + width + lt , y + lt,x + width + lt + lt,y + lt + height),false);//右
    g.drawBitmapRect(bmp[8], new IRect(x + lt,y + lt,x + lt +width,y + lt+height),false);//肚子

};

/**
 * 默认颜色 0号
 * @returns {IColor}
 */
RF.C0 = function(){
    return IColor.White();
};

/**
 * 显示tips
 * @param m tips 内容
 */
RF.ShowTips = function(m){
    // todo
    // if(IVal.scene instanceof SMain == false) return;
    // var main =IVal.scene.getMainUI();
    // var back = main.tipBack;
    // var text = main.tipText;
    // LUI.setText(text,RF.MakerValueText(m));
    // back.width = text.width + text.data.x * 2;
    // back.height = text.height + text.data.y * 2;
    // var r = LUI.getCtrlRect(back.data,main.ctrlItems,0,0);
    // var r1 = back.GetRect();
    // var endX = r.x + DUI.HPoint(back.data.x,back.data.HAlign, r.width, r1.width);
    // var endY = r.y + DUI.VPoint(back.data.y,back.data.VAlign, r.height,r1.height);
    // back.x = endX;
    // back.y = endY;
    // text.x = back.x + text.data.x;
    // text.y = back.y + text.data.y;
    // back.opacity = 1;
    // text.opacity = 1;
    // back.pauseAnim();
    // text.pauseAnim();
    // back.addAction(action.wait,60 + m.length * 4);
    // back.addAction(action.fade,1,0,60);
    // text.addAction(action.wait,60 + m.length * 4);
    // text.addAction(action.fade,1,0,60);
};

/**
 * 关键字符串转译为“空”
 * @param str
 * @returns {String}
 */
RF.TextAnalysisNull = function(str){
    var s = new String(str);
    s = ISprite.toRegular(s);
    s = s.replaceAll("\\r\\n", "\\n");
    s = s.replaceAll("\\\\[Nn]", RF.CharToAScII(60000));
    s = s.replaceAll("\\\\[Cc]\\[([0-9]+,[0-9]+,[0-9]+)]", "");
    s = s.replaceAll("\\\\[Ss]\\[([0-9]+)]", "");
    s = s.replaceAll("\\\\[Pp]", "");
    s = s.replaceAll("\\\\[Ww]\\[([0-9]+)]", "");
    s = s.replaceAll("\\\\[Vv]\\[([a-zA-Z0-9-_]+)]","  ");
    s = s.replaceAll("\\\\cd", "");
    s = s.replaceAll("\\\\ck", "");
    s = s.replaceAll("\\\\=", "");
    s = s.replaceAll("\\\\>", "");
    s = s.replaceAll("\\\\~", "");
    s = s.replaceAll("\\\\\\|", "");
    return s;
};
/**
 * 字符串转译为关键编码
 * @param str
 * @returns {String}
 * @constructor
 */
RF.TextAnalysis = function(str){
    var s = new String(str);
    s = ISprite.toRegular(s);
    s = s.replaceAll("\\r\\n", "\\n");
    s = s.replaceAll("\\\\[Nn]", RF.CharToAScII(60000));
    s = s.replaceAll("\\\\[Cc]\\[([0-9]+,[0-9]+,[0-9]+)]",RF. CharToAScII(60001) + "[$1]");
    s = s.replaceAll("\\\\[Ss]\\[([0-9]+)]", RF.CharToAScII(60002) + "[$1]");
    s = s.replaceAll("\\\\[Pp]", RF.CharToAScII(60100));
    s = s.replaceAll("\\\\[Ww]\\[([0-9]+)]", RF.CharToAScII(60104) + "[$1]");
    s = s.replaceAll("\\\\[Vv]\\[([a-zA-Z0-9-_]+)]",RF.CharToAScII(60003) +"[$1]");
    s = s.replaceAll("\\\\>", RF.CharToAScII(60105));
    s = s.replaceAll("\\\\=", RF.CharToAScII(60106));
    s = s.replaceAll("\\\\~", RF.CharToAScII(60101));
    s = s.replaceAll("\\\\\\|", RF.CharToAScII(60103));
    return s;
};

/**
 * iFAction 坐标字符转译
 * @param win 窗口
 * @param self 要计算坐标的对象 //{#RF.js_m_7#}
 * @param value 字符串或固定值
 * @param xy x方向或y方向 //{#RF.js_m_7#}
 * @returns Number
 */
RF.PointTranslation = function(win,self,value,xy){
    if(typeof(value)=='string'){
        var tag = value.split("_");
        var obj = tag[0];
        var alignment = tag[1];
        var deviation =  parseInt(tag[2]);
        var val = 0;
        var val2 = 0;
        var vars = 0;
        if(obj == "scene"){
            if(xy == "x"){
                val = IVal.GWidth;
                vars = self.width;
            }else{
                val = IVal.GHeight;
                vars = self.height;
            }
        }else{
            try{
                if(xy == "x"){
                    val = win.getEval(obj + ".width");
                    val2 = win.getEval(obj + ".x");
                    vars = self.width;
                }else{
                    val = win.getEval(obj + ".height");
                    val2 = win.getEval(obj + ".y");
                    vars = self.height;
                }
            }catch(e){ return 0}

        }
        if(alignment == "left" || alignment == "top"){
            return val2 + deviation;
        }else if(alignment == "center"){
            return (val2 + (val - vars) / 2) + deviation;
        }else if(alignment == "right" || alignment == "bottom"){
            return (val2 + val - vars) + deviation;
        }

    }else{
        return value;
    }
};

/**
 * 对数组的值进行随机选择
 * @param ary
 * @returns {null|*}
 * @constructor
 */
RF.RandomChoose = function(ary){
    if(ary == null || ary.length <= 0){
        return null;
    }
    return ary[Math.floor(Math.random() * ary.length)];
};
/**
 * 指定概率是否达成
 * @param rate 概率 浮点
 * @returns {boolean}
 */
RF.ProbabilityHit = function(rate){
    return rate >  Math.random();
};
/**
 * 字符串转换AscII
 * @param num
 * @returns {string}
 */
RF.CharToAScII = function(num) {
    return String.fromCharCode(num);
};
/**
 * 保存游戏
 */
RF.SaveGame = function(){
    // todo
    // RV.SaveInfo.save(0);
    // RF.ShowTips("已自动保存");
};
/**
 * 读取游戏
 */
RF.LoadGame = function(index){
    // todo
    // IAudio.BGMFade(2);
    // if(IVal.scene != null) IVal.scene.dispose();
    // if(RV.GameData == null) RV.GameData = new GMain();
    // if(GMain.haveFile(index)){
    //     RV.GameData.load(index);
    // }else{
    //     RV.GameData.init();
    // }
    // RV.InterpreterOther = [];
    // if(RV.NowSet != null) {
    //     IVal.scene = new SMain();
    //     RV.InterpreterMain.load( RV.GameData.storySelectInfo,RV.GameData.iIndex,RV.GameData.ievent);
    //     RV.NowCanvas.load();
    // }
};


RF.AddOtherEvent = function(events,tag,id){
    var doEvent = new IMain();
    doEvent.addEvents(events);
    doEvent.tag = tag;
    doEvent.NowEventId = id;
    RV.InterpreterOther.push(doEvent);
};

RF.FindOtherEvent = function(tag){
    for(var i = 0;i<RV.InterpreterOther.length;i++){
        if(RV.InterpreterOther[i].tag == tag){
            return RV.InterpreterOther[i];
        }
    }
    return null;
};

RF.CheckLanguage = function(str){
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(str)){
        return true;
    }
    reg = new RegExp("[\\u3040-\\u309F\\u30A0-\\u30FF]+","g");
    if(reg.test(str)){
        return true;
    }
    reg = new RegExp("[\\u0E00-\\u0E7F]+","g");
    if(reg.test(str)){
        return true;
    }
    return false;
};

RF.MakerValueText = function(str){
    if(str != null){
        var s = str.replaceAll("\\\\[Vv]\\[([a-zA-Z0-9-_]+)]",RF.CharToAScII(60003)+  "[$1]");
        var end = "";
        while(true){
            if(s.length <= 0){
                break;
            }
            var min = s.substring(0,1);
            s = s.substring(1,s.length);
            var c = min.charCodeAt(0);
            if(c == 60003){
                var returnS = RF.TextToTemp(s , "[","]","\\[([a-zA-Z0-9-_]+)]");
                s = RV.GameData.getValues(parseInt(returnS[0])) + returnS[1];
            }else{
                end += min;
            }
        }
        return end;
    }
    return "";
};

RF.TextToTemp = function( mainText, s, e, rex){
    var tmp = mainText.substring(mainText.indexOf(s) + 1,mainText.indexOf(e));
    mainText = mainText.substring(tmp.length + s.length + e.length, mainText.length);
    var temp1 = tmp.replaceAll(rex, "$1");
    var temp_2 = temp1.replaceAll(" ", "");
    var temp_e = temp_2.replaceAll("，", ",");
    return [temp_e,mainText];
};

RF.getDate = function (time) {
    var now = new Date(time * 1000),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
};