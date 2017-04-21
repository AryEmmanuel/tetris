class IPiece {
    constructor(side, width) {
        this.side = side
        this.width = width
        this.initial_y = 0
        this.color = "#64B5F6"
        this.id = 1
        this.first_height = 1

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)+1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-1, y: this.initial_y -1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y -1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-2, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}
            ]
        ]
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

        this.pos =
        [
            [
                {x: Math.floor(width/2)-2, y: this.initial_y-1, id: this.id, active: true}, {x: Math.floor(width/2)-1, y: this.initial_y-1, id: this.id, active: true},
                {x: Math.floor(width/2)-1, y: this.initial_y, id: this.id, active: true}, {x: Math.floor(width/2), y: this.initial_y, id: this.id, active: true}
            ]
        ]
    }
}
