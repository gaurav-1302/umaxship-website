// script.js

//document.getElementById('trackButton').addEventListener('click', function() {

function tracker() {
    const orderId = document.getElementById('orderId').value.trim();
    const awbId = document.getElementById('awbId').value.trim();

    // Hide previous messages
    document.getElementById('errorMessage').classList.add('d-none');
    document.getElementById('trackingInfo').classList.add('d-none');

    if (!orderId && !awbId) {
        document.getElementById('errorMessage').textContent = "ERROR :: Please enter either Order ID or AWB ID.";
        document.getElementById('errorMessage').classList.remove('d-none');
        return;
    }

    // Show loading indicator
    document.getElementById('loadingIndicator').classList.remove('d-none');

    // Construct the function URL with query parameters
    const functionUrl = 'https://trackweborder-vjij5onvgq-uc.a.run.app'; // Replace with your function URL
    const urlParams = new URLSearchParams({ orderId, awbId });
    fetch(`${functionUrl}?${urlParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            // Hide loading indicator
            document.getElementById('loadingIndicator').classList.add('d-none');

            console.log(data);

            if (data.status === 'success') {
                const trackingInfoDiv = document.getElementById('trackingInfo');
                trackingInfoDiv.innerHTML = `
                <p>Order Status: ${data.order.current_status}</p>
                <p>AWB ID: ${data.order.awb_id}</p>
                <!-- Add more order details as needed -->
              `;
                trackingInfoDiv.classList.remove('d-none');
            } else {
                document.getElementById('errorMessage').textContent = "Error: Invalid ID or tracking information not available.";
                document.getElementById('errorMessage').classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error fetching tracking info:', error);
            document.getElementById('loadingIndicator').classList.add('d-none');
            document.getElementById('errorMessage').textContent = "Error: Could not retrieve tracking information.";
            document.getElementById('errorMessage').classList.remove('d-none');
        });
}

