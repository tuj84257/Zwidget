$widgetDirectory = $args[0]
$destinationPath = ".\src\" + $widgetDirectory + "\frontend"
Copy-Item -Path ".\scripts\templates\template.html" -Destination $destinationPath
$templateHTMLContent = Get-Content -Path $($destinationPath + "\template.html") -Raw
$templateHTMLUpdatedContent = $templateHTMLContent -Replace '##widgetName##', $widgetName
Set-Content -Path $($destinationPath + "\template.html") -Value $templateHTMLUpdatedContent
