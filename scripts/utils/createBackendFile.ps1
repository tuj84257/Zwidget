$widgetName = $args[0]
$widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($widgetName) -Replace ' ', ''
$firstCharacter = $widgetNameTitleCased.Substring(0, 1)
$firstCharacterLowerCase = $firstCharacter.ToLower()
$widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
$outputPath = ".\scripts\output\backend\" + $widgetNameCamelCased + ".js"
Copy-Item ".\scripts\templates\backend.js" -Destination $outputPath
$templateBackendContent = Get-Content -Path $outputPath -Raw
$templateBackendUpdatedContent = $templateBackendContent -Replace '##widgetName##', $widgetName -Replace '##widgetNameCamelCase##', $widgetNameCamelCased
Set-Content -Path $outputPath -Value $templateBackendUpdatedContent
