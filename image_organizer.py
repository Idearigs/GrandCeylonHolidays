#!/usr/bin/env python3
"""
Image Organizer Script

This script:
1. Renames all images in a directory sequentially (1.jpg, 2.jpg, etc.)
2. Organizes images by file type into subdirectories
"""

import os
import shutil
from pathlib import Path
import argparse

def organize_images(source_dir, organize_by_type=True, rename_files=True):
    """
    Organize images in the specified directory.
    
    Args:
        source_dir (str): Path to the directory containing images
        organize_by_type (bool): Whether to organize images by file type
        rename_files (bool): Whether to rename files sequentially
    """
    # Ensure source directory exists
    source_path = Path(source_dir)
    if not source_path.exists() or not source_path.is_dir():
        print(f"Error: Source directory '{source_dir}' does not exist.")
        return False
    
    # Get all image files
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(list(source_path.glob(f'*{ext}')))
    
    if not image_files:
        print(f"No image files found in '{source_dir}'.")
        return False
    
    print(f"Found {len(image_files)} image files.")
    
    # Create a backup directory
    backup_dir = source_path / 'backup'
    if not backup_dir.exists():
        backup_dir.mkdir()
        print(f"Created backup directory: {backup_dir}")
    
    # First, create a backup of all files
    for img_file in image_files:
        backup_file = backup_dir / img_file.name
        shutil.copy2(img_file, backup_file)
    
    print(f"Backed up {len(image_files)} files to {backup_dir}")
    
    # Group files by extension
    files_by_ext = {}
    for img_file in image_files:
        ext = img_file.suffix.lower()
        if ext not in files_by_ext:
            files_by_ext[ext] = []
        files_by_ext[ext].append(img_file)
    
    # Process files by extension
    counter = 1
    processed_files = []
    
    for ext, files in files_by_ext.items():
        # Create type directory if organizing by type
        type_dir = source_path
        if organize_by_type:
            type_dir = source_path / ext[1:]  # Remove the dot from extension
            if not type_dir.exists():
                type_dir.mkdir()
                print(f"Created directory for {ext} files: {type_dir}")
        
        # Process each file
        for img_file in files:
            if rename_files:
                # Create new filename with sequential number
                new_name = f"{counter}{ext}"
                new_path = type_dir / new_name
                counter += 1
            else:
                # Keep original name but move to type directory
                new_path = type_dir / img_file.name
            
            # Move/rename the file
            try:
                # If the file is already in the right place with the right name, skip it
                if img_file == new_path:
                    print(f"Skipping {img_file.name} (already in place)")
                    continue
                
                # If the destination file already exists, find a new name
                if new_path.exists():
                    base_name = new_path.stem
                    i = 1
                    while new_path.exists():
                        new_path = type_dir / f"{base_name}_{i}{ext}"
                        i += 1
                
                # Move the file
                shutil.move(img_file, new_path)
                processed_files.append((img_file, new_path))
                print(f"Renamed/moved: {img_file.name} -> {new_path.name}")
            except Exception as e:
                print(f"Error processing {img_file.name}: {e}")
    
    print(f"\nSummary:")
    print(f"- Total files processed: {len(processed_files)}")
    print(f"- Files organized by type: {organize_by_type}")
    print(f"- Files renamed sequentially: {rename_files}")
    
    if organize_by_type:
        print("\nOrganized into directories:")
        for ext in files_by_ext.keys():
            print(f"- {ext[1:]}: {len(files_by_ext[ext])} files")
    
    print("\nNOTE: A backup of all original files was created in the 'backup' directory.")
    print("If you need to restore the original files, you can copy them back from there.")
    
    return True

def main():
    parser = argparse.ArgumentParser(description='Organize and rename image files.')
    parser.add_argument('source_dir', help='Directory containing images to organize')
    parser.add_argument('--no-organize', action='store_false', dest='organize',
                        help='Do not organize files by type')
    parser.add_argument('--no-rename', action='store_false', dest='rename',
                        help='Do not rename files sequentially')
    
    args = parser.parse_args()
    
    organize_images(args.source_dir, args.organize, args.rename)

if __name__ == "__main__":
    main()
