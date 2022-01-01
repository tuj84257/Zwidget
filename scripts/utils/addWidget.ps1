$widgetName = $args[0]
$widgetWidth = $args[1]
$widgetHeight = $args[2]
$widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($widgetName) -Replace ' ', ''
$firstCharacter = $widgetNameTitleCased.Substring(0, 1)
$firstCharacterLowerCase = $firstCharacter.ToLower()
$widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
 
$widgetObjectsPath = '.\src\main\widgets.js'
$newWidgetObjectLineNumber = Get-Content $widgetObjectsPath | Select-String -Pattern "// Create all widget objects here" | Select-Object LineNumber
$newWidgetObjectLineNumber = $newWidgetObjectLineNumber.LineNumber - 1
$allWidgetsLineNumber = Get-Content $widgetObjectsPath | Select-String -Pattern "const allWidgets" | Select-Object LineNumber
$allWidgetsLineNumber = $allWidgetsLineNumber.LineNumber - 1

$fileContent = Get-Content $widgetObjectsPath
$fileContent[$newWidgetObjectLineNumber] += "`nconst " + $widgetNameCamelCased + "= new Widget('" + $widgetName + "', " + $widgetWidth + ", " + $widgetHeight + ", './widgets-backend/" + $widgetNameCamelCased + ".js', path.join(__dirname, '../preload/" + $widgetNameCamelCased + ".js'), './src/renderer/templates/" + $widgetNameCamelCased + ".html');"
$fileContent[$allWidgetsLineNumber] += "`n`t" + $widgetNameCamelCased + ","

$fileContent | Set-Content $widgetObjectsPath

