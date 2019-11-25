@setlocal enabledelayedexpansion
set pad=2

for /f "delims=, tokens=1-3" %%a in (6th_grade.csv) do (
  set class=%%a
  set id=00%%b
  set name=!id:~-%pad%!_%%c
  for /L %%i in (1,1,2) do (
    set num=%%i
    mkdir !class!\!name!\!num!
  )
)
echo done