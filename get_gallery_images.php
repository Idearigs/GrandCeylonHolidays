<?php
header('Content-Type: application/json');

// Directory containing images
$imageDir = 'img/cglimg/';

// Get all image files with specific extensions
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];
$images = [];

if (is_dir($imageDir)) {
    $files = scandir($imageDir);
    
    foreach ($files as $file) {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        if (in_array($extension, $allowedExtensions) && !is_dir($imageDir . $file)) {
            $images[] = [
                'path' => $imageDir . $file,
                'filename' => $file,
                'title' => pathinfo($file, PATHINFO_FILENAME) // Use filename without extension as title
            ];
        }
    }
}

// Return the images as JSON
echo json_encode($images);
?>
