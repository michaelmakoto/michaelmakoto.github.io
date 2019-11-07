@echo off
  
set foldername="scratch"
set /a num=0
setlocal enabledelayedexpansion

for /f "delims=" %%a in (name.csv) do (
    set /a num=num+1
    mkdir %foldername%_!num!_%%a
)

endlocal