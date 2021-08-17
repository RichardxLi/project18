/**
 * Created by 七夕小雨 on 2019/1/4.
 * 有关工程条件的表达和逻辑
 */
function DIf(rd){
    //组合模式 0、AND 1、OR
    this.type = 0;
    //是否有除此之外的情况
    this.haveElse = true;
    //单个条件项
    this.items = [];

    this.tag = null;


    //读取数据
    if(rd != null){
        this.type = rd.readInt();
        this.haveElse = rd.readBool();
        var length = rd.readInt();

        for(var i = 0;i<length;i++){
            this.items.push(new DIfItem(rd));
        }
    }

    this.setOutData = function(s,o){
        for(var i = 0;i<this.items.length;i++){
            this.items[i].setOutData(s,o);
        }
    };


    /**
     * DIf 的运算结果
     * @returns {boolean}
     */
    this.result = function(){
        if(this.items.length <= 0){
            return true;
        }
        if(this.type == 0){//满足全部条件
            var num = 0;
            for(var i = 0;i<this.items.length;i++){
                if(this.items[i].result(this.tag)){
                    num += 1;
                }
            }
            return num >= this.items.length;
        }else if(this.type == 1){//满足任意条件
            for(i = 0;i<this.items.length;i++){
                if(this.items[i].result(this.tag)){
                    return true;
                }
            }
        }
        return false;

    }
}

/**
 * 单个条件分栏
 */
