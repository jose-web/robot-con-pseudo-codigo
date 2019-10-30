function compruebaSintaxis($codigo) {
    this.error = 0;
    this.cuentaBucle = typeof (cuentaBucle) == "undefined" ? 0 : cuentaBucle;

    do {
        if (compruebaSintaxisBucle($codigo)) {
            error = true;
            mensajeError("falta condicion en el " + arrayTexto[0]);
            break;
        }

        ////////////////////////// SALIR BUCLE //////////////////////////
        if (this.cuentaBucle > 0 && arrayTexto[0] == "end") {
            console.log("salir");
            arrayTexto.shift();
            this.cuentaBucle--;

            return true;
        }

        let bucleSinCerrar = this.cuentaBucle > 0 && arrayTexto.length == 0; // Detecta si no se ha cerrado un bucle
        let endSolo = arrayTexto[0] == "end"; //Detecta si existe un end sin bucle


        if (compruebaSintaxisSentencia($codigo)) {
            mensajeError("Error con la sentencia " + arrayTexto[0]);
            error = 1;
            break;
        }

        if (endSolo) {
            mensajeError("Se ha encontrado un 'end' sin bucle");
            error = true;
            break;

        } else if (bucleSinCerrar) {
            mensajeError("Se " + (this.cuentaBucle > 1 ? "han" : "ha") + " encontrado " + this.cuentaBucle + (this.cuentaBucle > 1 ? " bucles" : " bucle") + " sin cerrar");
            error = true;
            break;

        }

    } while (arrayTexto.length > 0 && !error);

    this.cuentaBucle = 0;

    return !error;
}

function compruebaSintaxisBucle($codigo) {

    if (arrayTexto[0] == "while" || arrayTexto[0] == "for") {
        this.cuentaBucle++;
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
                    return false;
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
                return false;

            } else {
                return true;
            }
        }
    }
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