<?php
require "../config/Conexion.php";
class Usuarios{
    public function Validar_login($Email, $Password, $Rol){
        global $Conexion;
        $consulta = $Conexion->prepare("SELECT * FROM Usuarios WHERE Email = :email AND Password = :password AND Rol = :rol");
        $consulta->bindParam(':email', $Email);
        $consulta->bindParam(':password', $Password);
        $consulta->bindParam(':rol', $Rol);
        $consulta->execute();
        $Validar = $consulta->fetch(PDO::FETCH_ASSOC);
        if (is_array($Validar) && !empty($Validar)){
            return $Validar;
        } else {
            return false;
        }
    }
}
?> 