var PieceType = {
    STICK:   CellType.STICK,
    L1:      CellType.L1,
    L2:      CellType.L2,
    S1:      CellType.S1,
    S2:      CellType.S2,
    SQUARE:  CellType.SQUARE,
    PYRAMID: CellType.PYRAMID
};

class Piece {
    constructor(type, cells) {
        this.type = type;
        this.cells = cells;
    }
    static getRandom() {
        return PIECES[Utils.getRandom(PIECES.length)].cells.slice();
    }
}

class PieceStick extends Piece {
    constructor() {
        super(PieceType.STICK,
              [[[CellType.EMPTY,   CellType.STICK,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.STICK,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.STICK,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.STICK,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.STICK,   CellType.STICK,   CellType.STICK,   CellType.STICK  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PieceL1 extends Piece {
    constructor() {
        super(PieceType.L1,
              [[[CellType.EMPTY,   CellType.L1,      CellType.EMPTY,   CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.L1,      CellType.EMPTY,   CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.L1,      CellType.L1,      CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
                [[CellType.EMPTY,   CellType.L1,      CellType.L1,      CellType.L1     ],
                 [CellType.EMPTY,   CellType.L1,      CellType.EMPTY,   CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
                [[CellType.EMPTY,   CellType.L1,      CellType.L1,      CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.L1,      CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.L1,      CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
                [[CellType.EMPTY,   CellType.EMPTY,   CellType.L1,      CellType.EMPTY  ],
                 [CellType.L1,      CellType.L1,      CellType.L1,      CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                 [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PieceL2 extends Piece {
    constructor() {
        super(PieceType.L2,
              [[[CellType.EMPTY,   CellType.EMPTY,   CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.L2,      CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.L2,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.L2,      CellType.L2,      CellType.L2     ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.L2,      CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.L2,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.L2,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.L2,      CellType.L2,      CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.L2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PieceS1 extends Piece {
    constructor() {
        super(PieceType.S1,
              [[[CellType.EMPTY,   CellType.S1,      CellType.S1,      CellType.EMPTY  ],
                [CellType.S1,      CellType.S1,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.S1,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.S1,      CellType.S1,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.S1,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PieceS2 extends Piece {
    constructor() {
        super(PieceType.S2,
              [[[CellType.S2,      CellType.S2,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.S2,      CellType.S2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.EMPTY,   CellType.S2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.S2,      CellType.S2,      CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.S2,      CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PieceSquare extends Piece {
    constructor() {
        super(PieceType.SQUARE,
              [[[CellType.EMPTY,   CellType.SQUARE,  CellType.SQUARE,  CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.SQUARE,  CellType.SQUARE,  CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

class PiecePyramid extends Piece {
    constructor() {
        super(PieceType.PYRAMID,
              [[[CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.PYRAMID, CellType.PYRAMID, CellType.PYRAMID, CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.PYRAMID, CellType.PYRAMID, CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.PYRAMID, CellType.PYRAMID, CellType.PYRAMID, CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]],
               [[CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.PYRAMID, CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.PYRAMID, CellType.EMPTY,   CellType.EMPTY  ],
                [CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY,   CellType.EMPTY  ]]]);
    }
}

const PIECES = [new PieceStick(), new PieceL1(), new PieceL2(), new PieceS1(), new PieceS2(),
                new PieceSquare(), new PiecePyramid()];
