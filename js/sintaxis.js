
function compruebaSintaxis($codigo) {
    this.sentencia = ["a", "tl", "tr", "deact", "show"];
    this.condicion = ["nb", "mine", "block", "nw"];
    this.bucleIf = ["while", "for", "if"];
    this.cuentaEnd = $codigo.length == 0 ? 0 : cuentaEnd;
    this.error = $codigo.length == 0 ? false : error;
    this.contadorExistenciaSentencia = $codigo.length == 0 ? 0 : contadorExistenciaSentencia;
    this.variables = $codigo.length == 0 ? new Array() : variables;
    this.salirBucleIf == 0 ? 0 : this.salirBucleIf;

    let compruebaTipoErrorIf;
    let compruebaTipoVariable;

    do {
        if ((compruebaTipoErrorIf = compruebaSintaxisBucleIF($codigo)) && compruebaTipoErrorIf != 0) {
            if (compruebaTipoErrorIf == 1) {
                mostrarConsola("falta condicion en el '" + arrayTexto[0] + "'");
                error = true;
                arrayTexto.shift();

                if (arrayTexto[0] == "then")
                    arrayTexto.shift();
                else if (arrayTexto[1] == "then")
                    arrayTexto.splice(1, 1);

            } else if (compruebaTipoErrorIf == 2) {
                mostrarConsola("falta el 'then' en el '" + arrayTexto[0] + "'");
                error = true;
                arrayTexto.shift();
                arrayTexto.shift();

            }

        } else if (cuentaEnd > 0 && arrayTexto[0] == "end") {
            arrayTexto.shift();
            cuentaEnd--;
            
            if (this.salirBucleIf > 0)
                this.salirBucleIf--;
                return false;

        } else if ((compruebaTipoVariable = compruebaSintaxisVariables($codigo)) && compruebaTipoVariable != -1) {
            if (compruebaTipoVariable == 2) { // Declaración separado
                mostrarConsola("En la declaración de la variable '" + arrayTexto[0] + "' falta el número");
                error = true;
                arrayTexto.shift();
                arrayTexto.shift();
                arrayTexto.shift();

            } else if (compruebaTipoVariable == 3) { // Declaración junto
                let variable = arrayTexto[0].split("=");
                mostrarConsola("'" + variable[0] + "' no puede ser una variable");
                error = true;
                arrayTexto.shift();

            } else if (compruebaTipoVariable == 4) { // Suma/resta separado
                mostrarConsola("'" + arrayTexto[0] + "' no es una variable declarada");
                error = true;
                arrayTexto.shift();
                arrayTexto.shift();

            } else if (compruebaTipoVariable == 5) { // Suma/resta junto
                let variable = arrayTexto[0].substr(0, arrayTexto[0].length - 2);
                mostrarConsola("'" + variable + "' no es una variable declarada");
                error = true;
                arrayTexto.shift();

            } else if (compruebaTipoVariable == 6) { // Print
                mostrarConsola("'" + arrayTexto[1] + "' no es una variable declarada");
                error = true;
                arrayTexto.shift();
                arrayTexto.shift();

            }

        } else if (compruebaSintaxisSentencia($codigo)) {
            contadorExistenciaSentencia++;
        }

        let bucleSinCerrar = cuentaEnd > 0 && arrayTexto.length == 0; // Detecta si no se ha cerrado un bucle
        let endSolo = cuentaEnd == 0 && arrayTexto[0] == "end"; //Detecta si existe un end sin bucle

        if (endSolo) {
            mostrarConsola("Se ha encontrado un 'end' sin bucle");
            error = true;
            arrayTexto.shift();


        } else if (bucleSinCerrar) {
            mostrarConsola("Se " + (cuentaEnd > 1 ? "han" : "ha") + " encontrado " + cuentaEnd + (cuentaEnd > 1 ? " bucles" : " bucle") + " sin cerrar ");
            error = true;
            cuentaEnd = 0;


        } else if (contadorExistenciaSentencia == 2 && arrayTexto.length > 0) {
            mostrarConsola("La sentencia '" + arrayTexto[0] + "' no existe ");
            error = true;
            arrayTexto.shift();
            contadorExistenciaSentencia = 0;

        }

    } while (arrayTexto.length > 0 || cuentaEnd > 0);

    contadorExistenciaSentencia = 0;
    cuentaEnd = 0;
    return !error;

}

