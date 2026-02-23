# Build Check Script
Write-Host "Running ESLint..." -ForegroundColor Cyan
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "ESLint failed!" -ForegroundColor Red
}
else {
    Write-Host "ESLint passed!" -ForegroundColor Green
}

Write-Host "`nRunning TypeScript Check..." -ForegroundColor Cyan
npx tsc --noEmit

if ($LASTEXITCODE -ne 0) {
    Write-Host "TypeScript Check failed!" -ForegroundColor Red
}
else {
    Write-Host "TypeScript Check passed!" -ForegroundColor Green
}

Write-Host "`nBuild check complete." -ForegroundColor Cyan
