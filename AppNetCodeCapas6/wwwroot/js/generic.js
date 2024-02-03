function get(idcontrol) {
    return document.getElementById(idcontrol).value;
}

function getI(idcontrol) {
    return document.getElementById(idcontrol).innerHTML;
}

function set(idcontrol, valor) {
    return document.getElementById(idcontrol).value = valor;
}

function setN(namecontrol, valor, idformulario) {
    if (idformulario == undefined) {
        document.getElementsByName(namecontrol)[0].value = valor;
    }
    else {
        document.querySelector("#" + idformulario + " [name='" + namecontrol + "']").value = valor;
    }
}

function setSRC(namecontrol, valor, idformulario) {
    if (idformulario == undefined) {
        document.getElementsByName(namecontrol)[0].src = valor;
    }
    else {
        document.querySelector("#" + idformulario + " [name='" + namecontrol + "']").src = valor;
    }
}

function getN(namecontrol) {
    return document.getElementsByName(namecontrol)[0].value;
}

function setI(idcontrol, valor) {
    return document.getElementById(idcontrol).innerHTML = valor;
}

function previewImage(idfupFoto, idimagen) {
    var fupFoto = document.getElementById(idfupFoto);
    var imgFoto = document.getElementById(idimagen);
    fupFoto.onchange = function () {
        //Primero
        var file = fupFoto.files[0];
        // Leer el archivo (imagen)
        var reader = new FileReader();
        //Cuando termina de leer entra al onloadend
        reader.onloadend = function () {
            imgFoto.src = reader.result;
        }
        reader.readAsDataURL(file)
    }
}

function llenarCombo(data, idcontrol, propiedadId, propiedadNombre, textoprimeraopcion = "--Seleccione--", valueprimeraopcion = "") {
    var contenido = "";
    //var controlId;
    var objActual;
    contenido += "<option value='" + valueprimeraopcion + "'>" + textoprimeraopcion + "</option>"
    for (var i = 0; i < data.length; i++) {
        objActual = data[i];
        contenido += "<option value='" + objActual[propiedadId] + "'>" + objActual[propiedadNombre] + "</option>"
    }
    if (typeof (idcontrol) == "string")
        // document.getElementById(idcontrol).innerHTML = contenido;
        setI(idcontrol, contenido)
    else {
        for (var j = 0; j < idcontrol.length; j++) {
            //controlId = idcontrol[j].split(',')
            setI(idcontrol[j], contenido);
            //alert(idcontrol[j])
        }
    }
}

function recuperarGenerico(url, idformulario) {
    //Todos los elementos
    var elementosName = document.querySelectorAll("#" + idformulario + " [name]");
    var nombrename;
    fetchGet(url, "json", function (data) {
        for (var i = 0; i < elementosName.length; i++) {
            nombrename = elementosName[i].name;
            //CONDICIONES (type text / textarea / combos)
            if ((elementosName[i].type != undefined && elementosName[i].type == "text")
                || elementosName[i].tagName.toUpperCase() == "TEXTAREA" ||
                elementosName[i].tagName.toUpperCase() == "SELECT") {

                setN(nombrename, data[nombrename], idformulario)
            } else if (elementosName[i].tagName.toUpperCase() == "IMG") {
                setSRC(nombrename, data[nombrename], idformulario)
            }

        }
    });
}

function LimpiarDatos(idformulario) {
    var elementosName = document.querySelectorAll("#" + idformulario + " [name]");
    var elementoActual;
    var elementoName;
    for (var i = 0; i < elementosName.length; i++) {
        elementoActual = elementosName[i]
        elementoName = elementoActual.name;
        // Combo
        if (elementoActual.tagName.toLocaleUpperCase() == "SELECT") {
            document.getElementById(elementoActual.id).selectedIndex = 0;
        }
        // Imagen
        else if(elementoActual.tagName.toUpperCase() == "IMG"){
            setSRC(elementoName, "", idformulario);
        }
        else {
            setN(elementoName, "", idformulario);
        }
    }
}

