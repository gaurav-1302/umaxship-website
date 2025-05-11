<?php

// If form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $monthly_orders = $_POST['monthlyOrders'];
    $shipmentType = $_POST['shipmentType'];
    $monthlyLoad = $_POST['monthlyLoad'];
    $subject2 = $_POST['subject'];

    // Email content
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Monthly Orders: $monthly_orders\n";
    $body .= "Shipment Type: $shipmentType\n";
    $body .= "Monthly Load: $monthlyLoad\n";

    // Send email
    $to = "info@umaxship.com";
    $subject = "Website Quote Form - $name";
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