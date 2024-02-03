window.onload = function () {
    listarLaboratorio();
    validarKeyPress("frmGuardarLaboratorio");
}

var objLaboratorio;
var objBusqueda;
function listarLaboratorio() {
    objBusqueda = {
        legend: "Busqueda Laboratorio",
        idformulario: "frmBusqueda",
        url: "Laboratorio/filtrarLaboratorio",
        formulario: [
            // Primera Fila
            [
                {
                    // div
                    class: "col-md-6",
                    label: "Nombre",
                    name: "nombre",
                },
                {
                    type: "textarea",
                    class: "col-md-6",
                    label: "Direccion",
                    name: "direccion",
                }
            ],
            // Segunda Fila
            [
                {
                    // div
                    class: "col-md-12",
                    label: "Contacto",
                    name: "personacontacto",
                }
            ]
        ]
    }
    objLaboratorio = {
        popup: true,
        popupId: "staticBackdrop",
        url: "Laboratorio/listarLaboratorio",
        cabeceras: ["ID", "Nombre", "Direccion","Persona Contacto"],
        propiedades: ["iidlaboratorio", "nombre", "direccion", "personacontacto"],
        divContenedorTabla: "contenedorTabla",
        editar: true,
        eliminar: true,
        nuevo: true,
        propiedadId: "iidlaboratorio"
    }
    pintar(objLaboratorio, objBusqueda);
}

//function BuscarDatos() {
//    var formu = document.getElementById("frmBusqueda");
//    var frm = new FormData(formu);
//    fetchPost("Laboratorio/filtrarLaboratorio", "json", frm, function (res) {
//        document.getElementById("contenedorTabla").innerHTML = generarTabla(res);
//    })
//}

//function LimpiarLaboratorio() {
//    LimpiarDatos("frmBusqueda");
//    //setN("nombre","")
//    //setN("direccion","")
//    //setN("personacontacto", "")
//    listarLaboratorio();
//}

function GuardarDatos() {
    //Objeto
    var errores = ValidarDatos("frmGuardarLaboratorio")
    if (errores != "") {
        Incorrecto(errores)
        return;
    }
    Confirmacion(undefined, "Desea guardar el Laboratorio", function (rpta) {
        var formu = document.getElementById("frmGuardarLaboratorio");
        var frm = new FormData(formu);
        fetchPost("Laboratorio/guardarDatos", "text", frm, function (res) {
            if (res == "1") {
                Exito()
                listarLaboratorio();
                LimpiarDatos("frmGuardarLaboratorio")
                document.getElementById("btnCerrarModal").click();
            } else Incorrecto();
        })
    })
}

function Editar(id) {
    LimpiarDatos("frmGuardarLaboratorio");
    // Nuevo
    if (id == 0) {
        setI("lbltitulo","Agregar Laboratorio")
    }
    // Editar
    else {
        setI("lbltitulo", "Editar Laboratorio")
        // Recuperar informacion de la BD
        recuperarGenerico("Laboratorio/recuperarLaboratorio/?id=" + id, "frmGuardarLaboratorio")
    }
}

function Eliminar(id) {
    Confirmacion(undefined, "Desea eliminar el Laboratorio?", function () {
        fetchGet("Laboratorio/eliminarLaboratorio/?id=" + id, "text", function (data) {
            if (data == "1") {
                Exito("Se elimino correctamente");
                listarLaboratorio();
            } else Incorrecto();
        });
    });
}