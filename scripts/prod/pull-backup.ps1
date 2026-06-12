# P0-5 — Pull backups từ staging VMs về Windows (Task Scheduler daily 03:30)
# Mạng LAN→40.x flaky → retry 5 lần mỗi file
$ErrorActionPreference = "Continue"
$dest = "C:\backups\csr"
$log = "$dest\pull.log"
$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

function Pull-WithRetry($remote, $pattern) {
    for ($i = 1; $i -le 5; $i++) {
        $r = & scp -o ConnectTimeout=20 "${remote}:backups/$pattern" $dest 2>&1
        if ($LASTEXITCODE -eq 0) { return $true }
        Start-Sleep -Seconds 10
    }
    return $false
}

Add-Content $log "[$ts] === pull start ==="

$ok1 = Pull-WithRetry "csr-data" "medusa-*.sql.gz"
$ok2 = Pull-WithRetry "csr-data" "payload-*.sql.gz"
$ok3 = Pull-WithRetry "csr-storage" "minio-*.tgz"

# Giữ 7 bản mỗi loại trên Windows
foreach ($p in @("medusa-*.sql.gz", "payload-*.sql.gz", "minio-*.tgz")) {
    Get-ChildItem "$dest\$p" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -Skip 7 | Remove-Item -Force
}

$status = if ($ok1 -and $ok2 -and $ok3) { "OK" } else { "PARTIAL db=$ok1/$ok2 minio=$ok3" }
Add-Content $log "[$ts] pull done: $status"

# Cảnh báo nếu backup mới nhất quá 48h
$newest = Get-ChildItem "$dest\medusa-*.sql.gz" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($newest -and ((Get-Date) - $newest.LastWriteTime).TotalHours -gt 48) {
    Add-Content $log "[$ts] WARNING: backup moi nhat qua 48h tuoi!"
}
