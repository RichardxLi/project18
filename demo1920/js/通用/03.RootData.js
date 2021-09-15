/**
 * 全局数据库
 */
function RD(){};

// DataObject
RD._objects = [];
RD.LoadObjects = function() {
    RD._objects = _DataObject;
};
RD.Object = function(id) {
   if(RD._objects[id] == null) {
        return RD._objects[0];
    }
    return RD._objects[id];
};

// DataSet
RD.Set = null;
RD.LoadSet = function(onload) {
    RD.Set = new DataSet();
    RD.Set.load(onload);
}

// DataProject
RD.Project = null;
RD.LoadProject = function(onload) {
    RD.Project = new DataProject();
    RD.Project.load(onload);
}

// DataElement
RD._element = null;
RD.LoadElement = function() {
    // 缺省
    RD._element = _DataElement;
};
RD.Element = function(id) {
    if(RD._element[id] == null) {
        return RD._element[0];
    }
    return RD._element[id];
};

// DataClass
RD._class = null;
RD.LoadClass = function() {
    // 缺省
    RD._class = _DataClass;
};
RD.Class = function(id) {
    if(RD._class[id] == null) {
        return RD._class[0];
    }
    return RD._class[id];
};