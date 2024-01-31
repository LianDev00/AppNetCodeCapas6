window.onload = function() {
    listarSucursal();
    previewImage("fupFoto","imgFoto");
}

var objSucursal;

//function previewimage() {
//    var fupfoto = document.getelementbyid("fupfoto");
//    var imgfoto = document.getelementbyid("imgfoto");
//    fupfoto.onchange = function () {
//        //primero
//        var file = fupfoto.files[0];
//        // leer el archivo (imagen)
//        var reader = new filereader();
//        //cuando termina de leer entra al onloadend
//        reader.onloadend = function () {
//            imgfoto.src = reader.result;
//        }
//        reader.readasdataurl(file)
//    }
//}

function listarSucursal() {
    objSucursal = {
        url: "Sucursal/listarSucursal",
        cabeceras: ["ID", "Nombre", "Direccion"],
        propiedades: ["iidsucursal", "nombre", "direccion"],
        editar: true,
        eliminar: true,
        propiedadId:"iidsucursal"
    }
    pintar(objSucursal)
}

function buscarSucursal() {
    var nombreSucursal = get("txtnombrebusqueda")
    objSucursal.url = "Sucursal/filtrarSucursal/?nombreSucursal=" + nombreSucursal
    pintar(objSucursal)
}

function limpiarListaSucursal() {
    listarSucursal();
    set("txtnombrebusqueda","")
}

function GuardarDatos() {
    var errores = ValidarDatos("frmSucursal")
    if (errores != "") {
        Incorrecto(errores)
        return;
    }
    var frmGuardar = document.getElementById("frmSucursal");
    var frm = new FormData(frmGuardar);
    Confirmacion(undefined, undefined, function (rpta) {
        fetchPost("Sucursal/GuardarDatos", "text", frm, function (data) {
            if (data == "1") {
                Exito();
                listarSucursal()
                LimpiarDatos("frmSucursal")
            } else Incorrecto();
        })
    })
}

function Editar(id) {
    recuperarGenerico("Sucursal/recuperarSucursal/?iidsucursal=" + id, "frmSucursal")
}

function LimpiarSucursal() {
    LimpiarDatos("frmSucursal")
}