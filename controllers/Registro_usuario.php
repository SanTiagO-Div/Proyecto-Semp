<?php
require "../models/Registro_usuario.php";
$Registro_usuario=new Usuarios();

$Accion=$_GET["Accion"];
switch ($Accion) {
    case 'Registrar_usuario':
        $Nombre=$_POST["Nombre"];
        $Apellido=$_POST["Apellido"];
        $Identificacion=$_POST["Identificacion"];
        $Email=$_POST["Email"];
        $Telefono=$_POST["Telefono"];
        $Password=$_POST["Password"];
        $Rol=$_POST["Rol"];
        $Consulta=$Registro_usuario->Registrar_usuario($Nombre, $Apellido, $Identificacion, $Email, $Password, $Rol, $Telefono);
        if ($Consulta){
            $Respuesta=array(
                "Estado"=>'Exitoso',
                "Nombre"=>$Nombre,
                "Apellido"=>$Apellido,
                "Identificacion"=>$Identificacion,
                "Email"=>$Email,
                "Telefono"=>$Telefono,
                "Password"=>$Password,
                "Rol"=>$Rol
            );
            echo json_encode($Respuesta);
        }else{
            $Respuesta=array(
                "Estado"=>'Fallido'
            );
            echo json_encode($Respuesta);
        }
        break;
    case 'Listar_usuarios':
        $Respuesta=$Registro_usuario->Listar_usuarios();
        $Data["Info"]="";
        for ($i=0; $i <count($Respuesta) ; $i++) {
            $Data["Info"].="
                <tr> 
                    <td>".$Respuesta[$i]['Nombre']."</td>
                    <td>".$Respuesta[$i]['Apellido']."</td>
                    <td>".$Respuesta[$i]['Identificacion']."</td>
                    <td>".$Respuesta[$i]['Email']."</td>
                    <td>".$Respuesta[$i]['Password']."</td>
                    <td>".$Respuesta[$i]['Telefono']."</td>
                    <td>".$Respuesta[$i]['Rol']."</td>
                    <td>
                        <button class='btn btn-danger' onclick='Eliminar_usuario(".$Respuesta[$i]['ID_usuario'].")'>Eliminar</button>
                    </td>
                </tr>   
            ";
        }
        echo json_encode($Data);
        break;

    case 'Eliminar_usuario':
        $Id_usuario=$_POST["ID_usuario"];
        $Consulta=$Registro_usuario->Eliminar_usuario($Id_usuario);
        if($Consulta){
            $Respuesta=array(
                "Estado"=>'Exitoso',
                "Info"=>'Usuario eliminado correctamente'

            );
        }else{
            $Respuesta=array(
                "Estado"=>'Fallido',
                "Info"=>'No se pudo eliminar el usuario'

            );
        }
        echo json_encode($Respuesta);
        break;
    
}
?>