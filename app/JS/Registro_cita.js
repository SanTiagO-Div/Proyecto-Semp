$(document).ready(Iniciar);
function Iniciar() {
    $("#form-agendar").on("submit", function(Event){
        Event.preventDefault();
        var formdata = new FormData($("#form-agendar")[0]);
        $.ajax({
            url: "../../controllers/Registro_cita.php?Accion=Registrar_cita",
            method: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success:function(response){
                response = JSON.parse(response);
                if (response.Estado == 'Exitoso') {
                    alert("Cita registrada con éxito");
                    window.location.href = "../View/Index.html";
                }else{
                    alert("Error al registrar la cita");

                }
            } 
        });
    });
}