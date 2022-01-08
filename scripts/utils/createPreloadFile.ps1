. .\scripts\utils\utils.ps1

$widgetName = $args[0]
$widgetDirectory = $args[1]
$widgetNameCamelCased = Get-CamelCasedName $widgetName
$destinationPath = ".\src\" + $widgetDirectory + "\preload"
Copy-Item ".\scripts\templates\preload.js" -Destination $destinationPath
$templatePreloadContent = Get-Content -Path $($destinationPath + "\preload.js") -Raw
$templatePreloadUpdatedContent = $templatePreloadContent -Replace '##widgetName##', $widgetName -Replace '##widgetNameCamelCase##', $widgetNameCamelCased
Set-Content -Path $($destinationPath + "\preload.js") -Value $templatePreloadUpdatedContent
