window.onload = async function () {
    await listarMedicamento();
    listarCombos();
}

var objMedicamento;
var objBusqueda;
var rpta;
async function listarMedicamento() {
    objMedicamento = {
        popup: true,
        titleId: "lbltitulo",
        titlePopup: "Medicamento",
        popupId: "staticBackdrop",
        url: "Medicamento/listarMedicamento",
        cabeceras: ["ID", "Medicamento", "Laboratorio","Tipo Medicamento"],
        propiedades: ["iidmedicamento", "nombremedicamento", "nombrelaboratorio", "nombretipomedicamento"],
        divPintado: "divContenedor",
        propiedadId: "iidmedicamento",
        editar: true,
        eliminar: true,
        nuevo: true,
    }
    rpta = await fetchGet("Medicamento/listarCombosMedicamento", "json", null, true);
    //alert(rpta)
    //alert(JSON.stringify(rpta))
    objBusqueda = {
        legend: "Busqueda Medicamento",
        idformulario: "frmBusquedaMedicamento",
        url: "Medicamento/filtrarMedicamento",
        formulario: [
            // Primera Fila
            [
                {
                    // div
                    type:"number",
                    class: "col-md-6",
                    label: "Id Medicamento",
                    name: "iidmedicamento",
                },
                {
                    type: "text",
                    class: "col-md-6",
                    label: "Nombre Medicamento",
                    name: "nombremedicamento",
                }
            ],
            // Segunda Fila
            [
                {
                    // div
                    type: "combobox",
                    class: "col-md-6",
                    label: "Nombre Laboratorio",
                    name: "iidlaboratorio",
                    data: rpta.listalaboratorio,
                    id: "cboLaboratorioBusqueda",
                    propiedadMostrar: "nombre",
                    valueMostrar: "iidlaboratorio"
                },
                {
                    // div
                    type: "combobox",
                    class: "col-md-6",
                    label: "Nombre Tipo Medicamento",
                    name: "iidtipomedicamento",
                    data: rpta.listatipomedicamento,
                    id: "cboTipoMedicamentoBusqueda",
                    propiedadMostrar: "nombre",
                    valueMostrar: "idtipomedicamento"
                }
            ]
        ]
    }
    pintar(objMedicamento, objBusqueda)
}

function listarCombos() {
    llenarCombo(rpta.listalaboratorio, [/*"cboLaboratorioBusqueda",*/"cboLaboratorioGuardar"], "iidlaboratorio", "nombre", "Todos", "0")
    llenarCombo(rpta.listatipomedicamento, [/*"cboLaboratorioBusqueda",*/"cboTipoMedicamentoGuardar"], "idtipomedicamento", "nombre", "Todos", "0")
}

function LimpiarMedicamento() {
    LimpiarDatos("frmBusquedaMedicamento");
}

function GuardarDatos() {
    var errores = ValidarDatos("frmGuardarMedicamento")
    if (errores != "") {
        Incorrecto(errores)
        return;
    }
    Confirmacion(undefined, "Desea guardar el Medicamento", function (rpta) {
        var formu = document.getElementById("frmGuardarMedicamento");
        var frm = new FormData(formu);
        fetchPost("Medicamento/guardarMedicamento", "text", frm, function (res) {
            if (res == "1") {
                Exito()
                //listarLaboratorio();
                fetchGet("Medicamento/listarMedicamento", "json", function (rpta) {
                    document.getElementById("divContenedorTabla").innerHTML = generarTabla(rpta);
                    LimpiarDatos("frmGuardarMedicamento")
                    document.getElementById("btnCerrarModal").click();
                })
            } else Incorrecto();
        })
    })
}

function Editar(id) {
    LimpiarDatos("frmGuardarMedicamento");
    // Nuevo
    if (id != 0) {
        // Recuperar informacion de la BD
        recuperarGenerico("Medicamento/recuperarMedicamento/?iidmedicamento=" + id, "frmGuardarMedicamento");
    }
}

function Eliminar(id) {
    Confirmacion(undefined, "Desea eliminar el Medicamento?", function () {
        fetchGet("Medicamento/eliminarMedicamento/?id=" + id, "text", function (data) {
            if (data == "1") {
                Exito("Se elimino correctamente");
                listarMedicamento();
            } else Incorrecto();
        });
    });
}

//function BuscarDatos() {
//    var frmBusqueda = document.getElementById("frmBusquedaMedicamento");
//    var frm = new FormData(frmBusqueda)
//    fetchPost("Medicamento/filtrarMedicamento", "json", frm, function (res) {
//        document.getElementById("divContenedorTabla").innerHTML = generarTabla(res);
//    })
//}