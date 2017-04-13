// (()=> {
    class Tetris {
        constructor(width, height, side, canvas) {
            this.width = width
            this.height = height
            this.side = side
            this.canvas = canvas
            this.dibujo = this.canvas.getContext("2d")
            this.paused = false
            this.over = false
            this.pieces = [IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece]
            this.colors = {0: "white", 1: new IPiece().color, 2: new JPiece().color, 3: new LPiece().color, 4: new OPiece().color, 5: new SPiece().color, 6: new TPiece().color, 7: new ZPiece().color}
            this.tablero = []
            this.current_piece
            this.activeCs = []
        }

        init() {
            this.crearTablero(this.width, this.height, this.side)
            this.grid()
            this.teclas()
            this.mover(this.dibujo)
        }

        // Detecta las teclas
        teclas() {
            document.addEventListener("keydown", (e) => {
                // Pausa el juego
                if (e.keyCode == 32) this.paused = (this.paused == false)

                // Mueve las piezas
                if (!this.paused) {
                    if (e.keyCode == 39) this.mover_der()
                    else if (e.keyCode == 37) this.mover_izq()
                }
            })
        }

        
        mover_der() {
            console.log("Derecha")
        }

        mover_izq() {
            console.log("Izquierda")
        }

        crearTablero(width, height, side) {
            this.canvas.width = width * side
            this.canvas.height = height * side

            this.tablero = new Array(this.width * this.height)

            for (let i = 0; i < this.tablero.length; i++) {
                this.tablero[i] = {x:0,y:0,id:0,active:false}
            }

            // Coloca las 'x' y 'y' en cada casilla del tablero
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    this.tablero[i*this.width+j].x = j // X
                    this.tablero[i*this.width+j].y = i // Y
                }
            }
        }

        grid() {
            let dibujo = this.dibujo
            for (var i = 0; i <= this.canvas.height; i += this.side) {
                dibujo.beginPath()
                dibujo.moveTo(0, i)
                dibujo.lineTo(this.canvas.width, i)
                dibujo.stroke()
                dibujo.closePath()
                //console.log(i)
            }
            for (var i = 0; i <= this.canvas.width; i += this.side) {
                dibujo.beginPath()
                dibujo.moveTo(i, 0)
                dibujo.lineTo(i, this.canvas.height)
                dibujo.stroke()
                dibujo.closePath()
            }
        }

        // Mueve el juego (si no esta pausado)
        mover(dibujo) {
            setInterval(() => {
                if (!this.paused) {
                    this.select_piece()
                    this.dibujar(dibujo)
                    if (this.current_piece) this.fall()
                }
            }, 500)
        }

        // Selecciona una pieza al azar
        select_piece() {
            if (!this.current_piece) {
                this.current_piece = new this.pieces[Math.floor(Math.random() * this.pieces.length)](this.side, this.width, 0)
                find_pos(this) ? this.show_piece() : this.lose()
            }

            function find_pos(tetris) {
                var pieza = tetris.current_piece
                var height = pieza.first_height
                var m = height * tetris.width
                var n = 0

                for (let i = 0; i < pieza.pos[0].length; i++) {
                    for (let j = 0; j < m-1; j++) {
                        let cas = tetris.tablero[j]
                        if (cas.x == tetris.current_piece.pos[0][i].x && cas.id) n++
                    }
                }
                return n == 0
            }
        }

        // Coloca la pieza seleccionada en el tablero
        show_piece() {
            var pieza = this.current_piece
            var m = pieza.first_height * this.width

            for (let i = 0; i < pieza.pos[0].length; i++) {
                for (let j = 0; j < m-1; j++) {
                    if (this.tablero[j].x == pieza.pos[0][i].x && this.tablero[j].y == pieza.pos[0][i].y) {
                        this.tablero[j] = pieza.pos[0][i]
                        this.activeCs.push(this.tablero[j])
                    }
                }
            }
        }

        // Hace caer las piezas
        fall() {

            // Revisa si se puede seguir moviendo la pieza
            var n = 0
            for (let h = 0; h < this.tablero.length; h++) {
                let v = this.tablero[h]
                if ((v.active && v.y === this.height-1) || (v.active && !this.tablero[h+this.width].active && this.tablero[h+this.width].id)) n++
            }
            
            if (n) {
                // Si no se puede mover, se bloquea
                this.unable()
            } else {
                // Retengamos las piezas activas
                var piezas_activas = []
                for (let i = 0; i < this.tablero.length; i++) {
                    if (this.tablero[i].active) {
                        piezas_activas.push({x: this.tablero[i].x, y: this.tablero[i].y, id: this.tablero[i].id, active: this.tablero[i].active})
                        this.tablero[i].id = 0
                        this.tablero[i].active = false
                    }
                }

                // Movamoslas
                for (let j = 0; j < piezas_activas.length; j++) {
                    for (let k = 0; k < this.tablero.length; k++) {
                        if (this.tablero[k].x == piezas_activas[j].x && this.tablero[k].y == piezas_activas[j].y) {
                            this.tablero[k+this.width].id = piezas_activas[j].id
                            this.tablero[k+this.width].active = true
                        } 
                    }
                }
            }
        }

        // Bloquea las piezas activas para que se pueda crear una nueva
        unable() {
            for (let c of this.tablero) {
                if (c.active) {
                    c.active = false
                    this.current_piece = undefined
                }
            }
        }

        lose() {
            alert("Perdiste!");
            this.paused = true
        }

        dibujar(dibujo) {
            dibujo.clearRect(0,0,this.canvas.width, this.canvas.height)

            var colors = this.colors

            for (let i = 0; i < this.tablero.length; i++) {
                let casilla = this.tablero[i]
                dibujo.beginPath()
                dibujo.fillStyle = colors[casilla.id]
                dibujo.fillRect(casilla.x * this.side, casilla.y * this.side, this.side, this.side)
                dibujo.fill()
                dibujo.closePath()
            }

            this.grid()
        }
    }

    var canvas = document.getElementById("lienzo")
    var juego = new Tetris(10, 18, 30, canvas)
    juego.init()
// })()
