<?php
/**
 * Directory Image Scanner
 * This script scans a directory for image files and returns them as a JSON array
 */

// Set appropriate headers for JSON response
header('Content-Type: application/json');

// Get the folder parameter from the request
$folder = isset($_GET['folder']) ? $_GET['folder'] : 'img/cglimg/client_images/';

// Validate folder path to prevent directory traversal attacks
$folder = str_replace('..', '', $folder);
$folder = rtrim($folder, '/') . '/';

// Full server path to the directory
$fullPath = $_SERVER['DOCUMENT_ROOT'] . '/' . $folder;

// Response array
$response = [
    'success' => false,
    'images' => [],
    'message' => ''
];

// Check if directory exists
if (!is_dir($fullPath)) {
    $response['message'] = 'Directory not found: ' . $folder;
    echo json_encode($response);
    exit;
}

try {
    // Get all files in the directory
    $files = scandir($fullPath);
    
    // Valid image extensions
    $validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];
    
    // Filter for image files only
    foreach ($files as $file) {
        // Skip . and .. directories
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        // Get file extension
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        
        // Check if it's an image file
        if (in_array($extension, $validExtensions)) {
            $response['images'][] = $file;
        }
    }
    
    // Sort the images alphabetically
    sort($response['images']);
    
    // Set success flag
    $response['success'] = true;
    $response['message'] = count($response['images']) . ' images found';
    
} catch (Exception $e) {
    $response['message'] = 'Error scanning directory: ' . $e->getMessage();
}

// Return JSON response
echo json_encode($response);
