# Helper script to create a venv, install dependencies and run findimage.py
# Run from PowerShell in folder: backend\Server

$venvDir = ".\.venv"
$pythonExe = Join-Path $venvDir "Scripts\python.exe"

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host "Python not found in PATH. Please install Python 3.8+ and re-run." -ForegroundColor Red
  exit 1
}

# create venv if missing
if (-not (Test-Path $venvDir)) {
  python -m venv $venvDir
}

# install dependencies using the venv's pip
& $pythonExe -m pip install --upgrade pip
& $pythonExe -m pip install -r requirements.txt

# check for .env
if (-not (Test-Path ".env")) {
  Write-Host ".env file not found in $(Get-Location). Create a .env file containing GEMINI_API_KEY=your_key" -ForegroundColor Yellow
  Read-Host "Press Enter to continue (script will attempt to run anyway)"
}

# run the script
& $pythonExe findimage.py
