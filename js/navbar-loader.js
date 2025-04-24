document.addEventListener("DOMContentLoaded", function() {
    // Function to load the navbar
    function loadNavbar() {
        fetch('/components/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Insert the navbar HTML into the navbar-container element
                document.getElementById('navbar-container').innerHTML = data;
                
                // Re-initialize any Bootstrap components if needed
                // This ensures dropdown functionality works after dynamic loading
                if (typeof bootstrap !== 'undefined') {
                    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
                    dropdownElementList.map(function (dropdownToggleEl) {
                        return new bootstrap.Dropdown(dropdownToggleEl);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading the navbar:', error);
            });
    }

    // Load the navbar
    loadNavbar();
});
