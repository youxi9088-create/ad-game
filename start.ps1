$ErrorActionPreference = 'Stop'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' }
if (-not (Test-Path -LiteralPath $nodePath)) { throw 'Node.js is required to run the local server.' }
Write-Host 'Open http://localhost:8787 in your browser. Ctrl+C stops the server.'
& $nodePath (Join-Path $PSScriptRoot 'server.cjs')
