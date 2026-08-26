$(document).ready(Iniciar);
function Iniciar() {
    $("#Registro_usuario").on("submit", function (Event) {
        let pass1 = $("#Password").val();
        let pass2 = $("#password2").val();

        if (pass1 !== pass2) {
            Event.preventDefault();
            alert("Las contraseñas no coinciden");
            $("#Password").addClass("is-invalid");
            $("#password2").addClass("is-invalid");
            return; 
        }

        $("#Password").removeClass("is-invalid");
        $("#password2").removeClass("is-invalid");

        Event.preventDefault();

        var formdata = new FormData($("#Registro_usuario")[0]);
        $.ajax({
            url: "../../controllers/Registro_usuario.php?Accion=Registrar_usuario",
            method: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (response) {

                response = JSON.parse(response);

                if (response.Estado == 'Exitoso') {
                    alert("Usuario registrado con éxito");
                    window.location.href = "../View/Login.html";

                } else {
                    alert(response.Estado);
                }
            }
        });
    });
}



