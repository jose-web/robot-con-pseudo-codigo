
function compruebaSintaxis($codigo) {
    this.sentencia = ["a", "tl", "tr", "deact"];
    this.condicion = ["nb", "mine", "block", "nw"];
    this.bucleIf = ["while", "for", "if"];
    this.cuentaEnd = $codigo.length == 0 ? 0 : cuentaEnd;
    this.error = $codigo.length == 0 ? false : error;
    this.contadorExistenciaSentencia = $codigo.length == 0 ? 0 : contadorExistenciaSentencia;

    let compruebaTipoErrorIf;
    let compruebaVariable;


    do {
        /*
        if ((compruebaVariable = compruebaSintaxisVariable($codigo)) && compruebaVariable != "") {
            if (compruebaVariable.indexOf("++") > 0 || compruebaVariable.indexOf("--") > 0) {
                let nombreVariable = compruebaVariable.slice(0, compruebaVariable.length - 2);
                mensajeError("'" + nombreVariable + "' no es una variable declarada");
            } else
                mensajeError("'" + compruebaVariable + "' no puede ser una variable");

            error = true;
            break;

        } else 
        */
        if ((compruebaTipoErrorIf = compruebaSintaxisBucleIF($codigo)) && compruebaTipoErrorIf != 0) {
            if (compruebaTipoErrorIf == 1) {
                mensajeError("falta condicion en el " + arrayTexto[0] + " en la línea " + (adivinaLinea() + 1));
                error = true;
                break;
            } else if (compruebaTipoErrorIf == 2) {
                mensajeError("falta el 'then' en el " + arrayTexto[0] + " en la línea " + (adivinaLinea() + 1));
                error = true;
                break;
            }

        } else if (cuentaEnd > 0 && arrayTexto[0] == "end") {
            arrayTexto.shift();
            cuentaEnd--;
            return false;

        } else if (compruebaSintaxisSentencia($codigo)) {
            contadorExistenciaSentencia++;
        }

        let bucleSinCerrar = cuentaEnd > 0 && arrayTexto.length == 0; // Detecta si no se ha cerrado un bucle
        let endSolo = cuentaEnd == 0 && arrayTexto[0] == "end"; //Detecta si existe un end sin bucle

        if (endSolo) {
            mensajeError("Se ha encontrado un 'end' sin bucle en la línea " + adivinaLinea());
            error = true;
            break;

        } else if (bucleSinCerrar) {
            mensajeError("Se " + (cuentaEnd > 1 ? "han" : "ha") + " encontrado " + cuentaEnd + (cuentaEnd > 1 ? " bucles" : " bucle") + " sin cerrar en la línea " + adivinaLinea());
            error = true;
            break;

        } else if (contadorExistenciaSentencia == 2 && arrayTexto.length > 0) {
            mensajeError("Error con la sentencia " + arrayTexto[0] + " en la línea " + adivinaLinea());
            error = true;
            break;

        }

    } while (arrayTexto.length > 0 && !error);

    contadorExistenciaSentencia = 0;
    cuentaEnd = 0;
    return !error;

}
/*
function compruebaSintaxisVariable($codigo) {
    if (typeof (arrayTexto[0]) != "undefined") {

        ////////////////// DECLARACIÓN VARIABLE (JUNTO) //////////////////
        if (arrayTexto[0].indexOf("=") > 0
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

                let contadorVariables = 0;
                for (let i = 0; i < variables.length; i++) {
                    if (variables[i].indexOf(nombreVariable) == 0) {
                        $codigo.push(arrayTexto[0]);
                        arrayTexto.shift();
                        break
                    } else {
                        contadorVariables++;
                    }
                }
                if (contadorVariables == variables.length) {
                    console.log("sdsff");
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
                    } else {
                        contadorVariables++;
                    }
                }

                if (contadorVariables == variables.length) {
                    return arrayTexto[1] + "++";
                }
            }
            return "";
        }
    }
}
*/
function compruebaSintaxisBucleIF($codigo) {
    if (arrayTexto[0] == "while" || arrayTexto[0] == "for" || arrayTexto[0] == "if") {
        cuentaEnd++;
        $codigo.push(new Array());

        let numBucle = $codigo.length - 1;

        if (arrayTexto[0] == "while") {
            for (let o = 0; o < condicion.length; o++) {
                if (condicion[o] == arrayTexto[1]) {

                    $codigo[numBucle].push(arrayTexto[1]);
                    arrayTexto.shift();
                    arrayTexto.shift();
                    compruebaSintaxis($codigo[numBucle]);
                    return 3;
                }
            }
            return 1;

        } else if (arrayTexto[0] == "for") {
            if (Number.isInteger(arrayTexto[1] - 1)) {
                $codigo[numBucle].push(arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();

                compruebaSintaxis($codigo[numBucle]);
                return 3;
            } else {
                return 1;
            }

        } else if (arrayTexto[0] == "if") {
            for (let o = 0; o < condicion.length; o++) {
                if (condicion[o] == arrayTexto[1]) {

                    if (arrayTexto[2] == "then") {
                        $codigo[numBucle].push(1);
                        $codigo[numBucle].push(arrayTexto[1]);
                        arrayTexto.shift();
                        arrayTexto.shift();
                        arrayTexto.shift();
                        compruebaSintaxis($codigo[numBucle]);
                        return 3;
                    } else {
                        return 2;
                    }
                }
            }
            return 1;
        }
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

function adivinaLinea() {

    let textoOriginal = document.getElementById("texto").value.toLowerCase();

    textoOriginal = textoOriginal.split("\n");

    for (let i = 0; i < textoOriginal.length; i++) {
        //Elimina los dobles espacios
        while (textoOriginal[i].indexOf(" ") != -1) {
            textoOriginal[i] = textoOriginal[i].replace(" ", "")
        }
    }
    while (arrayTexto.length > 0) {
        textoOriginal[textoOriginal.length - 1] = textoOriginal[textoOriginal.length - 1].slice(textoOriginal[textoOriginal.length - 1].indexOf(arrayTexto[arrayTexto.length - 1]), arrayTexto[arrayTexto.length - 1]);

        if (arrayTexto.length > 0) {
            textoOriginal.shift();
            arrayTexto.shift();
        }
    }
    return textoOriginal.length;
}