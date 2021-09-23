/**
 * 数据文件
 */

// 样例，测试用
let _DataObject = [
    new DataObject(),
    {id:1, picture:"ifaction_logo.png"},
];

let _DataElement = [
    new DataElement(),
    {id:1, name:"疾风", icon:"rui.png", special:false},
    {id:2, name:"徐林", icon:"rui.png", special:false},
    {id:3, name:"烈火", icon:"rui.png", special:false},
    {id:4, name:"岿山", icon:"rui.png", special:false},
    {id:5, name:"虚无", icon:"rui.png", special:true},
];

// 职业
let _DataClass = [
    new DataClass(),
    {id:1, name:"姨妈", face:"", picture:"yima.png", hp:150, at:150, element:1, skills:[1,11,12], ability:0, randAbility:[]},
    {id:2, name:"道哥", face:"", picture:"daoge.png", hp:100, at:100, element:2, skills:[1,13,14], ability:0, randAbility:[]},
    {id:3, name:"京豪", face:"", picture:"jinghao.png", hp:100, at:200, element:3, skills:[1,15,16], ability:0, randAbility:[]},
    {id:4, name:"青帝", face:"", picture:"", hp:250, at:100, element:4, skills:[1,17,18], ability:0, randAbility:[]},
    {id:5, name:"响爷", face:"", picture:"", hp:250, at:250, element:5, skills:[2,19,20], ability:0, randAbility:[]},
];

// 技能
let _DataSkill = [
    new DataSkill(),
    {id:1, name:"终结攻击1", icon:"", power:60, acc:100, wt:1, pt:1, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"1费终结技标准模板"},
    {id:2, name:"神愤", icon:"", power:0, acc:33, wt:3, pt:3, type:0, eRate:0, buff:[], debuff:[], ex:1, desc:"强制胜利"},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10},
    {id:11, name:"攻击1", icon:"", power:40, acc:95, wt:1, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"基础攻击模板"},
    {id:12, name:"攻击2", icon:"", power:50, acc:80, wt:1, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"不稳定攻击模板"},
    {id:13, name:"攻击3", icon:"", power:70, acc:60, wt:1, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"高回报攻击模板"},
    {id:14, name:"蓄力攻击1", icon:"", power:50, acc:95, wt:2, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"时延2攻击模板"},
    {id:15, name:"蓄力攻击2", icon:"", power:60, acc:95, wt:3, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"时延3攻击模板"},
    {id:16, name:"快速攻击1", icon:"", power:10, acc:90, wt:0, pt:0, type:0, eRate:0, buff:[], debuff:[], ex:0, desc:"时延0攻击模板"},
    {id:17, name:"元素攻击1", icon:"", power:30, acc:95, wt:1, pt:0, type:0, eRate:50, buff:[], debuff:[], ex:0, desc:"元素感染攻击模板"},
    {id:18, name:"治疗1", icon:"", power:20, acc:-1, wt:1, pt:0, type:1, eRate:0, buff:[], debuff:[], ex:0, desc:"基础治疗模板"},
    {id:19, name:"治疗2", icon:"", power:35, acc:-1, wt:2, pt:0, type:1, eRate:0, buff:[], debuff:[], ex:0, desc:"时延2治疗模板"},
    {id:20, name:"治疗3", icon:"", power:0, acc:-1, wt:3, pt:0, type:1, eRate:0, buff:[], debuff:[], ex:2, desc:"百分比治疗模板"},
];