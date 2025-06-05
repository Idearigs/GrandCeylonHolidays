document.addEventListener("DOMContentLoaded", function() {
    // Function to load the navbar
    function loadNavbar() {
        // Check if we're in a subfolder by looking at the current path
        const isInSubfolder = window.location.pathname.includes('/culture/') || 
                             window.location.pathname.includes('/excursion-tours/') || 
                             window.location.pathname.includes('/hill-country/') ||
                             window.location.pathname.includes('/romantic/') ||
                             window.location.pathname.includes('/ayurveda-wellness/') ||
                             window.location.pathname.includes('/nature-tours/') ||
                             window.location.pathname.includes('/beach-tours/') ||
                             window.location.pathname.includes('/special-interest-tours/') ||
                             window.location.pathname.includes('/Explore-nature/') ||
                             window.location.pathname.includes('/Heritage-culture/') ||
                             window.location.pathname.includes('/Beaches-&-sunset/') ||
                             window.location.pathname.includes('/Wildlife-adventure/');
        
        const navbarPath = isInSubfolder ? '../components/navbar.html' : '/components/navbar.html';
        
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Insert the navbar HTML into the navbar-container element
                document.getElementById('navbar-container').innerHTML = data;
                
                // If we're in a subfolder, adjust the links in the navbar
                if (isInSubfolder) {
                    // Get all links in the navbar
                    const navLinks = document.querySelectorAll('#navbar-container a');
                    
                    // Modify each link that doesn't already have a path starting with '../'
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href && !href.startsWith('../') && !href.startsWith('http') && !href.startsWith('#')) {
                            // Add '../' to the beginning of the href
                            link.setAttribute('href', '../' + href);
                        }
                    });
                }
                
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
