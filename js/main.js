document.write('<scr' + 'ipt type="text/javascript" src="js/variablesGlobales.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/auxiliar.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/tablero.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/sintaxis.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/movimiento.js" ></scr' + 'ipt>');


/*-----------------------------------------------
Iniciar
-----------------------------------------------*/
function iniciar() {
    let consola = document.getElementById("consola");
    consola.innerHTML = "";
    contadorBucle = 0;
    robot.spawn();
    document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';
    clearInterval(reloj.intervalo);
    codigo = new Array();
    estela = document.getElementById('estela').checked;

    textoMinuscula = document.getElementById("texto").value.toLowerCase();

    //Elimina los saltos de línea
    while (textoMinuscula.indexOf("\n") != -1) {
        textoMinuscula = textoMinuscula.replace("\n", " ")
    }

    //Elimina los dobles espacios
    while (textoMinuscula.indexOf("  ") != -1) {
        textoMinuscula = textoMinuscula.replace("  ", " ")
    }

    textoMinuscula = textoMinuscula.trim(); //Elimina los espacios de los extremos
    arrayTexto = textoMinuscula.split(" ");

    if (arrayTexto == "") {
        let consola = document.getElementById("consola");
        consola.innerHTML += "<p style='color:red'>Debe introducir código para ejecutar el programa</p>";
        return false;
    }

    let buenaSintaxis = compruebaSintaxis(codigo);
    // console.log(buenaSintaxis, codigo);
    if (buenaSintaxis) {
        let consola = document.getElementById("consola");
        let listadoVariables = document.getElementById("listadoVariables");
        consola.innerHTML = "<p class='mb-0' style='color:blue'>• INICIO DE EJECUCIÓN •</p>";
        listadoVariables.innerHTML = "";

        //Animación fondo
        document.getElementsByTagName("body")[0].style.animationPlayState = 'running';

        arrayCodigo = new Array(codigo.slice());

        guardaBucle = "";

        reloj.intervalo = setInterval(function () {
            let repetir = false;

            do {

                if (arrayCodigo.length == 0) {
                    document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';
                    clearInterval(reloj.intervalo);
                    consola.innerHTML += "<p class='mb-0' style='color:blue'>• FIN DE EJECUCIÓN •</p><p class='mb-0' style='color:red'>No llegaste a la meta 😭 </p>";
                    return true;
                }

                while (arrayCodigo[ultimoArray()].length == 0) {
                    arrayCodigo.pop(); // Elimina el último si está vacío
                    if (typeof (arrayCodigo[ultimoArray()]) == "undefined") {
                        return false;
                    }
                }

                compruebaBucleIf();

                compruebaVariables();

                if (!compruebaSentencias()) {
                    repetir = true;
                } else {
                    repetir = false;
                }

            } while (repetir);

        }, reloj.velocidad);
    }
}

/*-----------------------------------------------
Carga la página
-----------------------------------------------*/
window.onload = function () {
    robot.spawn();

    document.getElementById("texto").value = "";

    /*
    document.getElementById("ver").onclick = function () {
        document.getElementById("pantallaDeInicio").style.top = '-100%';
        setTimeout(function () {
            document.getElementById("pantallaDeInicio").style.display = 'none';
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        }, 1000
        );
    }
*/
    document.getElementById("btniniciar").onclick = function () {
        iniciar();
    };

    document.getElementById('siguienteNivel').onclick = function () {
        nivel = nivel == mapas.length ? nivel : nivel + 1;
        document.getElementById("nombreNivel").innerHTML = "Nivel " + nivel
        clearInterval(reloj.intervalo);
        document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';
        nivelTablero();
    };

    document.getElementById('nivelAnterior').onclick = function () {
        nivel = nivel == 1 ? nivel : nivel - 1;
        document.getElementById("nombreNivel").innerHTML = "Nivel " + nivel
        clearInterval(reloj.intervalo);
        document.getElementsByTagName("body")[0].style.animationPlayState = 'paused';
        nivelTablero();
    };

    document.getElementById("texto").onkeyup = function () {
        let textoSinColor = this.value.toString();
        let nuevoTextoColor = textoSinColor;

        nuevoTextoColor = nuevoTextoColor.replace(/while|for|if|then|end|print/gi, "<textoColor style='color:blue'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/0|1|2|3|4|5|6|7|8|9/g, "<textoColor style='color:brown'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/nb|mine|next|block|nw/gi, "<textoColor style='color:violet'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/a|tl|tr|deact|show/gi, "<textoColor style='color:green'><b>$&</b></textoColor>");

        if (nuevoTextoColor.trim() == "")
            document.getElementById("textoColor").innerHTML = "<span style='color:gray;'>Escriba aquí</span>";
        else
            document.getElementById("textoColor").innerHTML = nuevoTextoColor;
    };

    $("#velocidad").change(function () {
        reloj.velocidad = $("#velocidad option:selected").val();
    });

    redimensionaTabla();
    recogerMapasAjax();
    pintarTablero();
};

$(window).resize(function () {
    redimensionaTabla();
});

function redimensionaTabla() {
    $("#tabla").css({
        fontSize: $("#tabla").width() * 0.03,
        height: $("#tabla").width() * 0.70
    });
}