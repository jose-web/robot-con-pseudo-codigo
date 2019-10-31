function compruebaSintaxis($codigo) {
    this.error = 0;
    this.cuentaEnd = typeof (cuentaEnd) == "undefined" ? 0 : cuentaEnd;

    do {
        if (compruebaSintaxisBucle($codigo)) {
            error = true;
            mensajeError("falta condicion en el " + arrayTexto[0]);
            break;
        }

        let compruebaTipoErrorIf = compruebaSintaxisIf($codigo);
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

        if (compruebaSintaxisSentencia($codigo)) {
            mensajeError("Error con la sentencia " + arrayTexto[0]);
            error = true;
            break;
        }

        if (endSolo) {
            mensajeError("Se ha encontrado un 'end' sin bucle");
            error = true;
            break;

        } else if (bucleSinCerrar) {
            mensajeError("Se " + (this.cuentaEnd > 1 ? "han" : "ha") + " encontrado " + this.cuentaEnd + (this.cuentaEnd > 1 ? " bucles" : " bucle") + " sin cerrar");
            error = true;
            break;

        }
    } while (arrayTexto.length > 0 && !error);

    this.cuentaEnd = 0;

    return !error;
}

function compruebaSintaxisBucle($codigo) {

    while (arrayTexto[0] == "while" || arrayTexto[0] == "for") {
        this.cuentaEnd++;
        $codigo.push(new Array());

        let numBucle = $codigo.length - 1;

        if (arrayTexto[0] == "while") {

            let condicion = ["nb", "mine", "block", "nw"];
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
                return true;
            }

        } else if (arrayTexto[0] == "for") {
            if (Number.isInteger(arrayTexto[1] - 1)) {
                $codigo[numBucle].push(arrayTexto[1]);
                arrayTexto.shift();
                arrayTexto.shift();

                compruebaSintaxis($codigo[numBucle]);
                break;

            } else {
                return true;
            }
        }
    }
    return false;
}

function compruebaSintaxisIf($codigo) {
    while (arrayTexto[0] == "if") {
        this.cuentaEnd++;

        $codigo.push(new Array());

        let numBucle = $codigo.length - 1;

        let condicion = ["nb", "mine", "block", "nw"];
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
    return 0;
}

function compruebaSintaxisSentencia($codigo) {
    let sentencia = ["a", "tl", "tr", "deact"];
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