<?php
require "../config/conexion.php";
class Usuarios{
    public function Registrar_usuario($Nombre, $Apellido, $Identificacion, $Email, $Password, $Rol, $Telefono){
        global $Conexion;
        $consulta=$Conexion->prepare("INSERT INTO Usuarios (Nombre, Apellido, Identificacion, Email, Password, Telefono, Rol) VALUES('$Nombre', '$Apellido', '$Identificacion', '$Email', '$Password', '$Telefono', '$Rol')");
        return $consulta->execute();

    }
    public function Listar_usuarios(){
        global $Conexion;
        $consulta=$Conexion->prepare("SELECT * FROM Usuarios");
        $consulta->execute();
        $Registrar= $consulta->fetchAll();
        return $Registrar;
    }

    public function Eliminar_usuario($Id_usuario){
        global $Conexion;
        $Consulta=$Conexion->prepare("DELETE FROM Usuarios WHERE ID_usuario='$Id_usuario'");
        return $Consulta->execute();
    }
}
?>
