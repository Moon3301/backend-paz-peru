<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}


// $_APIURL = 'https://api.eterniasoft.com/v3/'; //TEST
// $_APIKEY = 'mL4exEZPpbahcIM7c7S54X69Qp0djpE2g76zlxUf'; //TEST

$_APIURL = 'https://api.sperant.com/v3/'; //PRD
$_APIKEY = 'mvqHwNt4ww3Qc9WYCyO015ybJTDayDuL16ESFr5r'; //PRD

// Leer JSON desde el body de la solicitud
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "Datos invalidos"]);
    exit;
}

// Datos del cliente
$dni = trim($input['document'] ?? '');
$firstName = trim($input['fname'] ?? '');
$lastName = trim($input['lname'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$observation = trim($input['observation'] ?? '');


//Datos proyecto e inmueble
$nombreProyecto = trim($input['proyecto'] ?? '');
$proyectoID = trim($input['proyectoID'] ?? '');
$unidad = $input['unidad'] ?? '';
$tipologia = trim($input['tipologia'] ?? '');
$unidadID = trim($input['unidadID'] ?? '');
$tipologiaID = trim($input['tipologiaID'] ?? '');


//Datos UTM
$sourceID = trim($input['source_id'] ?? '');
$utmSource = trim($input['utm_source'] ?? '');
$utmMedium = trim($input['utm_medium'] ?? '');
$utmCampaign = trim($input['utm_campaign'] ?? '');


// Armar datos cliente
$dataCliente = [
    "project_id" => $proyectoID,
    "document" => $dni,
    "fname" => $firstName,
    "lname" => $lastName,
    "email" => $email,
    "phone" => $phone,
    "observation" => $observation,
    "input_channel_id" => 1, //pagina web
    "source_id" => $sourceID,
    "interest_type_id" => 5, //por contactar
    "utm_source" => $utmSource,
    "utm_medium" => $utmMedium,
    "utm_campaign" => $utmCampaign    
];

// 1. Validar si cliente existe
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $_APIURL . 'clients?q='.$dni,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
        'Authorization: ' . $_APIKEY
    ),
));

$response = curl_exec($ch);
curl_close($ch);
$clientData = json_decode($response, true);
$clienteExiste = isset($clientData['data']['attributes']['id']);
$idCliente = 0;

if ($clienteExiste) {
    $idCliente = $clientData['data']['attributes']['id'];
    echo json_encode(["success" => false, "message" => "Cliente ya se encuentra registrado."]);
} else {
    // 2. Crear cliente
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => $_APIURL . 'clients',
        CURLOPT_POSTFIELDS => json_encode($dataCliente),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array(
            'Authorization: ' . $_APIKEY,
            'Content-Type: application/json'
        ),
    ));

    $createClientResponse = curl_exec($ch);
    curl_close($ch);
    $clientCreated = json_decode($createClientResponse, true);

    if (!isset($clientCreated['data']['attributes']['id'])) {
        echo json_encode(["success" => false, "message" => "Error al crear el cliente ". $dataCliente]);
        exit;
    }

    $idCliente = $clientCreated['data']['attributes']['id'];
}

// 2. Crear el Lead
$dataLead = [
    "client_id" => $idCliente,
    "unit_id" => $unidadID,
    "type_id" => $tipologiaID,
    "template_id" => 617,
    "utm_source" => $utmSource,
    "utm_medium" => $utmMedium,
    "utm_campaign" => $utmCampaign
];

$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $_APIURL . 'budgets',
    CURLOPT_POSTFIELDS => json_encode($dataLead),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
        'Authorization: ' . $_APIKEY,
        'Content-Type: application/json'
    ),
));

$leadResponse = curl_exec($ch);
curl_close($ch);
$leadCreated = json_decode($leadResponse, true);

