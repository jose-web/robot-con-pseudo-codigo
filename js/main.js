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

    textoMinuscula = texto.getValue().toLowerCase();

    //Elimina los saltos de línea
    while (textoMinuscula.indexOf("\n") != -1) {
        textoMinuscula = textoMinuscula.replace("\n", " ")
    }

    //Elimina las tabulaciones
    while (textoMinuscula.indexOf("\t") != -1) {
        console.log("a");
        textoMinuscula = textoMinuscula.replace("\t", " ")
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

    texto.setValue("");

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

    $("#inicioArriba").click(function () {
        redimensionaTabla();
        recogerMapasAjax();
        $("body").css({ "overflow": "initial" });
        $("#inicio").fadeOut();
        $("#creaNivel").addClass("d-none");
    });

    $("#inicioAbajo").click(function () {
        redimensionaTabla();

        $("body").css({ "overflow": "initial" });
        $(".ocultar").addClass("d-none");
        $("#contenedorElementos").removeClass("d-none");
        $("#inicio").fadeOut();

        $('.draggable').draggable({
            revert: "invalid",
            stack: ".draggable",
            helper: 'clone'
        });
        $('.droppable').droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                var droppable = $(this);
                var draggable = ui.draggable;
                // Move draggable into droppable
                var drag = $('.droppable').has(ui.draggable).length ? draggable : draggable.clone().draggable({
                    revert: "invalid",
                    stack: ".draggable",
                    helper: 'clone'
                });
                if ($(this).html() == "")
                    drag.appendTo(droppable);
            }
        });

        $("#btnCreaNivel").click(function () {
            let mapaEnLinea = "";
            let contador = 0;
            let nuevoMapa = $("#tabla").children("div").children(".droppable");
            for (let i = 0; i < nuevoMapa.length; i++) {

                if (nuevoMapa[i].innerHTML === "") {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML === "") {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/a|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/a|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("📍") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("📍") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/b|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/b|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("❓") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("❓") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/c|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/c|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("🌲") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("🌲") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/d|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/d|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("🗿") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("🗿") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/e|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/e|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("🏰") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("🏰") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/f|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/f|";
                        contador = 0;
                    }
                } else if (nuevoMapa[i].innerHTML.indexOf("🏠") != -1) {
                    if (typeof nuevoMapa[i + 1] != "undefined" && nuevoMapa[i + 1].innerHTML.indexOf("🏠") != -1) {
                        contador++;
                        if (i + 1 == nuevoMapa.length) {
                            mapaEnLinea += contador + 1 + "/g|";
                            contador = 0;
                        }
                    } else {
                        mapaEnLinea += contador + 1 + "/g|";
                        contador = 0;
                    }
                }
                
            }
            $("#urlNuevoMapa").html(location.href+"?mapa="+mapaEnLinea);
            $("#urlNuevoMapa").attr("href",location.href+"?mapa="+mapaEnLinea);

        });
    });

    $("#velocidad").change(function () {
        reloj.velocidad = $("#velocidad option:selected").val();
    });

};
CodeMirror.defineMode("addColor", function () {
    return {
        token: function (stream, state) {
            if (stream.match(/while/i) || stream.match(/for/i) || stream.match(/if/i) || stream.match(/then/i) || stream.match(/end/i) || stream.match(/print/i)) {
                return "azul";
            } else if (stream.match(/nb/i) || stream.match(/mine\snext/i) || stream.match(/mine/i) || stream.match(/block/i) || stream.match(/nw/i)) {
                return "violeta";
            } else if (stream.match(/a/i) || stream.match(/tl/i) || stream.match(/tr/i) || stream.match(/deact/i) || stream.match(/show/i)) {
                return "verde";
            } else if (stream.match(/\d/i)) {
                return "rojo";
            } else {
                stream.next();
                return null;
            }
        }
    };
});

let texto = CodeMirror.fromTextArea(document.getElementById("texto"), {
    lineNumbers: true,
    mode: "addColor",
    lineWrapping: true
});
texto.setSize("100%", "100%");

$(window).resize(function () {
    redimensionaTabla();
});

function redimensionaTabla() {
    $("#tabla").css({
        fontSize: $("#tabla").width() * 0.03,
        height: $("#tabla").width() * 0.70
    });
}