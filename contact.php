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
    $phone = filter_var($_POST['phone'] ?? '', FILTER_SANITIZE_STRING);
    $country = filter_var($_POST['country'] ?? '', FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);
    
    // Validate required fields
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    }
    
    if (empty($country)) {
        $errors[] = "Country is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
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
            $mail->addAddress('info@grandceylonholidays.com');        // Add a recipient
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);                                      // Set email format to HTML
            $mail->Subject = 'New Contact Inquiry from ' . $name;
            
            // Create a beautiful HTML email template
            $emailTemplate = '
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Inquiry</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #1e3799;
                        padding: 20px;
                        text-align: center;
                        color: white;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                    .content {
                        background-color: #f9f9f9;
                        padding: 20px;
                        border-left: 1px solid #ddd;
                        border-right: 1px solid #ddd;
                    }
                    .footer {
                        background-color: #f1f1f1;
                        padding: 15px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                        border: 1px solid #ddd;
                    }
                    h1 {
                        color: #1e3799;
                        margin-top: 0;
                    }
                    .info-item {
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    .info-label {
                        font-weight: bold;
                        color: #1e3799;
                    }
                    .message-box {
                        background-color: white;
                        padding: 15px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        margin-top: 20px;
                    }
                    .date {
                        font-style: italic;
                        color: #888;
                        font-size: 12px;
                        text-align: right;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Grand Ceylon Holidays</h2>
                    </div>
                    <div class="content">
                        <h1>New Contact Inquiry</h1>
                        <p>A new inquiry has been submitted through the contact form on your website.</p>
                        
                        <div class="info-item">
                            <span class="info-label">Name:</span> ' . $name . '
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Email:</span> ' . $email . '
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Phone:</span> ' . $phone . '
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Country:</span> ' . $country . '
                        </div>
                        
                        <div class="message-box">
                            <span class="info-label">Message:</span>
                            <p>' . nl2br($message) . '</p>
                        </div>
                        
                        <div class="date">
                            Submitted on: ' . date('Y-m-d H:i:s') . '
                        </div>
                    </div>
                    <div class="footer">
                        <p>This is an automated email from your website contact form.</p>
                        <p>&copy; ' . date('Y') . ' Grand Ceylon Holidays. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            ';
            
            $mail->Body = $emailTemplate;
            
            // Plain text version for non-HTML mail clients
            $mail->AltBody = "
                New Contact Inquiry\n\n
                Name: {$name}\n
                Email: {$email}\n
                Phone: {$phone}\n
                Country: {$country}\n
                Message: {$message}\n
                Submitted on: " . date('Y-m-d H:i:s') . "
            ";
            
            $mail->send();
            
            // Redirect with success message
            header('Location: contact.html?contact=success');
            exit;
            
        } catch (Exception $e) {
            // Log the error (in a production environment)
            error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            
            // Redirect with error message
            header('Location: contact.html?contact=error');
            exit;
        }
    } else {
        // Redirect with validation errors
        $errorString = implode(',', $errors);
        header("Location: contact.html?contact=validation&errors={$errorString}");
        exit;
    }
} else {
    // If someone tries to access this file directly, redirect to homepage
    header('Location: contact.html');
    exit;
}
?>
