/**
 * Created by 七夕小雨 on 2019/1/8.
 * 设置的数据结构
 */
function DSet(onload){
    var onloadE = onload;

    //设置数据版本号
    this.code = 0;
    //总设
    this.setAll = null;
    //CG鉴赏
    this.setCG = [];
    //BGM鉴赏
    this.setBGM = [];
    //动画
    this.setAnim = [];
    //通用触发器
    this.setEvent = [];

    var _sf = this;

    //读取数据
    var rd = new IRWFile("Setting.ifset");
    rd.onload = function(){

        _sf.code = rd.readShort();
        _sf.setAll = new DSetAll(rd);
        var length = rd.readInt();
        for(var i = 0;i<length;i++){
            var temp = new DSetCG(rd);
            _sf.setCG[temp.id] = temp;
        }
        length = rd.readInt();
        for(i = 0;i<length;i++){
            temp = new DSetBGM(rd);
            _sf.setBGM[temp.id] = temp;
        }
        length = rd.readInt();
        for(i = 0;i<length;i++){
            var type = rd.readShort();
            if(type == -3310){
                temp = new DResAnimFrame(rd);
                _sf.setAnim[temp.id] = temp;
            }else if(type == -2801){
                temp = new DResAnimParticle(rd);
                _sf.setAnim[temp.id] = temp;
            }
        }
        length = rd.readInt();
        for(i = 0;i<length;i++){
            temp = new DSetEvent(rd);
            _sf.setEvent[temp.id] = temp;
        }
        onloadE();
    };

    /**
     * 寻找属性设置
     * @param id
     * @returns {DSetAttribute}
     */
    this.findAttributeId = function(id){
        return _sf.setAttribute[id];
    };
    /**
     * 寻找公共触发器
     * @param id
     * @returns {DSetEvent}
     */
    this.findEventId = function(id){
        return _sf.setEvent[id];
    };

    /**
     * 寻找物品
     * @param id
     * @returns {DSetItem}
     */
    this.findItemId = function(id){
        return _sf.setItem[id];
    };

    /**
     * 通过ID号获得敌人的数据
     * @param id 敌人的数据
     * @returns {DSetEnemy}
     */
    this.findEnemyId = function(id){
        return _sf.setEnemy[id];
    };
    /**
     * 寻找武器
     * @param id
     * @returns {DSetArms}
     */
    this.findArmsId = function(id){
        return _sf.setArms[id];
    };
    /**
     * 寻找防具
     * @param id
     * @returns {DSetArmor}
     */
    this.findArmorId = function(id){
        return _sf.setArmor[id];
    };
    /**
     * 通过ID号获得技能的数据
     * @param id 敌人的数据
     * @returns {DSetSkill}
     */
    this.findSkillId = function(id){
        return _sf.setSkill[id];
    };
    /**
     * 寻找角色
     * @param id
     * @returns {DSetActor}
     */
    this.findActorId = function(id){
        return _sf.setActor[id];
    };
    /**
     * 寻找子弹
     * @param id
     * @returns {DSetBullet}
     */
    this.findBullet = function(id){
        return _sf.setBullet[id];
    };
    /**
     * 寻找交互块
     * @param id
     * @returns {DSetInteractionBlock}
     */
    this.findBlockId = function(id) {
        return _sf.setBlock[id];
    };
    /**
     * 寻找BUFF
     * @param id
     * @returns {DSetState}
     */
    this.findStateId = function(id){
        return _sf.setState[id];
    };
    /**
     * 寻找动画配置数据
     * @param id
     * @returns DResAnimFrame
     */
    this.findResAnim = function(id){
        return _sf.setAnim[id];
    }

}