document.write('<scr' + 'ipt type="text/javascript" src="js/variablesGlobales.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/auxiliar.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/tablero.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/sintaxis.js" ></scr' + 'ipt>');
//document.write('<scr' + 'ipt type="text/javascript" src="js/nuevaSintaxis.js" ></scr' + 'ipt>');
//document.write('<scr' + 'ipt type="text/javascript" src="js/movimiento.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="js/nuevoMovimiento.js" ></scr' + 'ipt>');


/*-----------------------------------------------
Iniciar
-----------------------------------------------*/
function iniciar() {
    contadorBucle = 0;
    robot.spawn();
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

    let buenaSintaxis = compruebaSintaxis(codigo);

    console.log(buenaSintaxis, codigo);

    if (buenaSintaxis) {

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
                    console.log("//FIN//");
                    return true;
                }

                while (arrayCodigo[ultimoArray()].length == 0) {
                    arrayCodigo.pop(); // Elimina el último si está vacío
                    if (typeof (arrayCodigo[ultimoArray()]) == "undefined") {
                        return false;
                    }
                }

                compruebaBucleIf();

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

    document.getElementById("btniniciar").onclick = function () {
        iniciar();
    };

    /*
      let seleccionNivel = document.getElementsByClassName('nivel');
      for (let i = 0; i < seleccionNivel.length; i++) {
          let seleccionNivelFinal = seleccionNivel[i];
          seleccionNivelFinal.onclick = function () {
              let numNivel = this.id.substring(5, this.id.length) - 1 + 1;
              nivel = numNivel;
              nivelTablero();
          }
      }
  
    */

    document.getElementById('siguienteNivel').onclick = function () {
        nivel = nivel == 13 ? nivel : nivel + 1;
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

        nuevoTextoColor = nuevoTextoColor.replace(/while|for|if|then|end/gi, "<textoColor style='color:blue'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/0|1|2|3|4|5|6|7|8|9/g, "<textoColor style='color:brown'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/nb|mine|block|nw/gi, "<textoColor style='color:violet'><b>$&</b></textoColor>");
        nuevoTextoColor = nuevoTextoColor.replace(/a|tl|tr|deact/gi, "<textoColor style='color:green'><b>$&</b></textoColor>");

        document.getElementById("textoColor").innerHTML = nuevoTextoColor;
    };
};