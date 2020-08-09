var CellType = {
    STICK:   0,
    L1:      1,
    L2:      2,
    S1:      3,
    S2:      4,
    SQUARE:  5,
    PYRAMID: 6,
    WALL:    7,
    CLEAR:   8,
    EMPTY:   9
};

var CellColor = {};
CellColor[CellType.STICK]   = '#00FFFF';
CellColor[CellType.L1]      = '#FFA500';
CellColor[CellType.L2]      = '#0000FF';
CellColor[CellType.S1]      = '#44FF44';
CellColor[CellType.S2]      = '#FF0000';
CellColor[CellType.SQUARE]  = '#FFFF00';
CellColor[CellType.PYRAMID] = '#800080';
CellColor[CellType.WALL]    = '#999999';
CellColor[CellType.CLEAR]   = '#FFFFFF';
CellColor[CellType.EMPTY]   = '#000000';
