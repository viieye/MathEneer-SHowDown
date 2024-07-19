@echo off
setlocal enabledelayedexpansion

set outputFile=_data.js
if exist %outputFile% del %outputFile%

rem Define the strings to add at the beginning and end
set beginningText=var data = [
set endingText=]

rem Delete the output file if it already exists
if exist %outputFile% del %outputFile%

rem Add the beginning text to the output file
echo %beginningText% > %outputFile%
echo. >> %outputFile%


rem Loop through all js files in the current directory
for %%f in (*.js) do (
    rem Read the content of each js file and append it to the output file
    if not "%%f"=="%outputFile%" (
        echo Combining %%f
        type "%%f" >> %outputFile%
        echo. >> %outputFile%  
    )
)

rem Add the ending text to the output file
echo. >> %outputFile%
echo %endingText% >> %outputFile%

@REM echo All js files have been combined into %outputFile%
endlocal