async function fetchGet(url, tiporespuesta, callback, retorno = false) {
    document.getElementById("divLoading").style.display = "block";
    try {
        var raiz = document.getElementById("hdfOculto").value;
        //http://
        var urlCompleta = window.location.protocol + "//" + window.location.host + "/" + raiz
            + url
        var res = await fetch(urlCompleta)
        if (tiporespuesta == "json")
            res = await res.json();
        else if (tiporespuesta == "text")
            res = await res.text();
        //JSON (Object)

        document.getElementById("divLoading").style.display = "none";
        if (retorno == false || retorno == null)
            callback(res)
        else
            return res;
    } catch (e) {
        alert("Ocurrion un error");
        console.log(e)
        console.log(res)
        document.getElementById("divLoading").style.display = "none";
    }
}

async function fetchPost(url, tiporespuesta, frm, callback) {
    try {
        var raiz = document.getElementById("hdfOculto").value;
        document.getElementById("divLoading").style.display = "block";
        // "http://localhost..."
        var urlCompleta = window.location.protocol + "//" + window.location.host + "/" + raiz + url
        var res = await fetch(urlCompleta, {
            method: "POST",
            body: frm
        });
        if (tiporespuesta == "json")
            res = await res.json();
        else if (tiporespuesta == "text")
            res = await res.text();
        // JSON(Object)
        callback(res)
        //console.log(e)
        console.log(res)
        document.getElementById("divLoading").style.display = "none";
    } catch (e) {
        // alert("Ocurrio un error")
        document.getElementById("divLoading").style.display = "none";
        console.log(e)
        console.log(res)
    }
}

function validarKeyPress(idformulario) {
    var elementosName = document.querySelectorAll("#" + idformulario + " [name]");
    var control, nombreClases, clases, cantidad, resultado;
    for (var i = 0; i < elementosName.length; i++) {
        control = elementosName[i];
        nombreClases = control.className;
        clases = nombreClases.split(" ");
        resultado = clases.filter(p => p == "sl")
        if (resultado.length > 0) {
            elementosName[i].onkeypress = function (e) {
                //alert(String.fromCharCode(e.keyCode))
                //alert(e.target.value)
                var cadena = e.target.value + String.fromCharCode(e.keyCode);
                // alert(cadena)
                //if (String.fromCharCode(e.keyCode) == 5) {
                //    e.preventDefault();
                //}
                if (!/^[a-zA-Z]+$/.test(cadena)) {
                    e.preventDefault();
                }
            }
        }
        // Letras con espacio en blanco
        resultado = clases.filter(p => p == "slcenb")
        if (resultado.length > 0) {
            elementosName[i].onkeypress = function (e) {
                var cadena = e.target.value + String.fromCharCode(e.keyCode);
                if (!/^[a-zA-Z(),;: ]+$/.test(cadena)) {
                    e.preventDefault();
                }
            }
        }
        // Solo numeros
        resultado = clases.filter(p => p == "sn")
        if (resultado.length > 0) {
            elementosName[i].onkeypress = function (e) {
                var cadena = e.target.value + String.fromCharCode(e.keyCode);
                if (!/^[0-9]+$/.test(cadena)) {
                    e.preventDefault();
                }
            }
        }
        // Solo numeros, letras y espacios en blanco
        resultado = clases.filter(p => p == "slcenbn")
        if (resultado.length > 0) {
            elementosName[i].onkeypress = function (e) {
                var cadena = e.target.value + String.fromCharCode(e.keyCode);
                if (!/^[a-zA-Z0-9(),;: ]+$/.test(cadena)) {
                    e.preventDefault();
                }
            }
        }
        resultado = clases.filter(p => p.includes("max-"))
        if (resultado.length > 0) {
            // max-100
            var nombreClaseConMax = resultado[0];
            elementosName[i].onkeypress = function (e) {
                // "100"
                var valorMax = nombreClaseConMax.replace("max-", "") * 1;
                var cadena = e.target.value + String.fromCharCode(e.keyCode);
                // var longitudTexto = control.value.length;
                var longitudTexto = cadena.length;
                if (longitudTexto > valorMax) {
                    e.preventDefault();
                }
            }
        }
    }
}