function compruebaSintaxisBucleIF($codigo) {
    if (arrayTexto[0] == "while" || arrayTexto[0] == "for" || arrayTexto[0] == "if") {
        cuentaEnd++;
        $codigo.push(new Array());

        let numBucle = $codigo.length - 1;

        if (arrayTexto[0] == "while") {
            if (arrayTexto[1] == "mine" && arrayTexto[2] == "next") {
                $codigo[numBucle].push(arrayTexto[1] + " " + arrayTexto[2]);
                arrayTexto.shift();
                arrayTexto.shift();
                arrayTexto.shift();
                this.salirBucleIf++;
                compruebaSintaxis($codigo[numBucle]);
                return 3;
            } else {
                for (let o = 0; o < condicion.length; o++) {
                    if (condicion[o] == arrayTexto[1]) {
                        $codigo[numBucle].push(arrayTexto[1]);
                        arrayTexto.shift();
                        arrayTexto.shift();
                        this.salirBucleIf++;
                        compruebaSintaxis($codigo[numBucle]);
                        return 3;
                    }
                }
            }
            return 1;

        } else if (arrayTexto[0] == "for") {
            if (Number.isInteger(arrayTexto[1] - 1)) {
                $codigo[numBucle].push(arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();
                this.salirBucleIf++;
                compruebaSintaxis($codigo[numBucle]);
                return 3;
            } else {
                return 1;
            }

        } else if (arrayTexto[0] == "if") {
            if (arrayTexto[1] == "mine" && arrayTexto[2] == "next") {
                if (arrayTexto[3] == "then") {
                    $codigo[numBucle].push(1);
                    $codigo[numBucle].push(arrayTexto[1] + " " + arrayTexto[2]);
                    arrayTexto.shift();
                    arrayTexto.shift();
                    arrayTexto.shift();
                    arrayTexto.shift();
                    this.salirBucleIf++;
                    compruebaSintaxis($codigo[numBucle]);
                    return 3;
                } else {
                    return 2;
                }
            } else {
                for (let o = 0; o < condicion.length; o++) {
                    if (condicion[o] == arrayTexto[1]) {
                        if (arrayTexto[2] == "then") {
                            $codigo[numBucle].push(1);
                            $codigo[numBucle].push(arrayTexto[1]);
                            arrayTexto.shift();
                            arrayTexto.shift();
                            arrayTexto.shift();
                            this.salirBucleIf++;
                            compruebaSintaxis($codigo[numBucle]);
                            return 3;
                        } else {
                            return 2;
                        }
                    }
                }
            }
            return 1;
        }
    }
    return 0;
}

function compruebaSintaxisVariables($codigo) {
    if (typeof arrayTexto[0] != "undefined" && arrayTexto[0].indexOf("=") > 0) {

        let sentenciaDividida = arrayTexto[0].split("=");

        if (sentenciaDividida[1] == "" || !Number.isInteger(sentenciaDividida[1] - 1)) {
            return 3;
        }

        //Comprueba que no sea una palabra clave
        let compruebaTodo = new Array(sentencia.slice(), bucleIf.slice(), condicion.slice(), ["then", "next"]);
        for (let i = 0; i < compruebaTodo.length; i++) {
            for (let o = 0; o < compruebaTodo[i].length; o++) {
                if (sentenciaDividida[0] == compruebaTodo[i][o]) {
                    return 3;
                }
            }
        }

        variables.push(sentenciaDividida[0]);
        $codigo.push(arrayTexto[0]);
        arrayTexto.shift();
        return 1;

    } else if (arrayTexto[1] == "=") {

        if (!Number.isInteger(arrayTexto[2] - 1)) {
            return 2;
        }

        //Comprueba que no sea una palabra clave
        let compruebaTodo = new Array(sentencia.slice(), bucleIf.slice(), condicion.slice(), ["then", "next"]);
        for (let i = 0; i < compruebaTodo.length; i++) {
            for (let o = 0; o < compruebaTodo[i].length; o++) {
                if (arrayTexto[0] == compruebaTodo[i][o]) {
                    return 3;
                }
            }
        }

        variables.push(arrayTexto[0]);
        $codigo.push(arrayTexto[0] + arrayTexto[1] + arrayTexto[2]);
        arrayTexto.shift();
        arrayTexto.shift();
        arrayTexto.shift();
        return 1;

    } else if (typeof arrayTexto[0] != "undefined" && (arrayTexto[0].indexOf("++") > 0 || arrayTexto[0].indexOf("--") > 0)) {
        let variableRecortada = arrayTexto[0].substr(0, arrayTexto[0].length - 2);
        for (let i = 0; i < variables.length; i++) {
            if (variables[i] == variableRecortada) {
                $codigo.push(arrayTexto[0]);
                arrayTexto.shift();
                return 1;
            }
        }
        return 5;

    } else if (arrayTexto[1] == "++" || arrayTexto[1] == "--") {

        for (let i = 0; i < variables.length; i++) {
            if (variables[i] == arrayTexto[0]) {
                $codigo.push(arrayTexto[0] + arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();
                return 1;
            }
        }
        return 4;

    } else if (arrayTexto[0] == "print") {
        for (let i = 0; i < variables.length; i++) {
            if (variables[i] == arrayTexto[1]) {
                $codigo.push(arrayTexto[0]);
                $codigo.push(arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();
                return 1;
            }
        }
        return 6;
    }
    return 0;
}


function compruebaSintaxisSentencia($codigo) {
    let contador = 0;

    for (let i = 0; i < sentencia.length; i++) {

        if (sentencia[i] == arrayTexto[0]) {
            arrayTexto.shift();
            $codigo.push(sentencia[i]);
            return false;
        }
        contador++;
    }

    if (contador == sentencia.length) {
        return true;
    }
}