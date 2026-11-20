@echo off
title AnanthaKrishnan SB - Portfolio Local Server
echo ==========================================================
echo   Starting Local HTTP Server on http://localhost:8080 ...
echo ==========================================================

:: Launch browser in background after 1 second
start "" powershell -NoProfile -Command "Start-Sleep -Milliseconds 800; if (Test-Path 'C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe') { Start-Process 'C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe' 'http://localhost:8080' } else { Start-Process 'http://localhost:8080' }"

:: Run PowerShell HTTP server
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
