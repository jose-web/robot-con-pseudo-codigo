/*------------------------------------------------
---------------------- BUCLE ---------------------
------------------------------------------------*/

function compruebaBucleIf() {
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
                compruebaBucleIf();

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
                compruebaBucleIf();
            }

        } else if (esNb || esMine || esBlock || esMuro) { // WHILE
            let copia = arrayCodigo[ultimoArray()][0].slice();
            arrayCodigo.push(copiaArray(copia));
            arrayCodigo[ultimoArray()].shift(); //Borra condición
            compruebaBucleIf();
        }
        return false;
    }

}

/*------------------------------------------------
------------------- SENTENCIAS -------------------
------------------------------------------------*/

function compruebaSentencias() {
    switch (arrayCodigo[ultimoArray()][0]) {
        case "a":
            robot.avanza();
            arrayCodigo[ultimoArray()].shift();
            return true;

        case "tl":
            robot.giraIzquierda();
            arrayCodigo[ultimoArray()].shift();
            return true;
        case "tr":
            robot.giraDerecha();
            arrayCodigo[ultimoArray()].shift();
            return true;

        case "deact":
            robot.desactivaMina();
            arrayCodigo[ultimoArray()].shift();
            return false;
    }
    arrayCodigo[ultimoArray()].shift();
    return false;
}