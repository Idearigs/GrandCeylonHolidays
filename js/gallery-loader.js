/**
 * Gallery Loader - Dynamically loads images from the img/cglimg folder
 */
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('dynamic-gallery');
    const imageFolder = 'img/cglimg/';
    
    // List of common image extensions to check
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF'];
    
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
            const path = imageFolder + filename;
            const title = filename.split('.')[0].replace(/_/g, ' ');
            images.push({
                path: path,
                filename: filename,
                title: title
            });
        }
        
        // Comprehensive list of all images in the folder
        // This ensures we include all 219 images
        const allImages = [
            // Date-based filenames
            '20181102_103640.jpg',
            '20181102_120107.jpg',
            '20181129_070403.jpg',
            '20230727_121854(1).jpeg',
            '20230727_121854.jpeg',
            '20230727_190627.jpeg',
            '20230728_125355.jpeg',
            '20230728_190525.jpeg',
            '20230730_121012.jpeg',
            '20230803_180054.jpeg',
            '20230930_105501.jpeg',
            '20230930_121808.jpeg',
            '20231023_104415.jpeg',
            '20231109_102126.jpeg',
            '20231109_104427.jpeg',
            '20231125_174817.jpeg',
            '20231129_060518.jpeg',
            '20231129_075815.jpeg',
            '20240104_120026.jpeg',
            '20240104_132725.jpeg',
            '20240104_132731(1).jpeg',
            '20240104_132814.jpeg',
            '20240104_155424(1).jpeg',
            '20240104_155424.jpeg',
            '20240109_102230(1).jpeg',
            '20240109_102230.jpeg',
            '20240109_102318(1).jpeg',
            '20240109_102318.jpeg',
            '20240109_102527(1).jpeg',
            '20240109_102527.jpeg',
            '20240118_112640(1).jpeg',
            '20240227_122257.jpeg',
            '20240301_144012(1).jpeg',
            '20240301_144012.jpeg',
            '20240301_144309(1).jpeg',
            '20240301_151010.jpeg',
            
            // DSC format images
            'DSC_0001.JPG',
            'DSC_0011(1).JPG',
            'DSC_0028(1).JPG',
            'DSC_0033 (2).JPG',
            'DSC_0033(1).JPG',
            'DSC_0033.JPG',
            'DSC_0039.JPG',
            'DSC_0042(1).JPG',
            'DSC_0042.JPG',
            'DSC_0045.JPG',
            'DSC_0046.JPG',
            'DSC_0052.JPG',
            'DSC_0099(1).JPG',
            'DSC_0101.JPG'
        ];
        
        // Add all the known images
        allImages.forEach(img => addImage(img));
        
        // Add DSC_XXXX.JPG pattern images (from 0001 to 0200)
        for (let i = 1; i <= 200; i++) {
            const paddedNum = i.toString().padStart(4, '0');
            const filename = `DSC_${paddedNum}.JPG`;
            // Skip if already in the list
            if (!allImages.includes(filename)) {
                addImage(filename);
            }
        }
        
        // Clear the gallery container
        galleryContainer.innerHTML = '';
        
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
    }
    
    // Load the gallery
    loadGalleryImages();
});
