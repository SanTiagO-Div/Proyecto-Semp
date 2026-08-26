$(document).ready(Iniciar);
function Iniciar() {
    $("#Formulario_fecha").hide();
    $("#Formulario_busqueda").on("submit", function (event) {
        event.preventDefault();
        var formdata = new FormData($("#Formulario_busqueda")[0]);
        $.ajax({
            url: "../../controllers/Mis_pacientes.php?Accion=Filtrar_pacientes",
            method: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (response) {
                response = JSON.parse(response);
                html = '';
                response.forEach(paciente => {
                    html += `
                    <tr>
                        <td>${paciente.Nombre}</td>
                        <td>${paciente.Apellido}</td>
                        <td>${paciente.Documento}</td>
                        <td>${paciente.Especialidad}</td>
                        <td>${paciente.Sede}</td>
                        <td>${paciente.Fecha}</td>
                        <td>
                            <button class="btn btn-danger btn-sm btn-editar" onclick="Eliminar_paciente(${paciente.Documento})" data-id="${paciente.Documento}">
                                Eliminar
                            </button>
                            <button class="btn btn-warning btn-sm btn-editar" onclick="Editar_paciente(${paciente.Documento})" data-id="${paciente.Documento}">
                                Editar
                        </td>
                    </tr>`
                });
                $("#Tabla_pacientes").html(html);
            }
        });
    });
}   

function Eliminar_paciente(Documento){
    const confirmar = confirm(`¿Deseas eliminar al paciente con número de documento ${Documento}?`);
    if (!confirmar) { return; }
    $.ajax({
        url: "../../controllers/Mis_pacientes.php?Accion=Eliminar_paciente",
        method: "POST",
        data: {Documento: Documento},
        success: function(Response){
            Response=JSON.parse(Response);
            if(Response.Estado==true){
                alert("Paciente eliminado correctamente");
                location.reload();
            }else{
                alert("Error al eliminar el paciente");
            }
        }
    })
}

function Editar_paciente(Documento){
    const confirmar = confirm(`¿Deseas editar al paciente con número de documento ${Documento}?`);
    if (!confirmar) { return; }
    console.log("Editar paciente:", Documento);
    $("#Formulario_fecha").show();
    $("#Formulario_fecha").data("Documento", Documento);
    
    $("#Formulario_fecha").on("submit", function(event){
        event.preventDefault();
        var nuevaFecha = $("#fecha").val();
        var Documento = $("#Formulario_fecha").data("Documento");

        $.ajax({
            url: "../../controllers/Mis_pacientes.php?Accion=Editar_paciente",
            method: "POST",
            data: {Documento: Documento, Fecha: nuevaFecha},
            success: function(Response){
                Response=JSON.parse(Response);
                if(Response.Estado==true){
                    alert("Paciente editado correctamente");
                    location.reload();
                }else{
                    alert("Error al editar el paciente");
                }
            }
        })
    });
}