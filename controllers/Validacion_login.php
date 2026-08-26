<?php
require "../models/Validacion_login.php";
$Validacion=new Usuarios();

$Accion= $_GET["Accion"];
switch ($Accion) {
    case 'Validar_login':
        $Email=$_POST["email"];
        $Password=$_POST["password"];
        $Rol=$_POST["Rol"];
        $Consulta=$Validacion->Validar_login($Email, $Password, $Rol);
        if ($Consulta){
            if ($Rol == 1) {
                $Respuesta=array(
                    "Estado"=>'Exitoso',
                    "Email"=>$Email,
                    "Nombre" => $Consulta['Nombre'],
                    "Password"=>$Password,
                    "Rol"=> 1
                );
            }elseif ($Rol == 2) {
               $Respuesta=array(
                "Estado"=>'Exitoso',
                "Email"=>$Email,
                "Password"=>$Password,
                "Rol"=>2
                );
            }elseif ($Rol == 3) {
                $Respuesta=array(
                 "Estado"=>'Exitoso',
                 "Email"=>$Email,
                 "Password"=>$Password,
                 "Rol"=>3
                 );
            }
            
            echo json_encode($Respuesta);
        }else{
            $Respuesta=array(
                "Estado"=>'Fallido'
            );
            echo json_encode($Respuesta);
        }
        break;
}
?>