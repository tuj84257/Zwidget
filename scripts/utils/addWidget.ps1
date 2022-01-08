. .\scripts\utils\utils.ps1

$widgetName = $args[0]
$widgetDirectory = $args[1]
$widgetWidth = $args[2]
$widgetHeight = $args[3]
$widgetNameCamelCased = Get-CamelCasedName $widgetName
$widgetObjectsPath = '.\src\main-window\widgets.js'
$newWidgetObjectLineNumber = Get-Content $widgetObjectsPath | Select-String -Pattern "// Create all widget objects here" | Select-Object LineNumber
$newWidgetObjectLineNumber = $newWidgetObjectLineNumber.LineNumber - 1
$allWidgetsLineNumber = Get-Content $widgetObjectsPath | Select-String -Pattern "const allWidgets" | Select-Object LineNumber
$allWidgetsLineNumber = $allWidgetsLineNumber.LineNumber - 1
$fileContent = Get-Content $widgetObjectsPath
$fileContent[$newWidgetObjectLineNumber] += "`nconst " + $widgetNameCamelCased + "= new Widget('" + $widgetName + "', " + $widgetWidth + ", " + $widgetHeight + ", '../" + $widgetDirectory + "/backend/backend.js', path.join(__dirname, '../" + $widgetDirectory + "/preload/preload.js'), './src/" + $widgetDirectory + "/frontend/template.html');"
$fileContent[$allWidgetsLineNumber] += "`n`t" + $widgetNameCamelCased + ","
$fileContent | Set-Content $widgetObjectsPath
