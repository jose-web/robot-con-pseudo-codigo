function compruebaSintaxis($codigo) {
    this.error = 0;
    this.cuentaEnd = typeof (cuentaEnd) == "undefined" ? 0 : cuentaEnd;
    this.condicion = ["nb", "mine", "block", "nw"];
    this.sentencia = ["a", "tl", "tr", "deact"];
    this.bucleIf = ["while", "for", "if"];
    let contadorExistenciaSentencia = 0;
    
    do {
        let compruebaVariable = compruebaSintaxisVariable($codigo);
        if (compruebaVariable != "") {
            if (compruebaVariable.indexOf("++") > 0 || compruebaVariable.indexOf("--") > 0) {
                let nombreVariable = compruebaVariable.slice(0, compruebaVariable.length - 2);
                mensajeError("'" + nombreVariable + "' no es una variable declarada");
            }
            else
                mensajeError("'" + compruebaVariable + "' no puede ser una variable");
            error = true;

            break;
        }

        let compruebaTipoErrorIf = compruebaSintaxisBucleIF($codigo);
        if (compruebaTipoErrorIf != 0) {
            if (compruebaTipoErrorIf == 1)
                mensajeError("falta condicion en el " + arrayTexto[0]);
            else
                mensajeError("falta el 'then' en el " + arrayTexto[0]);

            error = true;
            break;
        }

        ////////////////////////// SALIR BUCLE IF //////////////////////////
        if (this.cuentaEnd > 0 && arrayTexto[0] == "end") {
            arrayTexto.shift();
            this.cuentaEnd--;

            return true;
        }

        let bucleSinCerrar = this.cuentaEnd > 0 && arrayTexto.length == 0; // Detecta si no se ha cerrado un bucle
        let endSolo = arrayTexto[0] == "end"; //Detecta si existe un end sin bucle

        if (endSolo) {
            mensajeError("Se ha encontrado un 'end' sin bucle");
            error = true;
            break;

        } else if (bucleSinCerrar) {
            mensajeError("Se " + (this.cuentaEnd > 1 ? "han" : "ha") + " encontrado " + this.cuentaEnd + (this.cuentaEnd > 1 ? " bucles" : " bucle") + " sin cerrar");
            error = true;
            break;

        }

        if (compruebaSintaxisSentencia($codigo)) {
            contadorExistenciaSentencia++;
        }

        if (contadorExistenciaSentencia == 2) {
            mensajeError("Error con la sentencia " + arrayTexto[0]);
            error = true;
            break;
        }


    } while (arrayTexto.length > 0 && !error);

    this.cuentaEnd = 0;

    return !error;
}

function compruebaSintaxisBucleIF($codigo) {

    while (arrayTexto[0] == "while" || arrayTexto[0] == "for" || arrayTexto[0] == "if") {
        this.cuentaEnd++;
        $codigo.push(new Array());

        let numBucle = $codigo.length - 1;

        if (arrayTexto[0] == "while") {

            let contadorCondicion = 0;

            for (let o = 0; o < condicion.length; o++) {
                if (condicion[o] == arrayTexto[1]) {

                    $codigo[numBucle].push(arrayTexto[1]);
                    arrayTexto.shift();
                    arrayTexto.shift();

                    compruebaSintaxis($codigo[numBucle]);
                    break;
                }
                contadorCondicion++;
            }

            if (contadorCondicion == condicion.length) {
                return 1;
            }

        } else if (arrayTexto[0] == "for") {
            if (Number.isInteger(arrayTexto[1] - 1)) {
                $codigo[numBucle].push(arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();

                compruebaSintaxis($codigo[numBucle]);
                break;

            } else {
                return 1;
            }
        } else if (arrayTexto[0] == "if") {

            let contadorCondicion = 0;

            for (let o = 0; o < condicion.length; o++) {
                if (condicion[o] == arrayTexto[1]) {

                    if (arrayTexto[2] == "then") {
                        $codigo[numBucle].push(1);
                        $codigo[numBucle].push(arrayTexto[1]);
                        arrayTexto.shift();
                        arrayTexto.shift();
                        arrayTexto.shift();

                        compruebaSintaxis($codigo[numBucle]);
                        break;
                    } else {
                        return 2;
                    }
                }
                contadorCondicion++;
            }

            if (contadorCondicion == condicion.length) {
                return 1;
            }
        }
    }
    return 0;
}

function compruebaSintaxisVariable($codigo) {
    if (typeof (arrayTexto[0]) != "undefined") {
        ////////////////// DECLARACIÓN VARIABLE (JUNTO) //////////////////
        while (arrayTexto[0].indexOf("=") > 0
            || arrayTexto[0].indexOf("++") > 0 || arrayTexto[0].indexOf("--") > 0
            || arrayTexto[0] == "print") {

            if (arrayTexto[0].indexOf("=") > 0) {
                let declaracion = arrayTexto[0].split("=");

                if (declaracion.length == 2
                    && !Number.isInteger(declaracion[0] - 1)
                    && declaracion[1] != ""
                    && Number.isInteger(declaracion[1] - 1)) {


                    //Comprueba que no sea una palabra clave
                    let compruebaTodo = new Array(sentencia.slice(), bucleIf.slice(), condicion.slice());
                    for (let i = 0; i < compruebaTodo.length; i++) {
                        for (let o = 0; o < compruebaTodo[i].length; o++) {
                            if (declaracion[0] == compruebaTodo[i][o]) {
                                return declaracion[0];
                            }
                        }
                    }

                    variables.push(declaracion[0]);

                    $codigo.push(arrayTexto[0]);
                    arrayTexto.shift();

                }
            } else if (arrayTexto[0].indexOf("++") > 0 || arrayTexto[0].indexOf("--") > 0) {
                let nombreVariable = arrayTexto[0].slice(0, arrayTexto[0].length - 2);

                let compruebaTodo = new Array(sentencia.slice(), bucleIf.slice(), condicion.slice());
                for (let i = 0; i < compruebaTodo.length; i++) {
                    for (let o = 0; o < compruebaTodo[i].length; o++) {
                        if (nombreVariable == compruebaTodo[i][o]) {
                            return nombreVariable;
                        }
                    }
                }

                let contadorSentencias = 0;
                for (let i = 0; i < variables.length; i++) {
                    if (variables[i].indexOf(nombreVariable) == 0) {
                        $codigo.push(arrayTexto[0]);
                        arrayTexto.shift();
                        break;
                    }
                    contadorSentencias++;
                }

                if (contadorSentencias == variables.length) {
                    error = true;
                    return arrayTexto[0];
                }
            } else if (arrayTexto[0] == "print") {

                let contadorVariables = 0;

                for (let i = 0; i < variables.length; i++) {

                    if (arrayTexto[1] == variables[i]) {

                        $codigo.push(arrayTexto[0]);
                        $codigo.push(arrayTexto[1]);
                        arrayTexto.shift();
                        arrayTexto.shift();

                        break;
                    }
                    contadorVariables++;
                }

                if (contadorVariables == variables.length) {
                    error = true;
                    return arrayTexto[1] + "++";
                }
            }

            if (typeof (arrayTexto[0]) == "undefined") {
                break;
            }
        }
    }
    return "";
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

    if (contador == sentencia.length && arrayTexto.length > 0) {
        return true;
    }
}