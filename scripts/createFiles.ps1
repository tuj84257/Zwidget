# Example: createFiles.ps1 'My Widget' '200' '400'

# Get the script's argument (the widget's name)
$widgetName = $args[0]
$widgetWidth = $args[1]
$widgetHeight = $args[2]

# Create the necessary subdirectories in the `src` directory
$widgetDirectory = $widgetName.ToLower() -replace "\s+", "-"
$null = New-Item -Path $(".\src\" + $widgetDirectory) -ItemType Directory
$null = New-Item -Path $(".\src\" + $widgetDirectory + "\backend") -ItemType Directory
$null = New-Item -Path $(".\src\" + $widgetDirectory + "\frontend") -ItemType Directory
$null = New-Item -Path $(".\src\" + $widgetDirectory + "\frontend\css") -ItemType Directory
$null = New-Item -Path $(".\src\" + $widgetDirectory + "\frontend\javascript") -ItemType Directory
$null = New-Item -Path $(".\src\" + $widgetDirectory + "\preload") -ItemType Directory

# Create the widget files
.\scripts\utils\createCSSFile.ps1 $widgetDirectory
.\scripts\utils\createHTMLFile.ps1 $widgetDirectory
.\scripts\utils\createPreloadFile.ps1 $widgetName $widgetDirectory
.\scripts\utils\createBackendFile.ps1 $widgetName $widgetDirectory
.\scripts\utils\createRendererFile.ps1 $widgetName $widgetDirectory

# Create the widget object
.\scripts\utils\addWidget.ps1 $widgetName $widgetDirectory $widgetWidth $widgetHeight
