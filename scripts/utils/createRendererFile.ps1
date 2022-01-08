. .\scripts\utils\utils.ps1

$widgetName = $args[0]
$widgetDirectory = $args[1]
$widgetNameCamelCased = Get-CamelCasedName $widgetName
$destinationPath = ".\src\" + $widgetDirectory + "\frontend\javascript"
Copy-Item ".\scripts\templates\renderer.js" -Destination $destinationPath
$templateRendererContent = Get-Content -Path $($destinationPath + "\renderer.js") -Raw
$templateRendererUpdatedContent = $templateRendererContent -Replace '##widgetName##', $widgetName -Replace '##widgetNameCamelCase##', $widgetNameCamelCased
Set-Content -Path $($destinationPath + "\renderer.js") -Value $templateRendererUpdatedContent
