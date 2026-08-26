<?php
require "../models/Mis_pacientes.php";
$Filtrar=new Consultas();
$Accion=$_GET["Accion"];
switch ($Accion) {
    case "Filtrar_pacientes":
        $Select_doc=$_POST["Select_doc"];
        $Consulta=$Filtrar->Buscar_pacientes($Select_doc);
        echo json_encode($Consulta);
        break;

    case "Eliminar_paciente":
        $Documento=$_POST["Documento"];
        $Consulta=$Filtrar->Eliminar_paciente($Documento);
        if($Consulta) {
            $Respuesta=array(
                "Estado"=>true,
                "Respuesta"=>"Paciente eliminado correctamente"
            );
        } else {
            $Respuesta=array(
                "Estado"=>false,
                "Respuesta"=>"Error al eliminar el paciente"
            );
        }
        echo json_encode($Respuesta);
        break;
    
    case "Editar_paciente":
        $Documento=$_POST["Documento"];
        $Fecha=$_POST["Fecha"];
        $Consulta=$Filtrar->Editar_paciente($Documento, $Fecha);
        if($Consulta) {
            $Respuesta=array(
                "Estado"=>true,
                "Respuesta"=>"Paciente editado correctamente"
            );
        } else {
            $Respuesta=array(
                "Estado"=>false,
                "Respuesta"=>"Error al editar el paciente"
            );
        }
        echo json_encode($Respuesta);
        break;
}
?>