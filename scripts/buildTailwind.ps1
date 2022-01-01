$inputCSSPath = '.\src\renderer\css\input'
$outputCSSPath = '.\src\renderer\css\output'
$inputFileNames = Get-ChildItem -Path $inputCSSPath -Name

foreach($inputFileName in $inputFileNames) {
    $inputFile = $inputCSSPath + '\' + $inputFileName
    $outputFile = $outputCSSPath + '\' + $inputFileName
    npx tailwindcss -i $inputFile -o $outputFile
}
