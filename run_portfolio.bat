@echo off
title GameDev - AnanthaKrishnan SB Portfolio
echo ===================================================
echo   Launching Portfolio in Modern Web Browser...
echo ===================================================

set "PORTFOLIO_FILE=%~dp0index.html"

:: 1. Try Brave Browser
if exist "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" (
    echo Opening in Brave Browser...
    start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" "%PORTFOLIO_FILE%"
    exit
)

:: 2. Try Microsoft Edge (64-bit or 32-bit path)
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo Opening in Microsoft Edge...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "%PORTFOLIO_FILE%"
    exit
)
if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    echo Opening in Microsoft Edge...
    start "" "C:\Program Files\Microsoft\Edge\Application\msedge.exe" "%PORTFOLIO_FILE%"
    exit
)

:: 3. Try Google Chrome
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo Opening in Google Chrome...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "%PORTFOLIO_FILE%"
    exit
)

:: Fallback to default
start "" "%PORTFOLIO_FILE%"
exit
