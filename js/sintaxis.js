function compruebaSintaxis($codigo) {
    let sentencia = ["a", "tl", "tr", "deact"];
    let bucle = ["while", "for", "if"];
    let condicion = ["nb", "mine", "block", "nw"];
    let contador;
    let error = false;

    do {

        contador = 0;


        //////////////////////////////////////////////////////
        ////////////////////// Variables /////////////////////
        //////////////////////////////////////////////////////

        //////////////////////// Inicialización (junto) ////////////////////////
        if (arrayTexto[0].indexOf("=") > 0) {
            let declaracion = arrayTexto[0].split("=");

            if (declaracion.length == 2
                && !Number.isInteger(declaracion[0] - 1)
                && declaracion[1] != ""
                && Number.isInteger(declaracion[1] - 1)) {


                //Comprueba que no sea una palabra clave
                let compruebaTodo = new Array(sentencia.slice(), bucle.slice(), condicion.slice());
                for (let i = 0; i < compruebaTodo.length; i++) {
                    for (let o = 0; o < compruebaTodo[i].length; o++) {
                        if (declaracion[0] == compruebaTodo[i][o]) {
                            return false;
                        }
                    }
                }

                variables.push(declaracion[0]);

                $codigo.push(arrayTexto[0]);
                arrayTexto.shift();
            }

        }

        //////////////////////// Inicialización (separado) ////////////////////////

        if (arrayTexto[1] == "=") {

            if (!Number.isInteger(arrayTexto[0] - 1)
                && arrayTexto[2] != ""
                && Number.isInteger(arrayTexto[2] - 1)) {


                //Comprueba que no sea una palabra clave
                let compruebaTodo = new Array(sentencia.slice(), bucle.slice(), condicion.slice());
                for (let i = 0; i < compruebaTodo.length; i++) {
                    for (let o = 0; o < compruebaTodo[i].length; o++) {
                        if (arrayTexto[0] == compruebaTodo[i][o]) {
                            return false;
                        }
                    }
                }

                variables.push(arrayTexto[0]);

                $codigo.push(arrayTexto[0]);
                $codigo.push(arrayTexto[1]);
                $codigo.push(arrayTexto[2]);
                arrayTexto.shift();
                arrayTexto.shift();
                arrayTexto.shift();
            }

        }


        //////////////////////// Suma y resta (junto) ////////////////////////

        if (arrayTexto[0].indexOf("++") > 0 || arrayTexto[0].indexOf("--") > 0) {
            let contadorvar = 0;

            variables.forEach(valor => {

                let nombreVariable = arrayTexto[0].slice(0, arrayTexto[0].length - 2);

                if (nombreVariable == valor) {
                    $codigo.push(arrayTexto[0]);
                    arrayTexto.shift();
                } else {
                    contadorvar++;
                }

            });

            if (contadorvar == variables.length) {
                return false;
            }
        }

        //////////////////////// Suma y resta (separado) ////////////////////////
        if (arrayTexto[1] == "++" || arrayTexto[1] == "--") {
            let contadorvar = 0;

            variables.forEach(valor => {



                if (arrayTexto[0] == valor) {
                    $codigo.push(arrayTexto[0]);
                    $codigo.push(arrayTexto[1]);
                    arrayTexto.shift();
                    arrayTexto.shift();

                } else {
                    contadorvar++;
                }

            });

            if (contadorvar == variables.length) {
                return false;
            }
        }

        //////////////////////// Impresión ////////////////////////
        if (arrayTexto[0] == "print") {

            let contadorvar = 0;

            variables.forEach(valor => {
                if (arrayTexto[1] == valor) {
                    $codigo.push(arrayTexto[0]);
                    $codigo.push(arrayTexto[1]);
                    arrayTexto.shift();
                    arrayTexto.shift();

                } else {
                    contadorvar++;
                }

            });

            if (contadorvar == variables.length) {
                return false;
            }
        }


        //////////////////////////////////////////////////////
        ///////////////////// Sentencias /////////////////////
        //////////////////////////////////////////////////////

        for (let i = 0; i < sentencia.length; i++) {

            if (sentencia[i] == arrayTexto[0]) {
                arrayTexto.shift();
                $codigo.push(sentencia[i]);
                break;
            }
            contador++;
        }


        //////////////////////////////////////////////////////
        /////////////////////// Bucles ///////////////////////
        //////////////////////////////////////////////////////

        for (let i = 0; i < bucle.length; i++) {
            if (bucle[i] == arrayTexto[0]) {
                contadorBucle++;


                $codigo.push(new Array());

                let numBucle = $codigo.length - 1;

                let contadorCondicion = 0;

                if (arrayTexto[0] == "for" && Number.isInteger(arrayTexto[1] - 1)) {

                    $codigo[numBucle].push(arrayTexto[1]);
                    arrayTexto.shift();
                } else if (arrayTexto[0] == "while") {
                    for (let o = 0; o < condicion.length; o++) {
                        if (condicion[o] == arrayTexto[1]) {

                            $codigo[numBucle].push(arrayTexto[1]);
                            arrayTexto.shift();

                            break;
                        }
                        contadorCondicion++;
                    }
                } else if (arrayTexto[0] == "if") {
                    for (let o = 0; o < condicion.length; o++) {
                        if (condicion[o] == arrayTexto[1] && arrayTexto[2] == "then") {

                            $codigo[numBucle].push();
                            $codigo[numBucle].push(arrayTexto[1]);
                            arrayTexto.shift();
                            arrayTexto.shift();

                            break;
                        }
                        contadorCondicion++;
                    }
                }



                arrayTexto.shift();



                if (contadorCondicion == condicion.length) {
                    mensajeError("falta condicion");
                    return false;
                }

                compruebaSintaxis($codigo[numBucle]);
                break;
            }
            contador++;
        }


        if (typeof (arrayTexto[0]) == "undefined") {
            break;
        }

        if (contadorBucle > 0 && arrayTexto[0] == "end") {
            arrayTexto.shift();
            contadorBucle--;
            return true;
        }


        let sentenciaMalEscrita = contador == (sentencia.length + bucle.length); // Detecta las sentencias que se han escrito mal
        let bucleSinCerrar = contadorBucle > 0 && arrayTexto.length == 0; // Detecta si no se ha cerrado un bucle
        let endSolo = arrayTexto[0] == "end"; //Detecta si existe un end sin bucle

        // mensajeError(sentenciaMalEscrita,bucleSinCerrar,endSolo);
        if (endSolo) {
            mensajeError("Se ha encontrado un 'end' sin bucle");
            error = true;

        } else if (bucleSinCerrar) {
            mensajeError("Se " + (contadorBucle > 1 ? "han" : "ha") + " encontrado " + contadorBucle + (contadorBucle > 1 ? " bucles" : " bucle") + " sin cerrar");
            error = true;

        } else if (sentenciaMalEscrita) {
            mensajeError("error de sintaxis en: " + arrayTexto[0]);
            error = true;
        }


    } while (arrayTexto.length > 0);

    if (error)
        return false;
    else
        return true;


}