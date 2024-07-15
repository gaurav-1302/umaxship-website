// script.js

//document.getElementById('trackButton').addEventListener('click', function() {
    function tracker() {
        const orderId = document.getElementById('orderId').value;
        const awbId = document.getElementById('awbId').value;

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

        // Simulate an API call to fetch tracking information
        setTimeout(() => {
            // Hide loading indicator
            document.getElementById('loadingIndicator').classList.add('d-none');

            // Example response (replace with actual API call)
            const response = {
                status: 'true',
            };

            if (response.status === 'true') {
                const trackingInfoDiv = document.getElementById('trackingInfo');
                trackingInfoDiv.innerHTML = `
                    <p>[tracking data via api or database]</p>
                `;
                trackingInfoDiv.classList.remove('d-none');
            } else {
                document.getElementById('errorMessage').textContent = "Error: Invalid ID or tracking information not available.";
                document.getElementById('errorMessage').classList.remove('d-none');
            }
        }, 2000); // Simulate network delay
    }
