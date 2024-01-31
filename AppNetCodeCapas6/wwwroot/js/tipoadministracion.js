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
        propiedades: ["iidtipoadministracion", "nombre", "descripcion"]
    }
    pintar(objTipoAdministracion)
}

//function Cargar(obj) {
//    console.log(obj)
//}