if (!isset($clientCreated['data']['attributes']['id'])) {
    echo json_encode(["success" => false, "message" => "Error al generar el lead en crm"]);
    exit;
}else{

    // 3. Envia correo al cliente
    $tipologia = htmlentities($tipologia, ENT_QUOTES, 'UTF-8');

    $asunto = "Gracias por tu interés en Paz Inmobiliaria";

  $mensaje = '<!DOCTYPE html>';
    $mensaje .= '<html lang="es"><head></head><body>';
    $mensaje .= '<center>';
    $mensaje .= '<table width="600" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="border-spacing: 0; border-collapse: collapse;">';
    $mensaje .= '<tr><td style="text-align: center;"><img src="https://paz.pe/images/imagesCorreo/logo-4.png"></td></tr>';
    $mensaje .= '<tr><td><table cellpadding="0" cellspacing="0" style="border-spacing: 0; border-collapse: collapse;">';
    $mensaje .= '<tr><td width="30"></td>';
    $mensaje .= '<td bgcolor="#222222" width="540"><img src="https://paz.pe/images/imagesCorreo/header.jpg" style="width:100%;"></td>';
    $mensaje .= '<td width="30"></td></tr>';
    $mensaje .= '</table></td></tr>';
    $mensaje .= '<tr><td><table cellpadding="0" cellspacing="0" style="border-spacing: 0; border-collapse: collapse;">';
    $mensaje .= '<tr><td width="30"></td>';
    $mensaje .= '<td bgcolor="#222222" width="540" style="color:#ffffff; font-family: sans-serif; font-size: 18px;">';
    $mensaje .= '<table cellpadding="0" cellspacing="0" style="border-spacing: 0; border-collapse: collapse;">';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td>';
    $mensaje .= '</tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>Estimado/a <strong>' . $firstName . ' ' . $lastName . '</strong></td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>Gracias por tu interés en el departamento <strong>' . $unidad . '</strong> tipología <strong>' . $tipologia . '</strong> en nuestro proyecto <strong>'.$nombreProyecto.'</strong> de Paz Inmobiliaria.</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>Muy pronto, uno de nuestros asesores se pondrá en contacto con usted para atenderlo y brindarle más información.</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>Saludos,</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>Paz Inmobiliaria.</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '<tr><td width="20"></td>';
    $mensaje .= '<td>&nbsp;</td>';
    $mensaje .= '<td width="20"></td></tr>';
    $mensaje .= '</table>';
    $mensaje .= '</td>';
    $mensaje .= '<td width="30"></td></tr>';
    $mensaje .= '</table></td></tr>';
    $mensaje .= '<tr><td>&nbsp;</td></tr>';
    $mensaje .= '<tr><td style="text-align: center; color:#222222; font-family: sans-serif; font-size: 14px;">Paz Inmobiliaria S.A 20518023579 / Paz Real Estate S.A.C RUC 20605346716</td></tr>';
    $mensaje .= '<tr><td style="text-align: center; color:#222222; font-family: sans-serif; font-size: 14px;">Av. Camino real 390, Torre central - Oficina 1701, San Isidro</td></tr>';
    $mensaje .= '<tr><td>&nbsp;</td></tr>';
    $mensaje .= '<tr><td style="text-align: center;">';
    $mensaje .= '<a href="https://www.facebook.com/Pazinmobiliariaperu"><img src="https://paz.pe/images/imagesCorreo/icono_fb.png" style="margin-right:15px;"></a>';
    $mensaje .= '<a href="https://www.instagram.com/pazinmobiliariaperu/"><img src="https://paz.pe/images/imagesCorreo/icono_ig.png" style="margin-right:15px;"></a>';
    $mensaje .= '<a href="https://www.youtube.com/channel/UCrzmQ_g5EZqsy0GiDlWVeJQ"><img src="https://paz.pe/images/imagesCorreo/icono_yt.png" style="margin-right:15px;"></a>';
    $mensaje .= '<a href="https://www.linkedin.com/company/paz-inmobiliaria/"><img src="https://paz.pe/images/imagesCorreo/icono_in.png"></a>';
    $mensaje .= '</td></tr>';
    $mensaje .= '<tr><td>&nbsp;</td></tr>';
    $mensaje .= '</table>';
    $mensaje .= '</center>';
    $mensaje .= '</body></html>';

        
    try {
        //Configuración envío correo
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        // $mail->SMTPDebug = 1; 
        $mail->Host = '172.30.0.98';
        $mail->Port = 25;
        $mail->IsHTML(true);
        // $mail->CharSet = 'UTF-8';        
        // $mail->Encoding = 'base64';
        $mail->SetFrom('webmaster@paz.pe', 'Paz Inmobiliaria');

        // Ignorar certificado SSL
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        $mail->addAddress($email);
        $mail->addBCC('desarrollopaz@inventa.cl');
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensaje;
        //Enviar
        $mail->send();
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error al enviar correo al cliente",
            "errorInfo" => $mail->ErrorInfo,
            "exception" => $e->getMessage()
        ]);
        exit;
    }

    echo json_encode(["success" => true, "message" => "Lead generado exitosamente en crm"]);
    exit;
}