function DIfItem(rd){
    //条件分页
    this.type = 0;
    //值1
    this.num1Index = 0;
    //方法
    this.fuc = 0;
    //类型2
    this.type2 = 0;
    //值2
    this.num2 = "";
    //值2索引
    this.num2Index = 0;

    var _sf = null;
    var obj = null;

    this.setOutData = function(s,o){
        _sf = s;
        obj = o;
    };

    //读取数据
    if(rd != null){
        this.type = rd.readInt();
        this.num1Index = rd.readInt();
        this.fuc = rd.readInt();
        this.type2 = rd.readInt();
        this.num2 = rd.readString();
        this.num2Index = rd.readInt();
    }



    /**
     * 获得DIfItem 的运算结果
     * @returns {boolean}
     */
    this.result = function(tag){
        if(this.type == 0){//变量运算
            var val = RV.GameData.value[this.num1Index];
            if(val == null) return false;
            if(this.type2 == 0){//固定值
                if(val === true || val === false){
                    return this.operation(val , this.num2 == "1" , this.fuc);
                }else if(!isNaN(val)){
                    return this.operation(val , parseInt(this.num2) , this.fuc);
                }else if(typeof(val)=='string'){
                    return this.operation(val , this.num2 , this.fuc);
                }
            }else{//变量
                var val2 = RV.GameData.value[this.num2Index];
                if(val2 == null) return false;
                return this.operation(val , val2 , this.fuc);
            }
        }else if(this.type == 1){//敌人运算
            var enemy = RV.NowMap.findEnemy(this.num1Index);
            if(enemy == null) return false;
            if(this.fuc == 0){
                return enemy.getDir() == this.num2Index;
            }else if(this.fuc == 1){
                if(this.type2 == 0){
                    return enemy.hp >= enemy.getData().maxHp * (this.num2Index / 100);
                }else if(this.type2 == 1){
                    return enemy.hp <= enemy.getData().maxHp * (this.num2Index / 100);
                }
            }else if(this.fuc == 2){
                return enemy.findBuff(this.num2Index) != null;
            }else if(this.fuc == 3){
                return enemy.isDie;
            }
        }else if(this.type == 2){//角色的一堆判定
            if(this.fuc == 0){
                return RV.GameData.actor.getActorId() == this.num1Index;
            }else if(this.fuc == 1){
                return RV.GameData.actor.name == this.num2;
            }else if(this.fuc == 2){
                return RV.GameData.actor.skill.indexOf(this.num1Index) >= 0;
            }else if(this.fuc == 3){
                return RV.GameData.actor.equips[-1] == this.num1Index;
            }else if(this.fuc == 4){
                for(var key in RV.GameData.actor.equips){
                    if(RV.GameData.actor.equips[key] == this.num1Index && key != "-1"){
                        return true;
                    }
                }
                return false;
            }else if(this.fuc == 5){
                return RV.NowMap.getActor().getDir() == this.num1Index;
            }else if(this.fuc == 6){
                if(this.num2Index == 0){
                    return RV.GameData.actor.hp >= RV.GameData.actor.getMaxHP() * (this.num1Index / 100);
                }else if(this.num2Index == 1){
                    return RV.GameData.actor.hp <= RV.GameData.actor.getMaxHP() * (this.num1Index / 100);
                }
            }else if(this.fuc == 7){
                return RV.GameData.actor.findBuff( RV.NowSet.findStateId(this.num1Index).id);
            }else if(this.fuc == 8){
                return RV.IsDie;
            }
        }else if(this.type == 3){//其他判定
            if(this.fuc == 0){
                if(this.num2Index == 0){
                    return RV.GameData.money >= this.num1Index;
                }else if(this.num2Index == 1){
                    return RV.GameData.money < this.num1Index;
                }
            }else if(this.fuc == 1){
                return RV.GameData.findItem(0,this.num1Index) != null;
            }else if(this.fuc == 2){
                return RV.GameData.findItem(1,this.num1Index) != null;
            }else if(this.fuc == 3){
                return RV.GameData.findItem(2,this.num1Index) != null;
            }else if(this.fuc == 4){
                if(this.num2Index == 0){
                    return IInput.isKeyDown(this.num1Index);
                }else{
                    return IInput.isKeyPress(this.num1Index);
                }
            }else if(this.fuc == 5){
                var rect = this.num2.split(",");
                if(this.num2Index == 0){
                    return IInput.up && IInput.x >= parseInt(rect[0]) && IInput.y >= parseInt(rect[1]) &&
                        IInput.x <= parseInt(rect[0]) + parseInt(rect[2]) &&
                        IInput.y <= parseInt(rect[1]) + parseInt(rect[3]);
                }else if(this.num2Index == 1){
                    return IInput.down && IInput.x >= parseInt(rect[0]) && IInput.y >= parseInt(rect[1]) &&
                        IInput.x <= parseInt(rect[0]) + parseInt(rect[2]) &&
                        IInput.y <= parseInt(rect[1]) + parseInt(rect[3]);
                }
            }else if(this.fuc == 6){
                if(this.num1Index == 2){
                    return IVal.Platform == "Android";
                }else if(this.num1Index == 3){
                    return IVal.Platform == "iOS";
                }else if(this.num1Index == 4){
                    return IVal.Platform == "WeiXin";
                }else if(this.num1Index == 0){
                    return IVal.Platform == "Windows";
                }else if(this.num1Index == 1){
                    return IVal.Platform == "Web";
                }
            }else if(this.fuc == 7){
                var end = null;
                try{
                    end = eval(this.num2);
                    if(typeof end == "boolean"){
                        return end;
                    }else{
                        return end != null;
                    }
                }catch(e){
                    return false;
                }
            }else if(this.fuc == 8){
                if(tag == null) return false;
                return tag.getSwitch(this.num1Index);
            }
        }
        return false;
    };

    /**
     * 数值操作法
     * @param value1 数值1
     * @param value2 数值2
     * @param func 比较方法
     * @returns {boolean} 是否符合预期
     */
    this.operation = function(value1 , value2 , func){
        if(func == 0){
            return value1 == value2;
        }else if(func == 1){
            return value1 != value2;
        }else if(func == 2){
            return value1 > value2;
        }else if(func == 3){
            return value1 < value2;
        }else if(func == 4){
            return value1 >= value2;
        }else if(func == 5){
            return value1 <= value2;
        }
        return false;
    }
}