function ValidarDatos(idformulario) {
    var error = "";
    var elementosName = document.querySelectorAll("#" + idformulario + " [name]");
    var control, nombreClases, clases, cantidad, resultado;
    for (var i = 0; i < elementosName.length; i++) {
        control = elementosName[i];
        // form-control ob
        nombreClases = control.className;
        // ["form-control", "ob"]
        clases = nombreClases.split(" ");
        // Obligatorio
        resultado = clases.filter(p => p == "ob")
        if (resultado.length > 0) {
            if (control.tagName.toUpperCase() == "INPUT" || control.tagName.toUpperCase() == "TEXTAREA") {
                if (control.value.trim() == "") {
                    error = "Debe ingresar el campo " + control.name;
                    return error;
                }
            } else if (control.tagName.toUpperCase() == "SELECT") {
                if (control.selectedIndex == 0) {
                    error = "Debe ingresar el campo " + control.name;
                    return error;
                }
            } else if (control.tagName.toUpperCase() == "IMG") {
                if (control.src == "" || control.src == window.location.href) {
                    error = "Debe ingresar la imagen ";
                    return error;
                }
            }
        }
        // Maximos caracteres
        resultado = clases.filter(p => p.includes("max-"))
        if (resultado.length > 0) {
            // max-100
            var nombreClaseConMax = resultado[0];
            // "100"
            var valorMax = nombreClaseConMax.replace("max-", "") * 1;
            var longitudTexto = control.value.length;
            if (control.value.length > valorMax) {
                error = "El campo " + control.name + " supera la longitud maxima caracteres: " + valorMax + ", y usted ha escrito una longitud de: " + longitudTexto + " caracteres";
                return error
            }
        }
        // Minimos caracteres
        resultado = clases.filter(p => p.includes("min-"))
        if (resultado.length > 0) {
            // max-100
            var nombreClaseConMin = resultado[0];
            // "100"
            var valorMin = nombreClaseConMin.replace("min-", "") * 1;
            var longitudTexto = control.value.length;
            if (control.value.length < valorMin) {
                error = "El campo " + control.name + " supera la longitud minima caracteres: " + valorMin + ", y usted ha escrito una longitud de: " + longitudTexto + " caracteres";
                return error
            }
        }
        // Expresiones regulares solo letras
        resultado = clases.filter(p => p == "sl")
        if (resultado.length > 0) {
            if (!/^[a-zA-ZÀ-ÿ]+$/.test(control.value)) {
                error = "El campo " + control.name + " solo debe tener letras minusculas o mayusculas ";
                return error
            }
        }
        // Expresiones regulares solo letras con espacios en blanco
        resultado = clases.filter(p => p == "slcenb")
        if (resultado.length > 0) {
            if (!/^[a-zA-ZÀ-ÿ(),;: ]+$/.test(control.value)) {
                error = "El campo " + control.name + " solo debe tener letras minusculas, mayusculas o espacios en blanco ";
                return error
            }
        }
        // Expresiones regulares solo numeros
        resultado = clases.filter(p => p == "sn")
        if (resultado.length > 0) {
            if (!/^[0-9]+$/.test(control.value)) {
                error = "El campo " + control.name + " solo debe tener numeros del 0 al 9 ";
                return error
            }
        }
        // Expresiones regulares solo letras con espacios en blanco y numeros
        resultado = clases.filter(p => p == "slcenbn")
        if (resultado.length > 0) {
            if (!/^[a-zA-ZÀ-ÿ0-9(),;: ]+$/.test(control.value)) {
                error = "El campo " + control.name + " solo debe tener letras minusculas, mayusculas, espacios en blanco o numeros del 0 al 9";
                return error
            }
        }
    }
    return error;
}

function Incorrecto(titulo="Error", texto="Ocurrio un Error") {
    Swal.fire({
        icon: 'error',
        title: titulo,
        text: texto,
    })
}

function Exito(titulo = "Operacion realizada con Exito") {
    Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 1500
    })
}

function Confirmacion(titulo="Confirmacion", texto="Deseas guardar los cambios?", callback) {
    return Swal.fire({
        title: titulo,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    })
}

function EliminarFila(btn) {
    var fila = btn.parentNode.parentNode;
    var tbody = fila.parentNode;
    tbody.removeChild(fila)
}

function AgregarFila(tabla) {
    //Array
    var propiedadesTabla = objConfiguracionGlobal.propiedades;
    //Obj
    var elementotabla = document.getElementById(tabla);
    var columnaReadOnly = objConfiguracionGlobal.columnreadonly;
    var objtbody = document.getElementById("tbody" + tabla);
    var propiedadActual;
    var contenido = "<tr>";
    for (var i = 0; i < propiedadesTabla.length; i++) {
        propiedadActual = propiedadesTabla[i];
        contenido += "<td ondblclick='clickcelda(this)'>";
        contenido += `<input ${columnaReadOnly.includes(propiedadActual) ? 'readonly' : ''} class='form-control' type='text' />`
        contenido += "</td>";
    }
    contenido += `<td>
         <button class='btn btn-danger' onclick='EliminarFila(this)'>Eliminar</button>
         <button class='btn btn-success' onclick="GuardarElementos(this)">Guardar</button>
         </td>`
    contenido += "</tr>";
    objtbody.insertAdjacentHTML("beforeend", contenido);
}

