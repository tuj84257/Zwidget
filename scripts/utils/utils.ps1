# Returns the camel-cased name of a given widget name
function Get-CamelCasedName {
    param(
        $widgetName
    )
    $widgetNameTitleCased = (Get-Culture).TextInfo.ToTitleCase($widgetName) -Replace '\s+', ''
    $firstCharacter = $widgetNameTitleCased.Substring(0, 1)
    $firstCharacterLowerCase = $firstCharacter.ToLower()
    $widgetNameCamelCased = $widgetNameTitleCased -Replace $firstCharacter, $firstCharacterLowerCase
    return $widgetNameCamelCased
}
