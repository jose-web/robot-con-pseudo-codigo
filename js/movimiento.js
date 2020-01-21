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

        let esMineNext = arrayCodigo[ultimoArray()][0][0] == "mine next" && robot.compruebaMinaSiguiente();
        let esMineNextIf = segundoParametro == "mine next" && robot.compruebaMinaSiguiente();

        let esBlock = arrayCodigo[ultimoArray()][0][0] == "block" && !robot.compruebaBloque();
        let esBlockIf = segundoParametro == "block" && !robot.compruebaBloque();

        let esMuro = arrayCodigo[ultimoArray()][0][0] == "nw" && !robot.compruebaMuro();
        let esMuroIf = segundoParametro == "nw" && !robot.compruebaMuro();


        if (numero >= 0) {
            if (esNbIf || esMineIf || esBlockIf || esMuroIf || esMineNextIf) { // IF 
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

        } else if (esNb || esMine || esBlock || esMuro || esMineNext) { // WHILE
            let copia = arrayCodigo[ultimoArray()][0].slice();
            arrayCodigo.push(copiaArray(copia));
            arrayCodigo[ultimoArray()].shift(); //Borra condición
            compruebaBucleIf();
        }
        return false;
    }

}

/*------------------------------------------------
-------------------- VARIABLES -------------------
------------------------------------------------*/
function compruebaVariables() {

    if (arrayCodigo[ultimoArray()][0].indexOf("=") > 0) {
        let nuevaVariable = arrayCodigo[ultimoArray()][0].split("=");
        variables[nuevaVariable[0]] = nuevaVariable[1];
        pintaVariables();

    } else if (arrayCodigo[ultimoArray()][0].indexOf("++") > 0) {
        let suma = arrayCodigo[ultimoArray()][0].substr(0, arrayCodigo[ultimoArray()][0].length - 2);
        variables[suma]++;
        pintaVariables();

    } else if (arrayCodigo[ultimoArray()][0].indexOf("--") > 0) {
        let suma = arrayCodigo[ultimoArray()][0].substr(0, arrayCodigo[ultimoArray()][0].length - 2);
        variables[suma]--;
        pintaVariables();

    } else if (arrayCodigo[ultimoArray()][0] == "print") {
        let consola = document.getElementById("consola");
        consola.innerHTML += "<p class='mb-0'>" + arrayCodigo[ultimoArray()][1] + " = " + variables[arrayCodigo[ultimoArray()][1]] + "</p>";
    }
}

function pintaVariables() {
    let listadoVariables = document.getElementById("listadoVariables");
    let listado = "";
    let variablesVisibles = new Array();
    variables.forEach((variable) => {
        if (typeof variables[variable] != "undefined" && variablesVisibles.indexOf(variable) == -1)
            listado += variable + " = " + variables[variable] + "<br/>";
        variablesVisibles.push(variable);
    });
    listadoVariables.innerHTML = listado;
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