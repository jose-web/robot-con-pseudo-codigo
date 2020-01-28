function nivelTablero() {
    let contadorMinas = document.getElementById('contadorMinas');
    let numeroContadorMinas = contadorMinas.getElementsByTagName('span')[0];
    let numeroMinas = 0;

    tableroOriginal = mapas[nivel - 1];

    for (let i = 0; i < tableroOriginal.length; i++) {
        tableroVirtual[i] = tableroOriginal[i].slice();
        for (let o = 0; o < tableroVirtual[i].length; o++) {
            if (tableroVirtual[i][o] == "📍")
                numeroMinas++
        }
    }

    numeroContadorMinas.innerHTML = numeroMinas;
    pintarTablero();

}

function recogerMapasAjax() {
    $.get("json/mapas.json", function (arrayMapas) {
        mapas = arrayMapas.mapas;
    });
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
            tablero += "<div class='casilla border border-dark droppable'>" + (typeof tableroVirtual[i][o] == "undefined" ? "" : tableroVirtual[i][o]) + "</div>";
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