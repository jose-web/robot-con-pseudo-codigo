/*------------------------------------------------
---------------------- BUCLE ---------------------
------------------------------------------------*/

function compruebaBucle() {
    if (Array.isArray(arrayCodigo[ultimoArray()][0])) {
        let numero = arrayCodigo[ultimoArray()][0][0] - 1;

        let segundoParametro = arrayCodigo[ultimoArray()][0][1];

        let esNb = arrayCodigo[ultimoArray()][0][0] == "nb" && robot.compruebaBloque();
        let esNbIf = segundoParametro == "nb" && robot.compruebaBloque();

        let esMine = arrayCodigo[ultimoArray()][0][0] == "mine" && robot.compruebaMina();
        let esMineIf = segundoParametro == "mine" && robot.compruebaMina();

        let esBlock = arrayCodigo[ultimoArray()][0][0] == "block" && !robot.compruebaBloque();
        let esBlockIf = segundoParametro == "block" && !robot.compruebaBloque();

        let esMuro = arrayCodigo[ultimoArray()][0][0] == "nw" && !robot.compruebaMuro();
        let esMuroIf = segundoParametro == "nw" && !robot.compruebaMuro();


        if (numero >= 0) {
            if (esNbIf || esMineIf || esBlockIf || esMuroIf) { // IF 
                arrayCodigo[ultimoArray()][0].shift(); //Borra número
                arrayCodigo[ultimoArray()][0].shift(); //Borra condición

                let copia = arrayCodigo[ultimoArray()][0].slice();

                arrayCodigo[ultimoArray()].shift();

                arrayCodigo.push(copiaArray(copia));
                compruebaBucle();

            } else if (segundoParametro != "nb"
                && segundoParametro != "mine"
                && segundoParametro != "block"
                && segundoParametro != "nw") { // FOR

                arrayCodigo[ultimoArray()][0].shift();
                let copia = arrayCodigo[ultimoArray()][0].slice();
                arrayCodigo[ultimoArray()].shift();

                while (numero >= 0) {
                    arrayCodigo.push(copiaArray(copia));
                    numero--;
                }
                compruebaBucle();

            }

        } else if (esNb || esMine || esBlock || esMuro) { // WHILE
            let copia = arrayCodigo[ultimoArray()][0].slice();
            arrayCodigo.push(copiaArray(copia));
            arrayCodigo[ultimoArray()].shift(); //Borra condición
            compruebaBucle();
        }

    }

}


/*------------------------------------------------
-------------------- VARIABLES -------------------
------------------------------------------------*/

function compruebaVariables() {

    if (typeof (arrayCodigo[ultimoArray()][0]) != "undefined") {

        if (arrayCodigo[ultimoArray()][0].indexOf("=") > 0) {
            let declaracion = arrayCodigo[ultimoArray()][0].split("=");
            variables[declaracion[0]] = declaracion[1];

        } else if (arrayCodigo[ultimoArray()][0].indexOf("++") > 0) {
            let nombreVariable = arrayCodigo[ultimoArray()][0].slice(0, arrayCodigo[ultimoArray()][0].length - 2);
            variables[nombreVariable]++;

        } else if (arrayCodigo[ultimoArray()][0].indexOf("--") > 0) {
            let nombreVariable = arrayCodigo[ultimoArray()][0].slice(0, arrayCodigo[ultimoArray()][0].length - 2);
            variables[nombreVariable]--;

        } else if (arrayCodigo[ultimoArray()][0] == "print") {
            alert(arrayCodigo[ultimoArray()][1] + ": " + variables[arrayCodigo[ultimoArray()][1]]);
            arrayCodigo[ultimoArray()].shift();

        } else if (arrayCodigo[ultimoArray()][1] == "=") {
            variables[arrayCodigo[ultimoArray()][0]] = arrayCodigo[ultimoArray()][2];
            arrayCodigo[ultimoArray()].shift();
            arrayCodigo[ultimoArray()].shift();

        } else if (arrayCodigo[ultimoArray()][1] == "++") {
            variables[arrayCodigo[ultimoArray()][0]]++;

        } else if (arrayCodigo[ultimoArray()][1] == "--") {
            variables[arrayCodigo[ultimoArray()][0]]--;
        }

    }
}


/*------------------------------------------------
------------------- SENTENCIAS -------------------
------------------------------------------------*/

function compruebaSentencias() {

    switch (arrayCodigo[ultimoArray()][0]) {
        case "a":
            robot.avanza();
            break;

        case "tl":
            robot.giraIzquierda();
            break;

        case "tr":
            robot.giraDerecha();
            break;

        case "deact":
            robot.desactivaMina();
            break;

    }

    arrayCodigo[ultimoArray()].shift();
}