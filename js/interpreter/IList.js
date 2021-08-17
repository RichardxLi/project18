/**
 * Created by 七夕小雨 on 2018/2/26.
 * 触发器转译
 */
function IList(){
    //制作执行器
    this.MakeEvent = function( e, m) {
        if(e == null) return null;
        switch (e.code) {
            case 110://显示对话
                return new IM.Message(e,m);
            case 103://显示选项
                return new IM.TextChoice(e,m);
            case 104://显示提示
                return new IM.Tips(e,m);
            case 105://显示选择框
                return new IM.MessageBox(e,m);
            case 107://关闭文本
                return new IM.CloseMessage(e,m);
            case 113://高级文本分歧
                return new IM.TextChoiceEX(e,m);
            case 201: //等待
                return new IM.Wait(e,m);
            case 202: //变量
                return new IM.Value(e,m);
            case 203: //条件分歧
                return new IM.IF(e,m);
            case 204: //循环
                return new IM.Loop(e,m);
            case 2041://以上反复
                return new IM.LoopUp(e,m);
            case 205://跳出循环
                return new IM.LoopBreak(e,m);
            case 206://执行公共触发器
                return new IM.Event(e,m);
            case 220://获得CG鉴赏
                return new IM.GetCG(e,m);
            case 221://获得BGM鉴赏
                return new IM.GetBGM(e,m);
            case 222://跳转剧情
                return new IM.StoryMove(e,m);
            case 223://返回标题
                return new IM.BackTitle(e,m);
            case 301://画面闪烁
                return new IM.Flash(e,m);
            case 302 ://画面震动
                return new IM.Shack(e,m);
            case 303: //画面遮罩进入
                return new IM.MaskIn(e,m);
            case 304://画面遮罩淡出
                return new IM.MakeOut(e,m);
            case 305://天气
                return new IM.Weather(e,m);
            case 306://图片显示
                return new IM.PicShow(e,m);
            case 307://图片移动
                return new IM.PicMove(e,m);
            case 308://图片删除
                return new IM.PicDel(e,m);
            case 309://移动摄像机
                return new IM.ViewMove(e,m);
            case 310://摄像机复位
                return new IM.ViewReset(e,m);
            case 312://停止动画
                return new IM.StopAnim(e,m);
            case 313://对话框震动
                return new IM.ShackMessageBox(e,m);
            case 314://显示动画
                return new IM.ShowAnim(e,m);
            case 501: //播放背景音乐
                return new IM.BGMPlay(e,m);
            case 502: //播放背景音效
                return new IM.BGSPlay(e,m);
            case 503: //播放音效
                return new IM.SEPlay(e,m);
            case 504: //淡出背景音乐
                return new IM.BGMFade(e,m);
            case 505: //淡出背景音效
                return new IM.BGSFade(e,m);
            case 506: //停止音效
                return new IM.SEStop(e,m);
            case 507: //播放语音
                return new IM.VoicePlay(e,m);
            case 508: //停止语音
                return new IM.VoiceStop(e,m);
            case 604://保存游戏
                return new IM.SaveGame(e,m);
            case 605://读取游戏
                return new IM.LoadGame(e,m);
            case 606://执行脚本
                return new IM.Script(e,m);
            case 609://呼叫自定义UI
                return new IM.callSelfUI(e,m);
            case 701://移动UI
                return new IM.UIMove(e,m);
            case 702://消除UI
                return new IM.UIDisposeCtrl(e,m);
            case 703://消除全部
                return new IM.UIDisposeAll(e,m);
            case 704://更改选项
                return new IM.UICheckIndex(e,m);
            case 705://更改图片
                return new IM.UIPic(e,m);
            case 706://更改自动图片尺寸
                return new IM.UIAutoPicSize(e,m);
            case 707://更改文字
                return new IM.UITextChange(e,m);
            case 708://更改筛选条件
                return new IM.UIChangeIF(e,m);
            case 709:
                return new IM.UICloseUI(e,m);
            case 710:
                return new IM.UIAngel(e,m);
            case -32286: //mod扩展事件
                if(IVal.Mods != null){
                    //取出第一个参数作为Key值
                    var key = e.args[0].split('Φ');
                    var mod = IVal.Mods.findMod(key[0]);
                    if(mod.trigger.hasOwnProperty(key[1])){
                        return eval("new " + mod.trigger[key[1]] + "(e,m)");
                    }

                }else{
                    return null;
                }
            default:
                return null;
        }
    }
}