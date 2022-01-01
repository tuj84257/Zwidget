$widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($args[0]) -Replace ' ', ''
$firstCharacter = $widgetNameTitleCased.Substring(0, 1)
$firstCharacterLowerCase = $firstCharacter.ToLower()
$widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
$outputPath = ".\scripts\output\" + $widgetNameCamelCased + ".css"
Copy-Item -Path ".\scripts\templates\template.css" -Destination $outputPath
