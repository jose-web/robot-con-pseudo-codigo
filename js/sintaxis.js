
function compruebaSintaxis($codigo) {
    this.sentencia = ["a", "tl", "tr", "deact"];
    this.condicion = ["nb", "mine", "block", "nw"];
    this.bucleIf = ["while", "for", "if"];
    this.cuentaEnd = $codigo.length == 0 ? 0 : cuentaEnd;
    this.error = $codigo.length == 0 ? false : error;
    this.contadorExistenciaSentencia = $codigo.length == 0 ? 0 : contadorExistenciaSentencia;
    this.variables = $codigo.length == 0 ? new Array() : variables;

    let compruebaTipoErrorIf;
    let compruebaTipoVariable;

    do {
        if ((compruebaTipoErrorIf = compruebaSintaxisBucleIF($codigo)) && compruebaTipoErrorIf != 0) {
            if (compruebaTipoErrorIf == 1)
                mensajeError("falta condicion en el '" + arrayTexto[0] + "' en la línea " + (adivinaLinea()));
            else if (compruebaTipoErrorIf == 2)
                mensajeError("falta el 'then' en el '" + arrayTexto[0] + "' en la línea " + (adivinaLinea()));

            error = true;
            break;

        } else if (cuentaEnd > 0 && arrayTexto[0] == "end") {
            arrayTexto.shift();
            cuentaEnd--;
            return false;

        } else if ((compruebaTipoVariable = compruebaVariables($codigo)) && compruebaTipoVariable != 0) {
            if (compruebaTipoVariable == 1)
                mensajeError("EL valor de la variable no es un número en la línea " + (adivinaLinea()));
            else if (compruebaTipoVariable == 2)
                mensajeError("'" + arrayTexto[0].substr(0, arrayTexto[0].length - 2) + "' no puede ser una variable en la línea " + (adivinaLinea()));
            else if (compruebaTipoVariable == 2)
                mensajeError("Error con variables en la línea " + (adivinaLinea()));

            error = true;
            break;

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
            mensajeError("Error con la sentencia '" + arrayTexto[0] + "' en la línea " + adivinaLinea());
            error = true;
            break;

        }

    } while (arrayTexto.length > 0 && !error);

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

function compruebaVariables($codigo) {
    if (arrayTexto[0].indexOf("=") > 0) {
        let sentenciaDividida = arrayTexto[0].split("=");

        if (!Number.isInteger(sentenciaDividida[1] - 1)) {
            return 1;
        }

        //Comprueba que no sea una palabra clave
        let compruebaTodo = new Array(sentencia.slice(), bucleIf.slice(), condicion.slice(), "then");
        for (let i = 0; i < compruebaTodo.length; i++) {
            for (let o = 0; o < compruebaTodo[i].length; o++) {
                if (sentenciaDividida[0] == compruebaTodo[i][o]) {
                    return 2;
                }
            }
        }

        variables.push(sentenciaDividida[0]);
        $codigo.push(arrayTexto[0]);
        arrayTexto.shift();
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
    let inicioPalabra;

    textoOriginal = textoOriginal.split("\n");

    for (let i = 0; i < textoOriginal.length; i++) {
        //Elimina los dobles espacios
        while (textoOriginal[i].indexOf(" ") != -1) {
            textoOriginal[i] = textoOriginal[i].replace(" ", "")
        }
    }

    while (textoOriginal[textoOriginal.length - 1] == "") {
        textoOriginal.pop();
    }

    while (arrayTexto.length > 0 && typeof (textoOriginal[textoOriginal.length - 1]) != "undefined") {
        inicioPalabra = textoOriginal[textoOriginal.length - 1].indexOf(arrayTexto[arrayTexto.length - 1]);

        textoOriginal[textoOriginal.length - 1] = textoOriginal[textoOriginal.length - 1].slice(0, inicioPalabra);

        arrayTexto.pop();

        if (textoOriginal[textoOriginal.length - 1] == "") {
            textoOriginal.pop();
        }
    }
    return inicioPalabra != 0 ? textoOriginal.length - 1 : textoOriginal.length;
}