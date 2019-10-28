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


function mensajeError($error) {

    $("body").append('<div class="fixed-top alert alert-danger fade">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>¡Cuidado! </strong>' + $error + '</div>');

    setTimeout(function () {
        $(".alert").addClass("show");
    }, 1);

    setTimeout(function () {
        $(".alert").removeClass("show");
    }, 3000);

    setTimeout(function () {
        $(".alert").remove();
    }, 3500);
}