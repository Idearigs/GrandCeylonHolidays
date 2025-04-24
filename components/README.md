# Navbar Component

This folder contains a reusable navbar component that can be included in any page of the Grand Ceylon Holidays website.

## How to Use

There are two ways to include the navbar in your pages:

### Method 1: Using the navbar-loader.js script (Recommended)

1. Add a container div with the ID `navbar-container` where you want the navbar to appear:
   ```html
   <!-- Navbar -->
   <div id="navbar-container"></div>
   ```

2. Include the navbar-loader.js script before the closing `</body>` tag:
   ```html
   <script src="js/navbar-loader.js"></script>
   ```

### Method 2: Using the include-navbar.js script (Simpler)

Simply add this one line where you want the navbar to appear:
```html
<script src="components/include-navbar.js"></script>
```

This will automatically create the container and load the navbar.

## Editing the Navbar

If you need to make changes to the navbar, edit the `components/navbar.html` file. The changes will automatically appear on all pages that include the navbar.

## Troubleshooting

- Make sure the paths to the scripts are correct relative to each HTML page
- If the navbar doesn't appear, check the browser console for errors
- Ensure Bootstrap JS is loaded before the navbar-loader.js script
