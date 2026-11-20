@echo off
title Push Portfolio to GitHub
echo =========================================================================
echo   Pushing Portfolio to GitHub (ananthakrishnanpty999-bit/Portfolio)
echo =========================================================================
echo.
echo Step 1: Ensure you have created the repository on GitHub:
echo         https://github.com/new
echo         Repository Name: Portfolio (Public)
echo.
echo Press any key when the repository is created on GitHub...
pause >nul
echo.
echo Pushing to main branch...
"%LOCALAPPDATA%\Programs\Git\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo =====================================================================
    echo   SUCCESS! Your portfolio is pushed to GitHub!
    echo   Repo: https://github.com/ananthakrishnanpty999-bit/Portfolio
    echo.
    echo   Next Step (Host on Vercel):
    echo   1. Visit: https://vercel.com/new
    echo   2. Click 'Import' next to ananthakrishnanpty999-bit/Portfolio
    echo   3. Click 'Deploy'
    echo =====================================================================
) else (
    echo.
    echo Push failed. If authentication was requested:
    echo 1. Generate a Personal Access Token at https://github.com/settings/tokens
    echo 2. Or sign in when the GitHub browser prompt appears.
)
echo.
pause
