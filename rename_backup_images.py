import os
import shutil
from pathlib import Path

def rename_images_sequentially(source_dir):
    """
    Rename all images in the source directory sequentially from 1.jpg, 2.jpg, etc.
    """
    source_path = Path(source_dir)
    
    # Make sure the directory exists
    if not source_path.exists():
        print(f"Error: Directory {source_dir} does not exist.")
        return
    
    # Get all image files
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(list(source_path.glob(f'*{ext}')))
    
    if not image_files:
        print(f"No image files found in {source_dir}")
        return
    
    print(f"Found {len(image_files)} images. Starting renaming process...")
    
    # Sort files to ensure consistent ordering
    image_files.sort()
    
    # Rename files sequentially
    for i, img_file in enumerate(image_files, 1):
        # Get the file extension
        ext = img_file.suffix.lower()
        
        # Create the new filename
        new_name = source_path / f"{i}{ext}"
        
        # If the new filename already exists, skip it
        if new_name.exists() and new_name != img_file:
            print(f"Skipping {img_file.name} as {new_name.name} already exists")
            continue
        
        # Rename the file
        try:
            img_file.rename(new_name)
            print(f"Renamed {img_file.name} to {new_name.name}")
        except Exception as e:
            print(f"Error renaming {img_file.name}: {e}")
    
    print("Renaming complete!")

if __name__ == "__main__":
    # Path to the backup folder
    backup_folder = r"img/cglimg/client_images/backup"
    
    # Print information and proceed automatically
    print(f"Renaming all images in {backup_folder} sequentially...")
    rename_images_sequentially(backup_folder)
