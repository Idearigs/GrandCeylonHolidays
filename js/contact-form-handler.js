document.addEventListener("DOMContentLoaded", function() {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Check for contact status in URL
    var contactStatus = getUrlParameter('contact');
    var errorMessages = getUrlParameter('errors');
    
    // If there's a contact status parameter
    if (contactStatus) {
        var messageContainer = document.createElement('div');
        messageContainer.className = 'contact-message';
        
        // Style the message container
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '20px';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translateX(-50%)';
        messageContainer.style.padding = '15px 25px';
        messageContainer.style.borderRadius = '5px';
        messageContainer.style.zIndex = '9999';
        messageContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        messageContainer.style.fontWeight = '500';
        
        // Set message based on status
        if (contactStatus === 'success') {
            messageContainer.style.backgroundColor = '#d4edda';
            messageContainer.style.color = '#155724';
            messageContainer.style.border = '1px solid #c3e6cb';
            messageContainer.innerHTML = '<i class="ti-check"></i> Your message has been sent successfully! We will contact you soon.';
        } else if (contactStatus === 'error') {
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
            messageContainer.style.border = '1px solid #f5c6cb';
            messageContainer.innerHTML = '<i class="ti-alert"></i> There was a problem sending your message. Please try again later.';
        } else if (contactStatus === 'validation') {
            messageContainer.style.backgroundColor = '#fff3cd';
            messageContainer.style.color = '#856404';
            messageContainer.style.border = '1px solid #ffeeba';
            
            // Format validation errors
            var errorList = errorMessages.split(',');
            var errorHtml = '<i class="ti-alert"></i> Please fix the following errors:<ul style="margin-top: 5px; margin-bottom: 0; padding-left: 20px;">';
            
            errorList.forEach(function(error) {
                errorHtml += '<li>' + error + '</li>';
            });
            
            errorHtml += '</ul>';
            messageContainer.innerHTML = errorHtml;
        }
        
        // Add close button
        var closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.style.marginLeft = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.float = 'right';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.fontSize = '20px';
        closeButton.style.lineHeight = '1';
        
        closeButton.onclick = function() {
            document.body.removeChild(messageContainer);
            
            // Remove the parameters from URL
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path: newUrl}, '', newUrl);
        };
        
        messageContainer.appendChild(closeButton);
        
        // Add to body
        document.body.appendChild(messageContainer);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            if (document.body.contains(messageContainer)) {
                document.body.removeChild(messageContainer);
                
                // Remove the parameters from URL
                var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path: newUrl}, '', newUrl);
            }
        }, 5000);
    }
});
