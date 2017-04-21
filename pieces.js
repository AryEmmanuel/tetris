class IPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 0
        this.color = "#64B5F6"
        this.id = 1
        this.first_height = 1
        this.n_rotations = 2
        this.c_rotation = 0

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)+1, y: this.initial_y, id: this.id, active: true}
            ],
            [
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class JPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#1976D2"
        this.id = 2
        this.first_height = 2
        this.inf = [[0,1,3], [2,3], 3, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ],
            [
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class LPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#FF6D00"
        this.id = 3
        this.first_height = 2
        this.inf = [[1,2,3], 2, 3, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class OPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#FFEA00"
        this.id = 4
        this.first_height = 2
        this.inf = [[2,3], 2, 2, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-1, y: this.initial_y -1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y -1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class SPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#F44336"
        this.id = 5
        this.first_height = 2
        this.inf = [[1,2,3], 2, 2, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class TPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#E91E63"
        this.id = 6
        this.pos = 1
        this.first_height = 2
        this.inf = [[0,2,3], 2, 3, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}

class ZPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 1
        this.color = "#04BE24"
        this.id = 7
        this.first_height = 2
        this.inf = [[0,2,3], 2, 2, 2] // TODO Completar
        this.c_inf = this.inf[0]

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ]
        ]
        this.current_rotation = this.pos[0]
    }
}