// {url:"", cabeceras:[], propiedades:[]}
var objConfiguracionGlobal;
var objBusquedaGlobal;
function pintar(objConfiguracion, objBusqueda) {
    var contenido = "";
    if (objConfiguracion.divContenedorTabla == undefined)
        objConfiguracion.divContenedorTabla = "divContenedorTabla"
    if (objConfiguracion.divPintado == undefined)
        objConfiguracion.divPintado = "divTabla"
    if (objConfiguracion.editar == undefined)
        objConfiguracion.editar = false
    if (objConfiguracion.eliminar == undefined)
        objConfiguracion.eliminar = false
    if (objConfiguracion.propiedadId == undefined)
        objConfiguracion.propiedadId = ""
    if (objConfiguracion.popup == undefined)
        objConfiguracion.popup = false
    if (objConfiguracion.type == undefined)
        objConfiguracion.type = ""
    if (objConfiguracion.columnreadonly == undefined)
        objConfiguracion.columnreadonly = []
    if (objConfiguracion.agregar == undefined)
        objConfiguracion.agregar = false
    if (objConfiguracion.idtabla == undefined)
        objConfiguracion.idtabla = "tabla"
    //Este es su lugar
    //agregar
    objConfiguracionGlobal = objConfiguracion;
    objBusquedaGlobal = objBusqueda;

    //Configuraciòn
    if (objConfiguracion.agregar == true) {
        contenido += `<button onclick="AgregarFila('${objConfiguracion.idtabla}')" type="button" class="btn btn-primary" >
                      Agregar
                    </button>`
    }
    if (objConfiguracion.nuevo == true && objConfiguracion.popup == true) {
        contenido += `<button onclick="CallbackEditar(0)" type="button" class="btn btn-primary" data-bs-toggle="modal" 
                      data-bs-target="#${objConfiguracion.popupId}">
                      Nuevo
                    </button>`
    }
    if (objBusqueda != null && objBusqueda != undefined) {
        contenido += ConstruirFormulario(objBusqueda, "busqueda")
    }

    fetchGet(objConfiguracion.url, "json", function (res) {
        contenido += "<div id='" + objConfiguracion.divContenedorTabla + "'>";
        //........................................................
        contenido += generarTabla(res)
        contenido += "</div>";
        //Pinta los controles en pantalla
        setI(objConfiguracion.divPintado, contenido)
        //Pintado
        var objeto;
        for (var j = 0; j < objBusquedaCombos.length; j++) {
            objeto = objBusquedaCombos[j]
            llenarCombo(objeto.data, objeto.id, objeto.valuemostrar, objeto.propiedadmostrar, "-------Todos--------", "0")
        }
    })
}

function clickcelda(td) {
    var valor = td.getAttribute("data-valor");
    td.innerHTML = "";
    td.insertAdjacentHTML("beforeend", `
     <input class='form-control' value='${valor}' />
     `)

    var trfila = td.parentNode;
    var tdultimo = trfila.lastChild;
    tdultimo.setAttribute("data-botones", tdultimo.innerHTML);
    tdultimo.innerHTML = "";
    // if (tdultimo.children.length == 0) {
    tdultimo.insertAdjacentHTML("beforeend", `
            <button class='btn btn-success' onclick='GuardarElementos(this)' >Guardar</button>
            <button onclick='Cancelar(this)' class='btn btn-danger'  >Cancelar</button>
        `);
    //}

}

