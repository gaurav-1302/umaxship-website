<?php

// If form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['yourName'];
    $email = $_POST['yourEmail'];
    $phone = $_POST['yourPhone'];
    $text = $_POST['yourMessage'];
    $subject = $_POST['yourSubject'];
    $subject2 = $_POST['yourSubject2'];

    // Email content
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message: $text\n";

    // Send email
    $to = "info@umaxship.com";
    $subject = "Website Contact Form - $name";
    $headers = "From: $email";

    if ($subject2 !== "subject") {
        echo "Bot filled";
        return;
    }

    if (mail($to, $subject, $body, $headers)) {
        echo "success"; // Clear form after successful submission
    } else {
        echo "error"; // Show error message
    }

}

?>