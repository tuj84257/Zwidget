$srcDirectories = Get-ChildItem -Path ".\src" -Name

foreach ($srcDirectory in $srcDirectories) {
    $inputFile = ".\src\" + $srcDirectory + "\frontend\css\input.css"
    $outputFile = ".\src\" + $srcDirectory + "\frontend\css\output.css"
    npx tailwindcss -i $inputFile -o $outputFile
}