function GuardarElementos(btn) {
    var trActual = btn.parentNode.parentNode;
    var nhijos = trActual.children.length;
    var valores = [];
    var elementoActual;
    for (var i = 0; i < nhijos - 1; i++) {
        elementoActual = trActual.children[i];
        //Hay un input
        if (elementoActual.children.length > 0 && elementoActual.children[0].nodeName.toUpperCase() == "INPUT") {
            valores.push(elementoActual.children[0].value)
        }
        //else
        else {
            valores.push(elementoActual.getAttribute("data-valor"));
        }
    }
    //Valores[] valores
    var urlGuardar = objConfiguracionGlobal.urlguardar;
    //Propiedades
    var propiedades = objConfiguracionGlobal.propiedades;

    var frm = new FormData();
    for (var j = 0; j < propiedades.length; j++) {
        frm.append(propiedades[j], valores[j])
    }
    Confirmacion(undefined, undefined, function (rpta) {
        fetchPost(urlGuardar, "text", frm, function (data) {
            if (data != "0") {
                var tdUltimo = trActual.lastChild;
                var botones = tdUltimo.getAttribute("data-botones");
                tdUltimo.innerHTML = botones;
                tdUltimo.setAttribute("data-botones", "");
                if (valores[0] == "") {
                    valores[0] = data;
                }
                Exito("Se actualizo correctamente");
                for (var i = 0; i < nhijos - 1; i++) {
                    elementoActual = trActual.children[i];
                    elementoActual.setAttribute("data-valor", valores[i])
                    elementoActual.innerHTML = valores[i];
                }
                //trActual.lastChild.innerHTML = "";
            } else Incorrecto();
        })
    })

    // return valores;
}

function Cancelar(btn) {
    var tdActual = btn.parentNode;
    var trActual = tdActual.parentNode;
    var nHijos = trActual.children.length;
    var obj;
    for (var i = 0; i < nHijos; i++) {
        // obj es el Objeto "td"
        obj = trActual.children[i];
        // Texto
        obj.innerHTML = obj.getAttribute("data-valor");
    }
    var tdUltimo = trActual.lastChild
    var botones = tdUltimo.getAttribute("data-botones");
    tdUltimo.innerHTML = botones;
    tdUltimo.setAttribute("data-botones", "");
}

function generarTabla(res) {
    var contenido = "";
    //["Id tipo medicamento", "Nombre", "Descripcion"]
    var cabeceras = objConfiguracionGlobal.cabeceras;
    //: ["idtipomedicamento", "nombre","descripcion"]
    var nombrepropiedades = objConfiguracionGlobal.propiedades;
    contenido += "<table id='" + objConfiguracionGlobal.idtabla + "'class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < cabeceras.length; i++) {
        contenido += "<td>" + cabeceras[i] + "</td>";
    }
    //Una columna adicional (thead)
    if (objConfiguracionGlobal.editar == true || objConfiguracionGlobal.eliminar == true || objConfiguracionGlobal.type == "edit") {
        contenido += "<td>Operaciones</td>";
    }
    //contenido += "<td>Id tipo medicamento</td>";
    //contenido += "<td>Nombre</td>";
    //contenido += "<td>Descripcion</td>";
    contenido += "</tr>";
    contenido += "</thead>"

    var nregistros = res.length;
    var obj;
    var propiedadActual;
    contenido += "<tbody id='tbody" + objConfiguracionGlobal.idtabla + "'>";
    for (var i = 0; i < nregistros; i++) {
        obj = res[i]
        contenido += "<tr>";
        for (var j = 0; j < nombrepropiedades.length; j++) {
            propiedadActual = nombrepropiedades[j]
            if (objConfiguracionGlobal.type != "edit") {
                contenido += "<td>" + obj[propiedadActual] + "</td>";
            }

            else {
                var columnasNoEditables = objConfiguracionGlobal.columnreadonly;
                if (!columnasNoEditables.includes(propiedadActual))
                    contenido += "<td ondblclick='clickcelda(this)' data-valor='" + obj[propiedadActual] + "' >" + obj[propiedadActual] + "</td>";
                else
                    contenido += "<td data-valor='" + obj[propiedadActual] + "' >" + obj[propiedadActual] + "</td>";
            }

        }
        //Una columna adicional (tbody)
        if (objConfiguracionGlobal.editar == true || objConfiguracionGlobal.eliminar == true || objConfiguracionGlobal.type == "edit") {
            var propiedadId = objConfiguracionGlobal.propiedadId;
            contenido += "<td>";
            if (objConfiguracionGlobal.editar == true) {
                var tienepopup = objConfiguracionGlobal.popup
                contenido += `<i 
                        ${tienepopup == true ? `data-bs-toggle="modal" data-bs-target="#${objConfiguracionGlobal.popupId}" ` : ``}
                onclick="CallbackEditar(${obj[propiedadId]})" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                  </svg ></i>`
            }
            if (objConfiguracionGlobal.eliminar == true) {
                contenido += `
             <i onclick="Eliminar(${obj[propiedadId]})" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                  class="bi bi-trash-fill" viewBox="0 0 16 16">
                 <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg></i>
            `
            }
            contenido += "</td>";
        }
        //contenido += "<td>" + obj[idtipomedicamento] + "</td>";
        //contenido += "<td>" + obj.[nombre] + "</td>";
        //contenido += "<td>" + obj.[descripcion] + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>"
    contenido += "</table>";
    return contenido;
}

