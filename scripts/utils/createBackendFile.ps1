. .\scripts\utils\utils.ps1

$widgetName = $args[0]
$widgetDirectory = $args[1]
$widgetNameCamelCased = Get-CamelCasedName $widgetName
$destinationPath = ".\src\" + $widgetDirectory + "\backend"
Copy-Item ".\scripts\templates\backend.js" -Destination $destinationPath
$templateBackendContent = Get-Content -Path $($destinationPath + "\backend.js") -Raw
$templateBackendUpdatedContent = $templateBackendContent -Replace '##widgetName##', $widgetName -Replace '##widgetNameCamelCase##', $widgetNameCamelCased
Set-Content -Path $($destinationPath + "\backend.js") -Value $templateBackendUpdatedContent
