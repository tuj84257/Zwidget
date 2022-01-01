# Example: `createFiles.ps1 'My Widget'`

# Get the script's argument (the widget's name)
$widgetName = $args[0]

# Create the necessary directories
$null = New-Item -Path '.\scripts\output' -ItemType Directory
$null = New-Item -Path '.\scripts\output\preload' -ItemType Directory
$null = New-Item -Path '.\scripts\output\backend' -ItemType Directory
$null = New-Item -Path '.\scripts\output\renderer' -ItemType Directory

# Create the widget files
.\scripts\utils\createCSSFile.ps1 $widgetName
.\scripts\utils\createHTMLFile.ps1 $widgetName
.\scripts\utils\createPreloadFile.ps1 $widgetName
.\scripts\utils\createBackendFile.ps1 $widgetName
.\scripts\utils\createRendererFile.ps1 $widgetName

# Copy the files from the `output` directory to the respective `src` directories
Copy-Item -Path ".\scripts\output\backend\*" -Destination ".\src\main\widgets-backend"
Copy-Item -Path ".\scripts\output\preload\*" -Destination ".\src\preload"
Copy-Item -Path ".\scripts\output\renderer\*" -Destination ".\src\renderer\javascript"
Copy-Item -Path ".\scripts\output\*.css" -Destination ".\src\renderer\css\input"
Copy-Item -Path ".\scripts\output\*.html" -Destination ".\src\renderer\templates"

# Remove the `output` directory
Remove-Item -Path ".\scripts\output" -Force -Recurse
