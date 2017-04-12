class IPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 0
        this.color = "cyan"
        this.id = 1
        this.first_height = 1
        this.inf = [[0,1,2,3], [0], [0,1,2,3], [0]]
        this.c_inf = this.inf[0]

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
        this.color = "blue"
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
        this.color = "orange"
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
        this.color = "yellow"
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
        this.color = "red"
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
        this.color = "magenta"
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
        this.color = "greenyellow"
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
