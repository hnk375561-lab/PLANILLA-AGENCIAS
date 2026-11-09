# desplegar-resto.ps1 - despliega las 8 agencias en Cloudflare Pages y verifica lo publicado.
# Requisito: haber corrido aplicar-resto.ps1 con "Todo OK" y tener wrangler logueado (npx wrangler login).
# Uso: powershell -ExecutionPolicy Bypass -File .\desplegar-resto.ps1
#      (solo algunas)  ... -Solo eskina-autos,lf-autos
param([string]$Raiz = "C:/Users/santi/Downloads/PLANILLA-AGENCIAS-main/demos-agencias", [string[]]$Solo)
$utf8 = New-Object System.Text.UTF8Encoding($false)
$agencias = 'centro-automotores-colon','eskina-autos','la-esquina-automotores','lf-autos','litoral-motors-gualeguaychu','mc-automotores','regner-automotores','uruguay-autos'
if ($Solo) { $agencias = $agencias | Where-Object { $Solo -contains $_ } }
$resumen = @()

foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a/_site"
  if (-not (Test-Path (Join-Path $s 'index.html'))) { Write-Host "[FALLA] $a : no existe $s" -ForegroundColor Red; $resumen += "$a : sin carpeta"; continue }
  Write-Host "`n=== Desplegando $a ===" -ForegroundColor Cyan
  Push-Location $s
  $ErrorActionPreference = 'Continue'
  $out = (& npx wrangler pages deploy . "--project-name=demo-$a" 2>&1 | Out-String)
  Pop-Location
  Write-Host $out
  $m = [regex]::Match($out, 'Uploaded (\d+) file')
  $url = [regex]::Match($out, 'https://[a-z0-9]+\.demo-[a-z0-9-]+\.pages\.dev').Value
  if ($m.Success -and [int]$m.Groups[1].Value -ge 1) { $resumen += "[OK ] $a : subidos $($m.Groups[1].Value) archivos  $url" }
  else { $resumen += "[FALLA] $a : wrangler no confirmo 'Uploaded N files' con N>=1"; Write-Host "[FALLA] $a : revisa el mensaje de arriba (login? red?)" -ForegroundColor Red }
}

# Verificacion estricta de lo publicado (bytes UTF-8, sin ocultar errores)
Write-Host "`n=== Verificando lo publicado ===" -ForegroundColor Cyan
$ErrorActionPreference = 'Stop'
function Bajar($u) { $r = Invoke-WebRequest -Uri $u -UseBasicParsing; $utf8.GetString($r.RawContentStream.ToArray()) }
$todoOk = $true
foreach ($a in $agencias) {
  $b = "https://demo-$a.pages.dev"; $t = [guid]::NewGuid().ToString('N'); $res = $null
  for ($i = 1; $i -le 4 -and -not $res; $i++) {
    try {
      $h = Bajar "$b/?nc=$t"; $e = Bajar "$b/js/demo-extra.js?nc=$t"; $p = Bajar "$b/js/pulido.js?nc=$t"; $et = Bajar "$b/js/etiquetas.js?nc=$t"
      $res = [ordered]@{
        'enlaza etiquetas y pulido'     = ($h.Contains('js/etiquetas.js') -and $h.Contains('js/pulido.js') -and $h.Contains('css/pulido.css') -and $h.Contains('css/etiquetas.css'))
        'pulido.js tiene dx-open'       = $p.Contains('dx-open')
        'etiquetas.js tiene car-tag'    = $et.Contains('car-tag')
        'sin target=_blank en #'        = -not [regex]::IsMatch($h, '<a [^>]*href="#[^"]*"[^>]*target="_blank"')
        'sin "sin verificar/confirmar"' = -not [regex]::IsMatch($e, 'sin verificar|sin confirmar', 'IgnoreCase')
        'aviso ficha unificado'         = $e.Contains('No constituye una oferta ni una reserva. Al publicar')
        'noindex sigue'                 = $h.Contains('noindex')
      }
    } catch { if ($i -lt 4) { Start-Sleep -Seconds 5 } else { Write-Host "[FALLA] $a : no pude bajar $b ($($_.Exception.Message))" -ForegroundColor Red; $todoOk = $false } }
  }
  if ($res) { foreach ($k in $res.Keys) { if (-not $res[$k]) { $todoOk = $false; Write-Host "[FALLA] $a : $k" -ForegroundColor Red } }; if ($res.Values -notcontains $false) { Write-Host "[OK ] $a : 7/7" } }
}
Write-Host "`n=== Resumen ===" ; $resumen | ForEach-Object { Write-Host $_ }
if ($todoOk -and -not ($resumen -match 'FALLA|sin carpeta')) { Write-Host "`nTODO OK: las 8 desplegadas y verificadas." -ForegroundColor Green } else { Write-Host "`nHAY FALLAS: pegame este resumen completo." -ForegroundColor Red }
