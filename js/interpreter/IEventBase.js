/**
 * Created by 七夕小雨 on 2018/7/3.
 * 解释器基础结构
 */
function IEventBase(){
    //初始化
    this.init = function(){
        return false
    };
    //循环
    this.update = function(){
        return false
    };
    //结束
    this.finish = function(){
        return true
    };
    //检测是否结束
    this.isFinish = function(){
        return this.finish()
    }
}

//静态事件队列
function IM(){}