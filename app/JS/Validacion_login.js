$(document).ready(Validar_login);
function Validar_login() {
    $("#Login_form").on("submit", function(Event){
        Event.preventDefault();

        var formdata = new FormData($("#Login_form")[0]);
        $.ajax({
            url: "../../controllers/Validacion_login.php?Accion=Validar_login",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function(response) {
                try {
                    response=JSON.parse(response);
                } catch (e) {
                    alert("Ocurrió un error procesando la respuesta del servidor.");
                    return;
                }

                if (response.Estado == 'Exitoso') {
                    alert("Inicio de sesión exitoso.");
                    miStorage = window.localStorage;
                    miStorage.setItem("nombre_usuario", response.Nombre || "");
                    miStorage.setItem("email", response.Email || "");
                    if(response.Rol == 1){
                        alert("Ingresando como Usuario");
                        window.location.href = "../View/Index.html";
                    }else if(response.Rol == 2){
                        alert("Ingresando como Doctor");
                        window.location.href="../View/Index_doctor.html";
                    }else if(response.Rol == 3){
                        alert("Ingresando como Administrador");
                        window.location.href="../View/Index_admi.html";
                    } else {
                        alert("Rol no reconocido.");
                    }
                } else {
                    alert("Credenciales inválidas o rol incorrecto. Verifica tu información e inténtalo nuevamente.");
                }
            },
            error: function(){
                alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
            }
        });
    });
}


