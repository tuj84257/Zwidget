# Request elevated permissions
# before running the installer
!macro customHeader
  RequestExecutionLevel admin
!macroend

# add the path to the installation directory to the 
# Microsoft Defender Antivirus scans' exclusions
!macro customInstall
	nsExec::Exec "powershell  Add-MpPreference -ExclusionPath $INSTDIR"
!macroend
