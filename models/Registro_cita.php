<?php
require "../config/conexion.php";
class Consultas{
    public function Registrar_cita($Nombre, $Apellido, $Documento, $Sede, $Especialidad, $Doctor, $Fecha){
        global $Conexion;
        $consulta=$Conexion->prepare("INSERT INTO Consultas (Nombre, Apellido, Documento, Sede, Especialidad, Doctor, Fecha) VALUES('$Nombre', '$Apellido', '$Documento', '$Sede', '$Especialidad', '$Doctor', '$Fecha')");
        return $consulta->execute();

    }
}
?>