function CallbackEditar(id) {
    if (objConfiguracionGlobal.popup == true) {
        //Nuevo
        if (objConfiguracionGlobal.titleId != undefined && objConfiguracionGlobal.titlePopup != undefined) {
            if (id == 0) {
                setI(objConfiguracionGlobal.titleId, "Agregar " + objConfiguracionGlobal.titlePopup);
            }
            //Editar
            else {
                setI(objConfiguracionGlobal.titleId, "Editar " + objConfiguracionGlobal.titlePopup);
            }
        }
    }
    Editar(id)
}

var objBusquedaCombos = [];
function ConstruirFormulario(objFormulario, tipo = "") {
    var contenido = "";
    var formulario = objFormulario.formulario;
    var elemento
    var numeroelementos
    var objetoActual;
    contenido += `<fieldset>`
    contenido += `<legend>${objFormulario.legend}</legend>`
    contenido += `<form id="${objFormulario.idformulario}" method="post" class="mb-3">`;
    for (var i = 0; i < formulario.length; i++) {
        //array () [{},{}]
        elemento = formulario[i];
        numeroelementos = elemento.length;
        contenido += "<div class='row'>";
        for (var j = 0; j < numeroelementos; j++) {
            //{class: "col-md-6", label: "Id medicamento", name: "iidmedicamento", type:"number", readonly:false}
            objetoActual = elemento[j]
            if (objetoActual.class == undefined) objetoActual.class = "col-md-6"
            if (objetoActual.type == undefined) objetoActual.type = text
            if (objetoActual.readonly == undefined) objetoActual.readonly = false
            if (objetoActual.label == undefined) objetoActual.label = ""
            if (objetoActual.name == undefined) objetoActual.name = ""
            if (objetoActual.classControl == undefined) objetoActual.classControl = ""
            if (objetoActual.id == undefined) objetoActual.id = ""
            contenido += `<div class="${objetoActual.class}">`;
            contenido += `<label>${objetoActual.label}</label>`;
            if (objetoActual.type == "text" || objetoActual.type == "number") {
                contenido += `<input type="${objetoActual.type}" class="form-control ${objetoActual.classControl}" name="${objetoActual.name}"/>`;
            } else if (objetoActual.type == "textarea") {

            } else if (objetoActual.type == "combobox") {
                contenido += `<select class="form-control ${objetoActual.classControl}" name="${objetoActual.name}" id="${objetoActual.id}">
                              </select>`;
                objBusquedaCombos.push(objetoActual);
            }
            contenido += `</div>`;
        }
        contenido += "</div>";
    }
    contenido += `</form>`;
    if (tipo == "busqueda") {
        contenido += ` <button class="btn btn-primary" onclick="BuscarGenericoBusqueda('${objFormulario.idformulario}')">Buscar</button>
                       <button class="btn btn-danger" onclick="LimpiarGenericoBusqueda('${objFormulario.idformulario}')" >Limpiar</button>`
    }
    contenido += `</fieldset>`
    return contenido;
}

function LimpiarGenericoBusqueda(idformulario) {
    LimpiarDatos("frmBusqueda");
    var frmBusqueda = document.getElementById(idformulario);
    var frm = new FormData(frmBusqueda)
    fetchPost(objConfiguracionGlobal.url, "json", frm, function (res) {
        document.getElementById(objConfiguracionGlobal.divContenedorTabla).innerHTML = generarTabla(res);
    })
}

function BuscarGenericoBusqueda(id) {
    var formu = document.getElementById(id);
    var frm = new FormData(formu);
    fetchPost(objBusquedaGlobal.url, "json", frm, function (res) {
        document.getElementById(objConfiguracionGlobal.divContenedorTabla).innerHTML = generarTabla(res);
    })
}