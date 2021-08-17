/**
 * Created by 七夕小雨 on 2019/4/25.
 * iFActionGameStart
 * 游戏程序脚本入口
 */
function iFActionGameStart(){
    //设置DEBUG模式
    IVal.DEBUG = false;
    //设置默认文字颜色
    IVal.FontColor = IColor.White();
    //设置默认文字大小
    IVal.FontSize = 18;
    //设置首个Scene
    IVal.scene = new SStart();
}