function nivelTablero() {
    let contadorMinas = document.getElementById('contadorMinas');
    let numeroContadorMinas = contadorMinas.getElementsByTagName('span')[0];

    switch (nivel) {
        case 1:
            tableroOriginal = [
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ];
            numeroContadorMinas.innerHTML = 0;
            break;

        case 2:
            tableroOriginal = [
                ["", "", "", "🗿", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ];
            numeroContadorMinas.innerHTML = 0;
            break;

        case 3:
            tableroOriginal = [
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "🌲", "🌲", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ];
            numeroContadorMinas.innerHTML = 0;
            break;

        case 4:
            tableroOriginal = [
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "🌲", "", "", "", "", "", "", "", "", "", "", ""],
            ];
            numeroContadorMinas.innerHTML = 0;
            break;

        case 5:
            tableroOriginal = [
                ["", "", "", "", "", "🏠", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "🏰", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "🏠", "", "", "🏠", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "🏠", "", "", "🏠", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "🏠", "", "", "🏠", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "🏰", "", "", "🏠", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "🏠", "", "", "🏰", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "🏠", "", "", "🏠", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "🏠", "", "", "🏠", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "🏠", "", "", "🏠"],
                ["", "", "", "", "", "", "", "", "", "", "", "", "🏠", "", ""],
            ];
            numeroContadorMinas.innerHTML = 0;
            break;

        case 6:
            tableroOriginal = [
                ["", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 23;
            break;

        case 7:
            tableroOriginal = [
                ["📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 24;
            break;

        case 8:
            tableroOriginal = [
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 12;
            break;

        case 9:
            tableroOriginal = [
                ["", "", "", "📍", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "📍", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "📍", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "📍", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "📍", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "📍", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "📍", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "📍", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "📍", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "📍", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 11;

            break;
        case 10:
            tableroOriginal = [
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 22;

            break;
        case 11:
            tableroOriginal = [
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "📍", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "📍", "📍", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 23;

            break;

        case 12:
            tableroOriginal = [
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 77;

            break;

        case 13:
            tableroOriginal = [
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", "", "📍", ""],
            ];
            numeroContadorMinas.innerHTML = 42;

            break;



    }

    for (let i = 0; i < tableroOriginal.length; i++) {
        tableroVirtual[i] = tableroOriginal[i].slice();
    }
    pintarTablero();

}

/*-----------------------------------------------
Pintar Tablero
-----------------------------------------------*/
function pintarTablero() {
    let tabla = document.getElementById("tabla");
    let tablero = "";

    tablero += "<div class='fila-casilla'>";
    tablero += "<div class='casilla'></div>";
    tablero += "<div class='casilla'>🚩</div>";
    tablero += "</div>";

    for (let i = 0; i < 11; i++) {
        tablero += "<div class='fila-casilla'>";

        for (let o = 0; o < 15; o++) {
            tablero += "<div class='casilla border border-dark'>" + tableroVirtual[i][o] + "</div>";
        }
        tablero += "</div>";
    }

    tablero += "<div class='fila-casilla'>";
    tablero += "<div id='casillaEspecial'>" + "" + "</div>";
    tablero += "<div class='casilla'>👆</div>";
    tablero += "</div>";


    tabla.innerHTML = tablero;
}


/*-----------------------------------------------
Icono flecha
-----------------------------------------------*/
function iconoFlecha() {
    if (robot.direccion == 4) {
        robot.direccion = 0;
    } else if (robot.direccion == -1) {
        robot.direccion = 3;
    }

    let icono = "";

    switch (robot.direccion) {
        case 0: // Arriba

            icono += "↑";
            break;

        case 1: // Izquierda

            icono += "←";
            break;

        case 2: // Abajo

            icono += "↓";
            break;

        case 3: // Derecha

            icono += "→";
    }

    robot.pintar(icono);
}