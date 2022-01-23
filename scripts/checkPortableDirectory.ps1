$portableDirectory = "dist/Zwidget-portable"

if(Test-Path -Path $portableDirectory) {
    Remove-Item -LiteralPath $portableDirectory -Force -Recurse
}
