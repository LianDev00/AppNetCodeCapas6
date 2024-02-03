window.onload = function () {
    listarPersonas();
}

var objGlobalPersona;
var objGlobalBusquedaPersona;
function listarPersonas() {
    objGlobalBusquedaPersona = {
        legend: "Filtrado Persona",
        idformulario: "frmBusqueda",
        url: "Persona/filtrarPersona",
        formulario: [
            //Fila
            [
                {
                    //div
                    class: "col-md-6",
                    label: "Nombre Completo",
                    name: "nombrecompleto"
                },
                {
                    class: "col-md-6",
                    label: "Sexo",
                    type: "radio",
                    //nuevas
                    labels: ["Masculino", "Femenino"],
                    values: ["1", "2"],
                    ids: ["rbMasculino", "rbFemenino"],
                    checked: "rbFemenino",
                    //
                    name: "iidsexo"
                }
            ]

        ]
    }
    objGlobalPersona = {
        url: "Persona/listarPersona",
        cabeceras: ["Id persona", "Nombre Completo", "Sexo", "Telefono"],
        propiedades: ["iidpersona", "nombrecompleto", "nombresexo", "numerotelefonico"],
        editar: true,
        eliminar: true,
        propiedadId: "iidpersona"
    }
    pintar(objGlobalPersona, objGlobalBusquedaPersona)
} 

//function BuscarDatos() {
//    var frBusqueda = document.getElementById("frmBusqueda");
//    var frm = new FormData(frBusqueda)
//    fetchPost("Persona/filtrarPersona", "json", frm, function (res) {
//        document.getElementById("divContenedorTabla").innerHTML = generarTabla(res);
//    })
//}