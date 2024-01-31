window.onload = function () {
    listarTipoMedicamento();
    validarKeyPress("frmGuardarTipoMedicamento");
}

function filtrarTipoMedicamento() {
    var nombre = get("txtnombrebusqueda")
    if (nombre == "") {
        listarTipoMedicamento();
    } else {
        objGlobalTipoMedicamento.url = "TipoMedicamento/filtrarTipoMedicamento/?nombretipo=" + nombre;
        pintar(objGlobalTipoMedicamento)
    }
}


var objGlobalTipoMedicamento;
function listarTipoMedicamento() {
    objGlobalTipoMedicamento = {
        url: "TipoMedicamento/listarTipoMedicamento",
        cabeceras: ["ID", "Nombre", "Descripcion"],
        propiedades: ["iidtipomedicamento", "nombre", "descripcion"],
        editar: true,
        eliminar: true,
        propiedadId: "iidtipomedicamento"
    }
    pintar(objGlobalTipoMedicamento)
}

function Editar(id) {
    recuperarGenerico("TipoMedicamento/recuperarTipomedicamento/?iidtipomedicamento=" + id, "frmGuardarTipoMedicamento")
}

function GuardarDatos() {
    // Valido los datos
    //if (getN("nombre").trim() == "") {
    //    Incorrecto('Debe ingresar un "Nombre" del tipo medicamento')
    //    return;
    //}
    //if (getN("descripcion").trim() == "") {
    //    Incorrecto('Debe ingresar una "Descripcion" del tipo medicamento')
    //    return;
    //}
    var errores = ValidarDatos("frmGuardarTipoMedicamento");
    if (errores != "") {
        Incorrecto(errores);
        return;
    }
    var frmGuardar = document.getElementById("frmGuardarTipoMedicamento");
    var frm = new FormData(frmGuardar);
    Confirmacion(undefined, undefined, function (rpta) {
        fetchPost("TipoMedicamento/GuardarDatos", "text", frm, function (data) {
            if (data == "1") {
                Exito()
                listarTipoMedicamento();
                LimpiarDatos("frmGuardarTipoMedicamento")
            } else Incorrecto();
        });
    })
}

function Eliminar(id) {
    Confirmacion(undefined, "Desea eliminar el tipo medicamento?", function () {
        fetchGet("TipoMedicamento/eliminarTipoMedicamento/?id=" + id, "text", function (data) {
            if (data == "1") {
                Exito("Se elimino correctamente");
                listarTipoMedicamento();
            } else Incorrecto();
        });
    });
}