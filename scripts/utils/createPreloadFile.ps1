$widgetName = $args[0]
$widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($widgetName) -Replace ' ', ''
$firstCharacter = $widgetNameTitleCased.Substring(0, 1)
$firstCharacterLowerCase = $firstCharacter.ToLower()
$widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
$outputPath = ".\scripts\output\preload\" + $widgetNameCamelCased + ".js"
Copy-Item ".\scripts\templates\preload.js" -Destination $outputPath
$templatePreloadContent = Get-Content -Path $outputPath -Raw
$templatePreloadUpdatedContent = $templatePreloadContent -Replace '##widgetName##', $widgetName -Replace '##widgetNameCamelCase##', $widgetNameCamelCased
Set-Content -Path $outputPath -Value $templatePreloadUpdatedContent
