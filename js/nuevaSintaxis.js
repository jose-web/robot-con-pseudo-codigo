function compruebaSintaxis($codigo) {
    this.$codigo = $codigo;
    this.error = false;
    this.cuentaBucle = typeof (cuentaBucle) == "undefined" ? 0 : cuentaBucle;

    do {

        if (compruebaSintaxisBucle()) {
            // Salir del bucle
            return true;
        }

        compruebaSintaxisSentencia();

    } while (arrayTexto.length > 0 && !error);

    return !error;
}

function compruebaSintaxisBucle() {

    if (arrayTexto[0] == "while" || arrayTexto[0] == "for") {
        cuentaBucle++;
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
                mensajeError("Falta la condición en el While");
                error = true;
            }


        } else if (arrayTexto[0] == "for") {
            if (Number.isInteger(arrayTexto[1] - 1)) {
                $codigo[numBucle].push(arrayTexto[1]);
                arrayTexto.shift();

                compruebaSintaxis($codigo[numBucle]);
                return false;

            } else {
                mensajeError("falta condicion en el " + arrayTexto[0]);
                error = true;
                return false;
            }

        }

    }

    if (arrayTexto[0] == "end") {
        arrayTexto.shift();
        contadorBucle--;
        return true;
    }

}

function compruebaSintaxisSentencia() {
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
        mensajeError("Error con la sentencia " + arrayTexto[0]);
        error = true;
    }
}