Add-Type -AssemblyName System.Drawing

$srcDir = 'c:/install-medusa-dev/GiaoDien-huayuesc/logo'
$dstDir = 'c:/install-medusa-dev/GiaoDien-huayuesc/storefront/public/logo'

# Mapping: source new logo → target file name + (width × height)
# Horizontal logo (Logo-ngang.png, 866x288 ratio ~3:1) replaces both
# horizontal variants. Square logo (logo - only -vuong.png) replaces the
# icon + all favicon sizes. Stacked logo (logo and text -vuong.png)
# replaces the stacked variant.
$jobs = @(
  @{ src = 'Logo-ngang.png';           dst = 'cybersilkroads-horizontal.png';         w = 1250; h = 625; fit = $true },
  @{ src = 'Logo-ngang.png';           dst = 'cybersilkroads-horizontal-compact.png'; w = 1250; h = 375; fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'cybersilkroads-icon.png';               w = 300;  h = 300; fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'apple-touch-icon.png';                  w = 180;  h = 180; fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'favicon-48.png';                        w = 48;   h = 48;  fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'favicon-32.png';                        w = 32;   h = 32;  fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'favicon-16.png';                        w = 16;   h = 16;  fit = $true },
  @{ src = 'logo - only -vuong.png';   dst = 'cybersilkroads-favico.jpg';             w = 150;  h = 150; fit = $true; format = 'jpg' },
  @{ src = 'logo and text -vuong.png'; dst = 'cybersilkroads-stacked.png';            w = 500;  h = 500; fit = $true }
)

foreach ($job in $jobs) {
  $srcPath = Join-Path $srcDir $job.src
  $dstPath = Join-Path $dstDir $job.dst
  if (-not (Test-Path $srcPath)) { Write-Output "MISSING source: $srcPath"; continue }

  $img = [System.Drawing.Image]::FromFile($srcPath)
  $tw = $job.w
  $th = $job.h

  # Compute fit dimensions (preserve aspect; center on transparent canvas)
  $srcRatio = $img.Width / $img.Height
  $dstRatio = $tw / $th
  if ($srcRatio -gt $dstRatio) {
    $fitW = $tw
    $fitH = [int]($tw / $srcRatio)
  } else {
    $fitH = $th
    $fitW = [int]($th * $srcRatio)
  }
  $offX = [int](($tw - $fitW) / 2)
  $offY = [int](($th - $fitH) / 2)

  $bmp = New-Object System.Drawing.Bitmap $tw, $th
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  # JPG needs white bg; PNG keeps transparency
  if ($job.format -eq 'jpg') {
    $g.Clear([System.Drawing.Color]::White)
  } else {
    $g.Clear([System.Drawing.Color]::Transparent)
  }

  $g.DrawImage($img, $offX, $offY, $fitW, $fitH)
  $g.Dispose()

  if ($job.format -eq 'jpg') {
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  } else {
    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  $bmp.Dispose()
  $img.Dispose()
  Write-Output ("OK {0,-44} → {1,4}x{2,4} (logo fit {3}x{4} at offset {5},{6})" -f $job.dst, $tw, $th, $fitW, $fitH, $offX, $offY)
}
