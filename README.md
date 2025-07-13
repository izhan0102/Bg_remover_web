# Iezyverse Background Remover

A free background removal tool with no login or credit card required.

## Features

- Fast background removal powered by Python and rembg
- No login required
- Mobile-friendly design
- Simple, intuitive interface
- Background replacement options (solid colors or images)
- SEO optimized

## Installation

### Option 1: Quick Setup (Recommended)

1. Run the installation script:
   ```
   install_dependencies.bat
   ```

2. Run the server:
   ```
   start_server.bat
   ```

3. Open your browser and go to:
   ```
   http://127.0.0.1:8000/
   ```

### Option 2: Python 3.10 Virtual Environment (For compatibility issues)

If you encounter issues with Python 3.13, use Python 3.10 instead:

1. Install Python 3.10 from the [official website](https://www.python.org/downloads/release/python-31011/)

2. Set up the virtual environment:
   ```
   setup_python310.bat
   ```

3. Run the server with the virtual environment:
   ```
   start_venv_server.bat
   ```

### Option 3: Simple Server (No Background Removal)

If you just want to view the website without the background removal functionality:

1. Run the simple server:
   ```
   start_simple_server.bat
   ```

## How the Background Removal Works

1. User uploads an image through the web interface
2. The image is sent to the Python backend
3. The rembg library processes the image to remove the background
4. The processed image is sent back to the frontend
5. User can view and download the image with transparent background
6. Optional: User can replace the background with a solid color or another image

## Troubleshooting

If you encounter issues with the background removal functionality:

1. Check the [Python Compatibility Guide](PYTHON_COMPATIBILITY.md)
2. Make sure you have the required dependencies installed
3. Try using Python 3.10 instead of newer versions

## Git Setup

To set up this project with Git:

1. Initialize a Git repository:
   ```
   git init
   ```

2. Add all files:
   ```
   git add .
   ```

3. Make your first commit:
   ```
   git commit -m "Initial commit"
   ```

4. Add a remote repository (replace with your own repository URL):
   ```
   git remote add origin https://github.com/yourusername/bg-remover-web.git
   ```

5. Push to the remote repository:
   ```
   git push -u origin master
   ```

## Created By

Developed by Izhan, an 18-year-old first-year engineering student from Jammu Kashmir.

## Support This Project

If you find this tool useful, consider [supporting the project](https://buymeacoffee.com/iezyverse). 