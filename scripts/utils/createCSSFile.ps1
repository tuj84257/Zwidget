$outputPath = ".\src\" + $args[0] + "\frontend\css"
Copy-Item -Path ".\scripts\templates\input.css" -Destination $outputPath
