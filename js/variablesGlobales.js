/*-----------------------------------------------
Variables
-----------------------------------------------*/
var robot = {
    x: 13, //Horizontal
    y: 10, //Vertical
    direccion: 0, // 0 -> Arriba | 1 -> Izquierda | 2 -> Abajo | 3 -> Derecha

    // --------------------------------------------------------

    spawn: function () {
        this.x = 13;
        this.y = 11;
        this.direccion = 0;

        nivelTablero();
    },

    // --------------------------------------------------------

    pintar: function ($icono) {
        if (this.y + 1 != 12) {
            let tabla = document.getElementById("tabla");
            let filas = tabla.getElementsByClassName('fila-casilla');
            let casillas = filas[this.y + 1].getElementsByClassName('casilla');
            casillas[this.x].innerHTML = $icono;
        }
    },

    // --------------------------------------------------------

    avanza: function () {

        if (this.compruebaBloque() && (
            (this.y != 0 && this.direccion == 0) // Arriba
            || (this.x != 0 && this.direccion == 1) // Izquierda
            || (this.y != 10 && this.direccion == 2) // Abajo
            || (this.x != 14 && this.direccion == 3) // Derecha
        ) // Derecha
        ) {

            if (this.y + 1 != 12 && this.compruebaMina()) {
                this.pintar("📍");
            } else if (!estela) {
                this.pintar("");
            }

            let icono = "";

            switch (this.direccion) {
                case 0: // Arriba
                    this.y--;
                    icono += "↑";
                    break;

                case 1: // Izquierda
                    this.x--;
                    icono += "←";
                    break;

                case 2: // Abajo
                    this.y++;
                    icono += "↓";
                    break;

                case 3: // Derecha
                    this.x++;
                    icono += "→";
            }

            this.pintar(icono);

        } else if (this.x == 1 && this.y == 0 && this.direccion == 0) {
            clearInterval(reloj.intervalo);
            document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';

            let contadorMinasFinal = 0;
            for (let i = 0; i < tableroVirtual.length; i++) {
                for (let o = 0; o < tableroVirtual[i].length; o++) {
                    if (tableroVirtual[i][o] == "📍") {
                        contadorMinasFinal++;
                    }

                }

            }

            if (contadorMinasFinal > 0) {
                mensajeError("Faltan " + contadorMinasFinal + " minas por desactivar");
            } else {
                if(!estela)
                this.pintar("");
                confetti.start();

                setTimeout(function () {
                    confetti.stop();
                }, 4000);
            }

        } else {

            console.log("choque");
            this.pintar("💥");
            clearInterval(reloj.intervalo);
            document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';

        }
    },

    // --------------------------------------------------------


    giraIzquierda: function () {
        this.direccion++;
        iconoFlecha();
    },

    // --------------------------------------------------------


    giraDerecha: function () {
        this.direccion--;
        iconoFlecha();
    },

    // --------------------------------------------------------


    compruebaBloque: function () {
        switch (this.direccion) {
            case 0: //Arriba
                return this.y != 0 && (tableroVirtual[this.y - 1][this.x] == "" || tableroVirtual[this.y - 1][this.x] == "📍");

            case 1: //Izquierda
                return this.x != 0 && (tableroVirtual[this.y][this.x - 1] == "" || tableroVirtual[this.y][this.x - 1] == "📍");

            case 2: //Abajo
                return this.y != 10 && (tableroVirtual[this.y + 1][this.x] == "" || tableroVirtual[this.y + 1][this.x] == "📍");

            case 3: //Derecha
                return this.x != 14 && (tableroVirtual[this.y][this.x + 1] == "" || tableroVirtual[this.y][this.x + 1] == "📍");

        }

    },

    // --------------------------------------------------------


    compruebaMina: function () {
        switch (this.direccion) {
            case 0: //Arriba
                return this.y != -1 && tableroVirtual[this.y][this.x] == "📍";

            case 1: //Izquierda
                return this.x != -1 && tableroVirtual[this.y][this.x] == "📍";

            case 2: //Abajo
                return this.y != 10 && tableroVirtual[this.y][this.x] == "📍";

            case 3: //Derecha
                return this.x != 14 && tableroVirtual[this.y][this.x] == "📍";

        }
    },

    // --------------------------------------------------------


    desactivaMina: function () {
        if (this.compruebaMina()) {
            let contadorMinas = document.getElementById('contadorMinas');
            let numeroContadorMinas = contadorMinas.getElementsByTagName('span')[0];
            numeroContadorMinas.innerHTML--;

            switch (this.direccion) {
                case 0: //Arriba
                    if (this.y != -1) tableroVirtual[this.y][this.x] = "";
                    break;

                case 1: //Izquierda
                    if (this.x != -1) tableroVirtual[this.y][this.x] = "";
                    break;

                case 2: //Abajo
                    if (this.y != 10) tableroVirtual[this.y][this.x] = "";
                    break;

                case 3: //Derecha
                    if (this.x != 14) tableroVirtual[this.y][this.x] = "";
                    break;
            }
        }
    },


    // --------------------------------------------------------


    compruebaMuro: function () {
        switch (this.direccion) {
            case 0: //Arriba
                return this.y == 0;

            case 1: //Izquierda
                return this.x == 0;

            case 2: //Abajo
                return this.y == 10;

            case 3: //Derecha
                return this.x == 14;

        }
    }


};

/*-----------------------------------------------
Reloj
-----------------------------------------------*/

var reloj = {
    intervalo: "",
    velocidad: 500
};

/*-----------------------------------------------
Variables
-----------------------------------------------*/

var tableroOriginal, tableroVirtual = new Array();

var codigo = new Array();

var arrayTexto;

var arrayCodigo = new Array();

var ultimoArray = () => arrayCodigo.length - 1 == -1 ? 0 : arrayCodigo.length - 1;

var nivel = 1;

var variables = new Array();

var estela = document.getElementById('estela').checked;