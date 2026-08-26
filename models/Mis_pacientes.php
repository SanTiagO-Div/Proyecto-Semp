<?php
require "../config/conexion.php";
class Consultas{
    public function Buscar_pacientes($Select_doc){
        global $Conexion; 
        $Consulta=$Conexion->prepare("SELECT * FROM Consultas WHERE Doctor LIKE '%$Select_doc%';");  
        $Consulta->execute();
        $Registro=$Consulta->fetchAll(PDO::FETCH_ASSOC);
        return $Registro;
    }
    public function Eliminar_paciente($Documento){
        global $Conexion; 
        $Consulta=$Conexion->prepare("DELETE FROM Consultas WHERE Documento=:Documento;");  
        $Consulta->bindParam(":Documento",$Documento);
        $Resultado=$Consulta->execute();
        return $Resultado;
    }
    public function Editar_paciente($Documento, $Fecha){
        global $Conexion; 
        $Consulta=$Conexion->prepare("UPDATE Consultas SET Fecha=:Fecha WHERE Documento=:Documento;");  
        $Consulta->bindParam(":Documento",$Documento);
        $Consulta->bindParam(":Fecha",$Fecha);
        $Resultado=$Consulta->execute();
        return $Resultado;
    }
}
?>