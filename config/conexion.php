<?php
    require "global.php";
    try{
         $Conexion = new PDO(
            "mysql:host=".HOST.
            ";dbname=".NAME.
            ";charset=".codificacion,
            username,
            contrasena
        );
    }catch(PDOException $e){
        echo "Error de conexion" . $e->getMessage();
        exit();
    }

?>