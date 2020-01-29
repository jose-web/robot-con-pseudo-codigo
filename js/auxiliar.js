function copiaArray($array) {
    let copia = new Array();
    for (let i = 0; i < $array.length; i++) {
        if (Array.isArray($array[i])) {
            copia.push(copiaArray($array[i]));
        } else {
            copia.push($array[i]);
        }

    }
    return copia;
}

function adivinaLinea() {

    let textoOriginal = texto.getValue().toLowerCase();
    let inicioPalabra;
    let cuentaSaltoLinea = 0;
    let copiaArrayTexto = arrayTexto.slice();

    textoOriginal = textoOriginal.split("\n");

    //Elimina las tabulaciones
    while (textoMinuscula.indexOf("\t") != -1) {
        textoMinuscula = textoMinuscula.replace("\t", " ")
    }

    for (let i = 0; i < textoOriginal.length; i++) {
        //Elimina los dobles espacios
        while (textoOriginal[i].indexOf(" ") != -1) {
            textoOriginal[i] = textoOriginal[i].replace(" ", "")
        }
    }

    while (textoOriginal[textoOriginal.length - 1] == "") {
        textoOriginal.pop();
    }

    while (copiaArrayTexto.length > 0 && typeof (textoOriginal[textoOriginal.length - 1]) != "undefined") {
        cuentaSaltoLinea = 0;
        inicioPalabra = textoOriginal[textoOriginal.length - 1].lastIndexOf(copiaArrayTexto[copiaArrayTexto.length - 1]);

        textoOriginal[textoOriginal.length - 1] = textoOriginal[textoOriginal.length - 1].slice(0, inicioPalabra);

        copiaArrayTexto.pop();

        while (textoOriginal[textoOriginal.length - 1] == "") {
            textoOriginal.pop();
            cuentaSaltoLinea++;
        }
    }
    return (inicioPalabra != 0 ? textoOriginal.length - 1 : cuentaSaltoLinea > 1 ? textoOriginal.length + cuentaSaltoLinea - 1 : textoOriginal.length) + 1;
}

function mostrarConsola($error) {
    let consola = document.getElementById("consola");
    consola.innerHTML += "<p style='color:red'><strong>Error en la línea " + adivinaLinea() + ":</strong> " + $error + "</p>";
}