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
            this.togglePlayPause()
            this.mover(this.dibujo)
        }

        togglePlayPause() {
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 32) this.paused = (this.paused == false)
            })
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

        mover(dibujo) {
            setInterval(() => {
                if (!this.paused) {
                    this.select_piece()
                    this.dibujar(dibujo)
                    if (this.current_piece) this.fall()
                }
            }, 500)
        }

        select_piece() {
            if (!this.current_piece) {
                this.current_piece = new this.pieces[Math.floor(Math.random() * this.pieces.length)](this.side, this.width, 0)
                this.find_pos() ? this.show_piece() : this.lose()
            }
        }

        find_pos() {
            var pieza = this.current_piece
            var height = pieza.first_height
            var m = height * this.width
            var n = 0

            for (let i = 0; i < pieza.pos[0].length; i++) {
                for (let j = 0; j < m-1; j++) {
                    let cas = this.tablero[j]
                    if (cas.x == this.current_piece.pos[0][i].x && cas.id) n++
                }
            }
            return n == 0
        }

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

        fall() {
            
        }

        unable() {
            console.log("--..---.-.-..-");
        }

        lose() {
            console.log("Perdiste!");
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
