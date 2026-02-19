$jdkPath = Get-ChildItem "C:\Program Files\Microsoft" -Filter "jdk-17*" | Select-Object -ExpandProperty FullName -ErrorAction SilentlyContinue

if (-not $jdkPath) {
    # Try default Program Files if not in Microsoft folder (sometimes it installs to C:\Program Files\Java or similar)
    $jdkPath = Get-ChildItem "C:\Program Files\Java" -Filter "jdk-17*" | Select-Object -ExpandProperty FullName -ErrorAction SilentlyContinue
}

if ($jdkPath) {
    # There might be multiple matches, take the first one
    if ($jdkPath -is [array]) {
        $jdkPath = $jdkPath[0]
    }
    
    Write-Host "Found JDK at: $jdkPath"
    [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $jdkPath, [System.EnvironmentVariableTarget]::User)
    Write-Host "Set JAVA_HOME to $jdkPath"
    
    # Update Path
    $currentPath = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::User)
    if ($currentPath -notlike "*$jdkPath\bin*") {
        $newPath = "$currentPath;$jdkPath\bin"
        [System.Environment]::SetEnvironmentVariable('Path', $newPath, [System.EnvironmentVariableTarget]::User)
        Write-Host "Added JDK bin to Path"
    } else {
        Write-Host "JDK bin already in Path"
    }
} else {
    Write-Host "ERROR: JDK 17 not found. Please verify installation."
}

# Android SDK
$androidHome = "C:\Users\Kay\AppData\Local\Android\Sdk"
if (Test-Path $androidHome) {
    [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $androidHome, [System.EnvironmentVariableTarget]::User)
    Write-Host "Set ANDROID_HOME to $androidHome"
    
    # Remove deprecated variable
    [System.Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $null, [System.EnvironmentVariableTarget]::User)
    Write-Host "Removed ANDROID_SDK_ROOT"
} else {
    Write-Host "ERROR: Android SDK path not found at $androidHome"
}
