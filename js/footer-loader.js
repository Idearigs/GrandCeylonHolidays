document.addEventListener("DOMContentLoaded", function() {
    // Function to load the footer
    function loadFooter() {
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
        
        const footerPath = isInSubfolder ? '../components/footer.html' : '/components/footer.html';
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Insert the footer HTML into the footer-container element
                document.getElementById('footer-container').innerHTML = data;
                
                // If we're in a subfolder, adjust the links in the footer
                if (isInSubfolder) {
                    // Get all links in the footer
                    const footerLinks = document.querySelectorAll('#footer-container a');
                    
                    // Modify each link that doesn't already have a path starting with '../'
                    footerLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href && !href.startsWith('../') && !href.startsWith('http') && !href.startsWith('#')) {
                            // Add '../' to the beginning of the href
                            link.setAttribute('href', '../' + href);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error loading the footer:', error);
            });
    }

    // Load the footer
    loadFooter();
});
