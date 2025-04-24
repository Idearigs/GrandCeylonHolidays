<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Collect and sanitize form data
    $name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $contact = filter_var($_POST['contact'] ?? '', FILTER_SANITIZE_STRING);
    $country = filter_var($_POST['country'] ?? '', FILTER_SANITIZE_STRING);
    
    // Validate required fields
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($contact)) {
        $errors[] = "Contact number is required";
    }
    
    if (empty($country)) {
        $errors[] = "Country is required";
    }
    
    // If no errors, proceed with sending email
    if (empty($errors)) {
        
        // Path to PHPMailer
        require 'vendor/autoload.php';
        
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);
        
        try {
            // Server settings
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                 // Enable verbose debug output (set to 0 for production)
            $mail->isSMTP();                                          // Send using SMTP
            $mail->Host       = 'smtp.example.com';                   // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                 // Enable SMTP authentication
            $mail->Username   = 'your-email@example.com';             // SMTP username
            $mail->Password   = 'your-email-password';                // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       // Enable TLS encryption
            $mail->Port       = 587;                                  // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
            
            // Recipients
            $mail->setFrom('your-email@example.com', 'Grand Ceylon Holidays');
            $mail->addAddress('bookings@grandceylonholidays.com');    // Add a recipient
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);                                      // Set email format to HTML
            $mail->Subject = 'New Quick Booking Request from ' . $name;
            
            // Email body
            $mail->Body = "
                <h2>New Quick Booking Request</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Contact Number:</strong> {$contact}</p>
                <p><strong>Country:</strong> {$country}</p>
                <p>This request was submitted on " . date('Y-m-d H:i:s') . "</p>
            ";
            
            $mail->AltBody = "
                New Quick Booking Request\n\n
                Name: {$name}\n
                Email: {$email}\n
                Contact Number: {$contact}\n
                Country: {$country}\n
                Submitted on: " . date('Y-m-d H:i:s') . "
            ";
            
            $mail->send();
            
            // Redirect with success message
            header('Location: index.html?booking=success');
            exit;
            
        } catch (Exception $e) {
            // Log the error (in a production environment)
            error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            
            // Redirect with error message
            header('Location: index.html?booking=error');
            exit;
        }
    } else {
        // Redirect with validation errors
        $errorString = implode(',', $errors);
        header("Location: index.html?booking=validation&errors={$errorString}");
        exit;
    }
} else {
    // If someone tries to access this file directly, redirect to homepage
    header('Location: index.html');
    exit;
}
?>
