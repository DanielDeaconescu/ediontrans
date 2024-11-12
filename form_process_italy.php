<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $departure_date = filter_input(INPUT_POST, 'departure-date', FILTER_SANITIZE_STRING);
    $departure_place = filter_input(INPUT_POST, 'departure-place', FILTER_SANITIZE_STRING);
    $arrival_place = filter_input(INPUT_POST, 'arrival-place', FILTER_SANITIZE_STRING);

    try {
        $mail->isSMTP();                                            
        $mail->Host       = 'mail.danieldeaconescu.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@danieldeaconescu.com';
        $mail->Password   = 'contactPassword!23';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465; 
    
        //Recipients
        $mail->setFrom('contact@danieldeaconescu.com', "EdionTrans");
        $mail->addAddress('daniel.deaconescu98@gmail.com', "$name");
        $mail->CharSet = 'UTF-8';

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'EdionTrans - ' . 'Client: ' . $name . ' Programare: ' . $departure_date;
        $mail->Body    = "
            <h3>Informatii Client $name</h3>
            <div>
                <p>Nume: <strong>$name</strong></p>
            </div>
            <div>
                <p>Număr de telefon: <strong>$phone</strong></p>
            </div>
            <div>
                <p>Data programării: <strong>$departure_date</strong></p>
            </div>
            <div>
                <p>Punctul de plecare: <strong>$departure_place</strong></p>
            </div>
            <div>
                <p>Punctul de sosire: <strong>$arrival_place</strong></p>
            </div>
        ";
        // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        header('Location: submitted_italy.html');
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}