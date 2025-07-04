/**
 * Gallery Loader - Dynamically loads images from the backup folder
 */
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('dynamic-gallery');
    const backupFolder = 'img/cglimg/client_images/backup/';
    
    // Function to load all gallery images
    function loadGalleryImages() {
        // Show loading state initially
        galleryContainer.innerHTML = `
            <div class="col-md-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Loading gallery images...</p>
            </div>
        `;
        
        // Array to store all images
        const images = [];
        
        // Function to add an image to our collection
        function addImage(filename) {
            const path = backupFolder + filename;
            // Extract just the number for the title
            const title = 'Image ' + filename.split('.')[0];
            images.push({
                path: path,
                filename: filename,
                title: title
            });
        }
        
        // Function to load all images from the backup folder
        function loadBackupImages() {
            // Add both jpg and jpeg files directly
            // First add all jpg files
            for (let i = 1; i <= 302; i++) {
                addImage(i + '.jpg');
            }
            
            // Then add all jpeg files
            for (let i = 1; i <= 54; i++) { // Assuming there are 54 jpeg files (356-302)
                addImage((i + 302) + '.jpeg');
            }
            
            // Process images after a short delay
            setTimeout(processImages, 300);
        }
        
        // Load images from the backup folder
        loadBackupImages();
        
        // Function to process all images
        function processImages() {
            // Clear the gallery container
            galleryContainer.innerHTML = '';
            
            // If no images were found, show a message
            if (images.length === 0) {
                galleryContainer.innerHTML = '<div class="col-md-12 text-center"><p>No images found in the gallery folder.</p></div>';
                return;
            }
            
            console.log('Processing ' + images.length + ' images');
            
            // Track loaded and error counts
            let loadedCount = 0;
            let errorCount = 0;
            
            // Process each image
            images.forEach((image, index) => {
                // Create a new image element to check if the image exists
                const img = new Image();
                
                // Handle successful image load
                img.onload = function() {
                    loadedCount++;
                    console.log('Loaded: ' + image.path);
                    
                    // Create a title from the filename
                    let title = image.title;
                    title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize first letter
                    
                    // Use consistent 4-column grid layout with minimal spacing
                    const colClass = 'col-lg-3 col-md-4 col-sm-6 col-6 mb-1 p-1';
                    
                    // Create gallery item HTML
                    const galleryItem = document.createElement('div');
                    galleryItem.className = colClass;
                    
                    // Create gallery box
                    const galleryBox = document.createElement('div');
                    galleryBox.className = 'gallery-box';
                    galleryBox.style.height = '100%';
                    
                    // Create image container
                    const galleryImg = document.createElement('div');
                    galleryImg.className = 'gallery-img';
                    
                    // Create link for Magnific Popup
                    const link = document.createElement('a');
                    link.href = image.path;
                    link.title = title;
                    link.className = 'img-zoom';
                    
                    // Assemble the gallery item
                    galleryImg.appendChild(img);
                    galleryBox.appendChild(galleryImg);
                    link.appendChild(galleryBox);
                    galleryItem.appendChild(link);
                    
                    // Add to gallery container
                    galleryContainer.appendChild(galleryItem);
                    
                    // Initialize Magnific Popup for this image
                    $(galleryItem).find('.img-zoom').magnificPopup({
                        type: 'image',
                        closeOnContentClick: true,
                        mainClass: 'mfp-img-mobile',
                        image: {
                            verticalFit: true
                        }
                    });
                    
                    // Log completion when all images are processed
                    if (loadedCount + errorCount === images.length) {
                        console.log(`Gallery loaded with ${loadedCount} images. ${errorCount} images failed to load.`);
                    }
                };
                
                // Handle image load error
                img.onerror = function() {
                    errorCount++;
                    console.log('Failed to load: ' + image.path);
                    
                    // Log completion when all images are processed
                    if (loadedCount + errorCount === images.length) {
                        console.log(`Gallery loaded with ${loadedCount} images. ${errorCount} images failed to load.`);
                    }
                };
                
                // Set image attributes and start loading
                img.src = image.path;
                img.alt = image.title;
                img.className = 'img-fluid';
            });
        }
    }
    
    // Load the gallery
    loadGalleryImages();
});
