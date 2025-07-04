/**
 * Gallery Loader - Dynamically loads images from the organized img/cglimg/client_images folder
 * Works with the new structure created by the image_organizer.py script
 */
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('dynamic-gallery');
    const baseFolder = 'img/cglimg/client_images/';
    
    // Image type folders created by the organizer script
    const imageFolders = {
        jpg: baseFolder + 'jpg/',
        jpeg: baseFolder + 'jpeg/',
        gif: baseFolder + 'gif/'
    };
    
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
        
        // Get all image files from the cglimg folder
        const images = [];
        
        // Function to add an image to our collection
        function addImage(filename) {
            const path = 'img/cglimg/client_images/jpg/' + filename;
            // Extract just the number for the title
            const title = 'Image ' + filename.split('.')[0];
            images.push({
                path: path,
                filename: filename,
                title: title
            });
        }
        
        // Function to load all images from the jpg and jpeg folders
        function loadBackupImages() {
            // Load JPG images (1.jpg to 151.jpg)
            for (let i = 1; i <= 151; i++) {
                const filename = i + '.jpg';
                addImage(filename);
            }
            
            // Load JPEG images from the jpeg folder (303.jpeg through 329.jpeg)
            for (let i = 303; i <= 329; i++) {
                const filename = i + '.jpeg';
                // Special case for jpeg files - they're in a different folder
                const path = 'img/cglimg/client_images/jpeg/' + filename;
                const title = 'Image ' + i;
                images.push({
                    path: path,
                    filename: filename,
                    title: title
                });
            }
            
            // Process images after a short delay
            setTimeout(processImages, 300);
        }
        
        // Load images from the backup folder
        loadBackupImages();
        
        // This function is no longer needed as we're using the backup folder directly
        
        // Function to process all images
        function processImages() {
            // Clear the gallery container
            galleryContainer.innerHTML = '';
            
            // If no images were found yet, show a message
            if (images.length === 0) {
                galleryContainer.innerHTML = '<div class="col-md-12 text-center"><p>Loading gallery images...</p></div>';
                // Check again in a second - some images might still be loading
                setTimeout(() => {
                    if (images.length === 0) {
                        galleryContainer.innerHTML = '<div class="col-md-12 text-center"><p>No images found in the gallery folder.</p></div>';
                    } else {
                        processImages(); // Try again with the images we found
                    }
                }, 1000);
                return;
            }
            
            // Create gallery items for each image
            let validImageCount = 0;
            let processedCount = 0;
            
            // Process each image
            images.forEach((image, index) => {
                // Create a new image element to check if the image exists
                const img = new Image();
            
            // Track processed images
            img.onload = function() {
                validImageCount++;
                processedCount++;
                
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
                
                // Create image element
                const imgElement = document.createElement('img');
                imgElement.src = image.path;
                imgElement.alt = title;
                imgElement.title = title; // For tooltip on hover
                imgElement.style.objectFit = 'cover';
                
                // Create link for Magnific Popup
                const link = document.createElement('a');
                link.href = image.path;
                link.title = title;
                link.className = 'img-zoom';
                
                // Assemble the gallery item
                galleryImg.appendChild(imgElement);
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
                
                // Check if all images have been processed
                if (processedCount === images.length && validImageCount === 0) {
                    galleryContainer.innerHTML = '<div class="col-md-12 text-center"><p>No images found in the gallery folder.</p></div>';
                }
            };
            
            img.onerror = function() {
                // Image doesn't exist or couldn't be loaded, skip it
                processedCount++;
                
                // Check if all images have been processed
                if (processedCount === images.length && validImageCount === 0) {
                    galleryContainer.innerHTML = '<div class="col-md-12 text-center"><p>No images found in the gallery folder.</p></div>';
                }
            };
            
            // Start loading the image to check if it exists
            img.src = image.path;
            });
            
            // If we have very few images, try to find more after a delay
            if (images.length < 10) {
                setTimeout(generateImageList, 500);
            }
        }
    }
    
    // Load the gallery
    loadGalleryImages();
});
