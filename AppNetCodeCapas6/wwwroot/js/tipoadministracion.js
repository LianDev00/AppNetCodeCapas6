window.onload = function () {
    listarTipoAdministracion();
}

var objTipoAdministracion;
function listarTipoAdministracion() {
    objTipoAdministracion = {
        type: "edit",
        agregar:true,
        urlguardar:"TipoAdministracion/guardarTipoAdministracion",
        columnreadonly: ["iidtipoadministracion"],
        url: "TipoAdministracion/listarTipoAdministracion",
        cabeceras: ["Id Tipo Administracion", "Nombre", "Descripcion"],
        propiedades: ["iidtipoadministracion", "nombre", "descripcion"],
        eliminar: true,
        propiedadId:"iidtipoadministracion"
    }
    pintar(objTipoAdministracion)
}

//function Cargar(obj) {
//    console.log(obj)
//}

function Eliminar(id) {
    Confirmacion(undefined, "Desea eliminar el tipo medicamento?", function () {
        fetchGet("TipoAdministracion/EliminarTipoAdministracion/?id=" + id, "text", function (data) {
            if (data == "1") {
                Exito("Se elimino correctamente");
                listarTipoAdministracion();
            } else Incorrecto();
        });
    });
}