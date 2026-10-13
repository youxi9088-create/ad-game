@echo off
setlocal
set "FROST_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
where node >nul 2>nul
if not errorlevel 1 set "FROST_NODE=node"
echo Open http://localhost:8787 in Chrome or Edge.
echo Keep this window open. Press Ctrl+C to stop.
"%FROST_NODE%" "%~dp0server.cjs"
pause
