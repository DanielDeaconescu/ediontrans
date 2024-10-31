<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullName = filter_input(INPUT_POST, 'full-name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $booking = filter_input(INPUT_POST, 'booking', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $booking_time = filter_input(INPUT_POST, 'booking-time', FILTER_SANITIZE_STRING);

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
        $mail->Subject = 'EdionTrans - ' . 'Client: ' . $fullName . ' Programare: ' . $booking;
        $mail->Body    = "
            <h3>Informatii Client $fullName</h3>
            <div>
                <p>Nume: <strong>$fullName</strong></p>
            </div>
            <div>
                <p>Număr de telefon: <strong>$phone</strong></p>
            </div>
            <div>
                <p>Data programării: <strong>$booking</strong></p>
            </div>
            <div>
                <p>Ora programării: <strong>$booking_time</strong></p>
            </div>
            <div>
                <p>Adresă de email: <strong>$email</strong></p>
            </div>
            <div>
                <p>Mesaj: 
                <strong>$message</strong></p>
            </div>
            
        ";
        // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        header('Location: submitted.html');
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}