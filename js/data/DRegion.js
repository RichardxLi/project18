/**
 * Created by 七夕小雨 on 2020/7/15.
 */
function DRegion(parent){
    var _sf = this;

    this.parent = parent;
    this.type = 0;
    this.code = 0;
    this.args = [];

    this.events = [];
    this.regions = [];

    this.read = function(rd){
        _sf.type = rd.readShort();
        _sf.code = rd.readShort();

        var length = rd.readInt();
        for(var i = 0;i<length;i++){
            _sf.args[i] = rd.readString();
        }
        length = rd.readInt();
        for(i = 0;i<length;i++){
            var e = new DEvent();
            e.read(rd);
            _sf.events.push(e);
        }
        length = rd.readInt();
        if(length > 0){
            for(i = 0;i<length;i++){
                var g = new DRegion(_sf);
                g.read(rd);
                _sf.regions.push(g);
            }
        }

        length = rd.readInt();
        for(i = 0;i<length;i++){
            rd.readInt();rd.readBool();
        }

        length = rd.readInt();
        for(i = 0;i<length;i++){
            rd.readInt();rd.readBool();rd.readBool();
        }

    }

}