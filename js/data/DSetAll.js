/**
 * Created by 七夕小雨 on 2019/1/8.
 * 设置·总设数据结构
 */
function DSetAll(rd){

    //按键映射
    this.key = new Array(30);

    rd.readShort();rd.readShort();
    rd.readShort();rd.readShort();
    rd.readShort();
    rd.readBool();

    //标题文件
    this.titleFile = rd.readString();

    new DSetSound(rd);rd.readBool();
    rd.readShort();rd.readShort();new DSetSound(rd);
    rd.readBool();rd.readShort();rd.readShort();rd.readShort();
    rd.readBool();rd.readShort();


    //音效相关
    this.enterSound = new DSetSound(rd);
    this.cancelSound = new DSetSound(rd);
    this.selectSound = new DSetSound(rd);
    new DSetSound(rd);new DSetSound(rd);

    for(var i = 0; i < 30;i++){
        this.key[i] = rd.readShort();
    }

    this.fontSize = rd.readInt();
    this.fontColor = new DColor(rd);

    this.talkUIid = rd.readInt();
    this.MsgUIid = rd.readInt();
    this.MsgIfid = rd.readInt();
    this.Menuid = rd.readInt();
}