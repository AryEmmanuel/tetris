(()=> {
    class Tetris {
        constructor(width, height, side, canvas) {
            this.width = width
            this.height = height + 1
            this.side = side
            this.canvas = canvas
            this.dibujo = this.canvas.getContext("2d")
            this.paused = false
            this.over = false
            this.pieces = [IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece]
            this.colors = {0: new IPiece().color, 1: new JPiece().color, 2: new LPiece().color, 3: new OPiece().color, 4: new SPiece().color, 5: new TPiece().color, 6: new ZPiece().color}
            this.tablero = []
            this.current_piece
            this.activeCs = []
            this.cuadrado = true
            this.interval = 50
            this.duration = 0
            this.score = 0
            this.level = 1
            this.filas = 0
        }

        init() {
            this.crearTablero(this.width, this.height, this.side)
            this.teclas()
            this.mover(this.dibujo)
        }

        // Detecta las teclas
        teclas() {
            document.addEventListener("keydown", (e) => {
                // Pausa el juego
                if (e.keyCode == 32) this.paused = (this.paused == false)
                if (!this.over) title.innerText = this.paused ? "PAUSA" : "TETRIS"

                // Mueve las piezas
                if (!this.paused) {
                    if (e.keyCode == 39 || e.keyCode == 68) this.mover_der()
                    else if (e.keyCode == 37 || e.keyCode == 65) this.mover_izq()
                    else if (e.keyCode == 38 || e.keyCode == 87) this.rotate()
                }
            })
        }

        crearTablero(width, height, side) {
            this.canvas.width = width * side
            this.canvas.height = (height-1) * side

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
            var tetris = this
            
            function move(timestamp) {
                if (!tetris.paused) tetris.duration++

                if (tetris.duration == tetris.interval && !tetris.paused && !tetris.over) {
                    tetris.select_piece()
                    tetris.dibujar(dibujo)
                    if (tetris.current_piece) tetris.fall()
                    tetris.duration = 0
                }
                requestAnimationFrame(move)
            }

            requestAnimationFrame(function(timestamp) {
                move(timestamp)
            })
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

        obtPiezasActivas() {
            var piezas_activas = []
            for (let i = 0; i < this.tablero.length; i++) {
                if (this.tablero[i].active) {
                    piezas_activas.push({x: this.tablero[i].x, y: this.tablero[i].y, id: this.tablero[i].id, active: this.tablero[i].active})
                    this.tablero[i].id = 0
                    this.tablero[i].active = false
                }
            }
            return piezas_activas
        }
        
        mover_der() {
            var n = 0
            for (let c = 0; c < this.tablero.length; c++) {
                if ((this.tablero[c].active && this.tablero[c].x === this.width-1) || (this.tablero[c].active && this.tablero[c+1].id && !this.tablero[c+1].active)) n++
            }
            
            if (!n)
            {
                var piezas_activas = this.obtPiezasActivas()
                // Movamoslas
                for (let j = 0; j < piezas_activas.length; j++) {
                    for (let k = 0; k < this.tablero.length; k++) {
                        if (this.tablero[k].x == piezas_activas[j].x && this.tablero[k].y == piezas_activas[j].y) {
                            this.tablero[k+1].id = piezas_activas[j].id
                            this.tablero[k+1].active = true
                        } 
                    }
                }
            }
        }

        mover_izq() {
            var n = 0
            for (let c = 0; c < this.tablero.length; c++) {
                if ((this.tablero[c].active && this.tablero[c].x === 0) || (this.tablero[c].active && this.tablero[c-1].id && !this.tablero[c-1].active)) n++
            }

            if (!n)
            {
                var piezas_activas = this.obtPiezasActivas()
                // Movamoslas
                for (let j = 0; j < piezas_activas.length; j++) {
                    for (let k = 0; k < this.tablero.length; k++) {
                        if (this.tablero[k].x == piezas_activas[j].x && this.tablero[k].y == piezas_activas[j].y) {
                            this.tablero[k-1].id = piezas_activas[j].id
                            this.tablero[k-1].active = true
                        } 
                    }
                }
            }
        }

        // Gira las piezas
        rotate() {
            var arreglo = []
            var altura
            var arr_altura = []
            var max_y
            var min_y
            var min_x
            
            for (var i = 0; i < this.width; i++) {
                var n = 0
                var p = []
                for (var j = 0; j < this.tablero.length; j += this.width) {
                    if (j+i < this.tablero.length){
                        if (this.tablero[j+i].active) {
                            p.push({x: this.tablero[j+i].x, y: this.tablero[j+i].y, id: this.tablero[j+i].id, active: this.tablero[j+i].active})
                            n++
                        }
                    }
                }
                if (n) arreglo.push(p)
            }

            for (var c of arreglo) for (var d of c) arr_altura.push(d.y)
            max_y = eval("Math.max(" + arr_altura.toString() + ")")
            min_y = eval("Math.min(" + arr_altura.toString() + ")")
            arr_altura = []

            for (var c of arreglo) for (var d of c) arr_altura.push(d.x)
            min_x = eval("Math.min(" + arr_altura.toString() + ")")
            altura = max_y + 1 - min_y

            for (var k = 0; k < arreglo.length; k++) {
                for (var l = 0; l < arreglo[k].length; l++) {
                    if (arreglo[k].length < altura) {
                        let arriba = arreglo[k][l].y-min_y
                        let abajo = max_y - arreglo[k][l].y
                        var index = l

                        if (arriba) {
                            for (let i = 0; i < arriba; i++) {
                                if (arreglo[k][l-1]) continue
                                else {
                                    arreglo[k].unshift(0)
                                    index++
                                }
                            }
                        }

                        if (abajo) {
                            for (let i = 0; i < abajo; i++) {
                                 if (arreglo[k][index+1]) continue
                                 else arreglo[k].push(0)
                            }
                        } 
                    }
                }
            }

            var n = 0
            for (var i = 0; i < arreglo.length; i++) {
                for (var j = arreglo[i].length-1; j >= 0; j--) {
                    for (var c = 0; c < this.tablero.length; c++) {
                        if (this.tablero[c].x == min_x && this.tablero[c].y == min_y) {
                            if (this.tablero[c+(arreglo[i].length - j-1) + this.width * i].id && !this.tablero[c+(arreglo[i].length - j-1) + this.width * i].active) n++
                            if ((min_x + altura) > this.width) n++
                        }
                    }
                }
            }

            if (!n) {
                this.obtPiezasActivas()
                for (var i = 0; i < arreglo.length; i++) {
                    bucle : for (var j = arreglo[i].length-1; j >= 0; j--) {
                        var continuar = false
                        for (var c = 0; c < this.tablero.length; c++) {
                            if (this.tablero[c].x == min_x && this.tablero[c].y == min_y) {
                                if (arreglo[i][j]) {
                                    this.tablero[c+(arreglo[i].length - j-1) + this.width * i].active = true
                                    this.tablero[c+(arreglo[i].length - j-1) + this.width * i].id = arreglo[i][j].id
                                } else continue bucle
                            }
                        }
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
                var piezas_activas = this.obtPiezasActivas()
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
            this.reducir()
        }

        // Busca y elimina las filas completadas
        reducir() {
            // Encuentra las filas completas
            for (var i = 0; i<this.tablero.length; i+=this.width) {
                var n = 0
                for (var j = i; j < i+this.width; j++) {
                    if (this.tablero[j].y == i/this.width && this.tablero[j].id) n++
                }
                if (n == this.width) borrar(i/this.width, this)
            }

            // Elimina las filas completadas del tablero
            function borrar(y, tetris) {
                for (let c of tetris.tablero) {
                    if (c.y == y && c.id) c.id = 0
                }
                for (let i = tetris.width * y - 1; i >= 0; i--) {
                    tetris.tablero[i+tetris.width].id = tetris.tablero[i].id
                    tetris.tablero[i].id = 0
                }
                tetris.filas++
                tetris.score += 250
                tetris.checkScore()
            }
        }

        checkScore() {
            filas.innerText = this.filas
            puntos.innerText = this.score
            switch (this.score) {
                case 500:
                    this.interval = 45
                    this.level = 2
                    break
                case 1000:
                    this.interval = 40
                    this.level = 3
                    break
                case 1250:
                    this.interval = 35
                    this.level = 4
                    break
                case 2000:
                    this.interval = 30
                    this.level = 5
                    break
                case 3000:
                    this.interval = 25
                    this.level = 6
                
            }
            nivel.innerText = this.level
        }

        lose() {
            title.innerText = "Perdiste!"
            this.over = true
            this.paused = true
            btn_final.style.display = "initial"
        }

        dibujar(dibujo) {
            dibujo.clearRect(0,0,this.canvas.width, this.canvas.height)
            var colors = this.colors

            for (let i = this.width; i < this.tablero.length; i++) {
                let casilla = this.tablero[i]
                if (casilla.id) {
                    dibujo.beginPath()
                    dibujo.fillStyle = colors[casilla.id-1]
                    dibujo.strokeStyle = "white"
                    if (this.cuadrado) {
                        dibujo.fillRect(casilla.x * this.side, (casilla.y-1) * this.side, this.side, this.side)
                        dibujo.rect(casilla.x * this.side, (casilla.y-1) * this.side, this.side, this.side)
                    } else dibujo.arc(casilla.x * this.side + this.side/2, (casilla.y-1) * this.side + this.side/2, this.side/2, 0, Math.PI*2)
                    dibujo.fill()
                    dibujo.stroke()
                    dibujo.closePath()
                }
            }
        }
    }

    var game = document.getElementById("game")

    var canvas = document.getElementById("lienzo")
    var juego = new Tetris(10, 18, 30, canvas)

    var btn_iniciar = document.getElementById("btn_iniciar")
    btn_iniciar.addEventListener("click", function() {
        main_btn.remove()
        game.style.display = "initial"
        juego.init()
    })

    var backgrounds = [{r: 100, g: 181, b: 246}, {r: 25, g: 118, b: 210}, {r: 255, g: 109, b: 0},
                        {r: 255, g: 234, b: 0}, {r: 244, g: 67, b: 54}, {r: 233, g: 30, b: 99}, {r: 4, g: 190, b: 36}]
    var index = 0
    var previous = backgrounds[index]

    setInterval(function() {
        var next = backgrounds[index]

        if (previous.r == next.r && previous.g == next.g && previous.b == next.b) {
            index = (index == backgrounds.length-1) ? 0 : index+1
        } else {
            if (previous.r < next.r) previous.r++
            if (previous.g < next.g) previous.g++
            if (previous.b < next.b) previous.b++
            if (previous.r > next.r) previous.r--
            if (previous.g > next.g) previous.g--
            if (previous.b > next.b) previous.b--
        }

        document.body.style.backgroundColor = `rgb(${previous.r}, ${previous.g}, ${previous.b})`
    }, 1000)
})()
