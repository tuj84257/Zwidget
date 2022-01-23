$portableDirectory = "dist/Zwidget"

if(Test-Path -Path $portableDirectory) {
    Remove-Item -LiteralPath $portableDirectory -Force -Recurse
}
