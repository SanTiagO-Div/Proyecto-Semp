<?php
require "../models/Registro_cita.php";
$Registro_cita=new Consultas();
$Accion=$_GET["Accion"];
switch ($Accion) {
    case 'Registrar_cita':
        $Nombre=$_POST["Nombre"];
        $Apellido=$_POST["Apellido"];
        $Documento=$_POST["Documento"];
        $Sede=$_POST["Sede"];
        $Especialidad=$_POST["Especialidad"];
        $Doctor=$_POST["Doctor"];
        $Fecha=$_POST["Fecha"];
        $Consulta=$Registro_cita->Registrar_cita($Nombre, $Apellido, $Documento, $Sede, $Especialidad, $Doctor, $Fecha);
        if ($Consulta){
            $Respuesta=array(
                "Estado"=>'Exitoso',
                "Nombre"=>$Nombre,
                "Apellido"=>$Apellido,
                "Documento"=>$Documento,
                "Sede"=>$Sede,
                "Especialidad"=>$Especialidad,
                "Doctor"=>$Doctor,
                "Fecha"=>$Fecha
            );
            echo json_encode($Respuesta);

        }else{
            $Respuesta=array(
                "Estado"=>'Fallido'
            );
            echo json_encode($Respuesta);
        }
}
?>