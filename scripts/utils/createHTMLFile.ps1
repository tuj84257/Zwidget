$widgetName = $args[0]
$widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($widgetName) -Replace ' ', ''
$firstCharacter = $widgetNameTitleCased.Substring(0, 1)
$firstCharacterLowerCase = $firstCharacter.ToLower()
$widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
$outputPath = ".\scripts\output\" + $widgetNameCamelCased + ".html"
Copy-Item ".\scripts\templates\template.html" -Destination $outputPath
$templateHTMLContent = Get-Content -Path $outputPath -Raw
$templateHTMLUpdatedContent = $templateHTMLContent -Replace '##widgetName##', $widgetName -Replace '##cssOrJsFile##', $widgetNameCamelCased
Set-Content -Path $outputPath -Value $templateHTMLUpdatedContent
