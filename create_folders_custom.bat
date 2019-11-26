@setlocal enabledelayedexpansion
set pad=2

REM ６年x組,01,伊藤_マイケル,いとう_マイケル
REM %%a,%%b,%%c,%%d ←対応順
REM ６年x組 - 01_伊藤_マイケル - 2 と 3
REM ６年x組 - 01_伊藤_マイケル ←ここに直接 2.sb3, 3.sb3を提出 

for /f "delims=, tokens=1-3" %%a in (6th_grade.csv) do (
  set class=%%a
  set id=00%%b
  set name=!id:~-%pad%!_%%c
  mkdir !class!\!name!

  REM for /L %%i in (1,1,2) do (
  REM   set num=%%c_%%i
  REM   mkdir !class!\!name!\!num!
  REM )
)
echo done