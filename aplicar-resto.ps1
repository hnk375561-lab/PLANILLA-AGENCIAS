# aplicar-resto.ps1 - lleva a las otras 8 agencias lo que ya tienen Colon y Lucar
# (etiquetas + pulido + textos "a confirmar por usted" + correcciones). Hace backup, aplica y verifica.
# Si algo no coincide, ABORTA sin tocar nada.
# Uso, desde la carpeta donde descomprimiste el zip:
#   powershell -ExecutionPolicy Bypass -File ./aplicar-resto.ps1
#   (otra ruta)  ... -Raiz "D:/ruta/demos-agencias"
param([string]$Raiz = "C:/Users/santi/Downloads/PLANILLA-AGENCIAS-main/demos-agencias")
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$agencias = 'centro-automotores-colon','eskina-autos','la-esquina-automotores','lf-autos','litoral-motors-gualeguaychu','mc-automotores','regner-automotores','uruguay-autos'
$aqui = $PSScriptRoot
function Leer($p) { [IO.File]::ReadAllText($p, $utf8) }
function Escribir($p, $t) { [IO.File]::WriteAllText($p, $t, $utf8) }
function Cuenta($t, $x) { ([regex]::Matches($t, [regex]::Escape($x))).Count }

foreach ($f in 'pulido/js/pulido.js','pulido/js/etiquetas.js','pulido/css/pulido.css','pulido/css/etiquetas.css','parches-demo-extra.json') {
  if (-not (Test-Path (Join-Path $aqui $f))) { throw "Falta $f junto al script." }
}
$parches = Leer (Join-Path $aqui 'parches-demo-extra.json') | ConvertFrom-Json
$tagDemo = '<script src="/js/demo-extra.js" defer></script>'

# 1) Comprobaciones previas (no se toca nada)
$errores = @()
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a/_site"
  foreach ($f in 'index.html','js/demo-extra.js') { if (-not (Test-Path (Join-Path $s $f))) { $errores += "$a : no existe $f" } }
  if ($errores.Count -gt 0 -and $errores[-1] -like "$a*") { continue }
  $h = Leer (Join-Path $s 'index.html'); $j = Leer (Join-Path $s 'js/demo-extra.js')
  if ((Cuenta $h '</head>') -ne 1) { $errores += "$a : index.html sin </head> unico" }
  if (-not $h.Contains('js/pulido.js') -and (Cuenta $h $tagDemo) -ne 1) { $errores += "$a : index.html sin la linea de demo-extra.js (ancla)" }
  foreach ($p in $parches) {
    $n = Cuenta $j $p.viejo
    if (-not (($n -eq 1) -or ($n -eq 0 -and $j.Contains($p.nuevo)))) { $errores += "$a : demo-extra.js no coincide -> " + $p.viejo.Substring(0, [Math]::Min(55, $p.viejo.Length)) }
  }
}
if ($errores.Count -gt 0) { $errores | ForEach-Object { Write-Host $_ -ForegroundColor Red }; throw "Hay $($errores.Count) problema(s). ABORTADO, no se toco nada." }
Write-Host "Comprobaciones previas OK (8 agencias)." -ForegroundColor Green

# 2) Backup
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
foreach ($a in $agencias) {
  $dest = Join-Path $Raiz "_backups/pulido-resto-$stamp/$a"
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-Item -Recurse -Force (Join-Path $Raiz "$a/_site") $dest
}
Write-Host "Backup OK: $Raiz/_backups/pulido-resto-$stamp"

# 3) Aplicar
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a/_site"
  foreach ($f in 'js/pulido.js','js/etiquetas.js','css/pulido.css','css/etiquetas.css') { Copy-Item -Force (Join-Path $aqui "pulido/$f") (Join-Path $s $f) }
  Get-ChildItem (Join-Path $s 'js') -Filter '*.bak*' -ErrorAction SilentlyContinue | ForEach-Object { Remove-Item -Force $_.FullName; Write-Host "Borrado: $a/$($_.Name)" }

  $p = Join-Path $s 'index.html'; $h = Leer $p
  $css = ''; if (-not $h.Contains('css/etiquetas.css')) { $css += "<link rel=`"stylesheet`" href=`"css/etiquetas.css`">`n" }; if (-not $h.Contains('css/pulido.css')) { $css += "<link rel=`"stylesheet`" href=`"css/pulido.css`">`n" }
  if ($css) { $h = $h.Replace('</head>', $css + '</head>') }
  $js = ''; if (-not $h.Contains('js/etiquetas.js')) { $js += "`n<script src=`"js/etiquetas.js`" defer></script>" }; if (-not $h.Contains('js/pulido.js')) { $js += "`n<script src=`"js/pulido.js`" defer></script>" }
  if ($js) { $h = $h.Replace($tagDemo, $tagDemo + $js) }
  $h = [regex]::Replace($h, '(<a [^>]*href="#[^"]*")( target="_blank" rel="noopener noreferrer")', '$1')
  Escribir $p $h

  $p = Join-Path $s 'js/demo-extra.js'; $j = Leer $p
  foreach ($x in $parches) { $j = $j.Replace($x.viejo, $x.nuevo) }
  Escribir $p $j
}

# 4) Verificacion estricta
$ok = $true
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a/_site"
  $h = Leer (Join-Path $s 'index.html'); $j = Leer (Join-Path $s 'js/demo-extra.js')
  $chk = [ordered]@{
    'etiquetas css+js enlazados' = ($h.Contains('css/etiquetas.css') -and $h.Contains('js/etiquetas.js'))
    'pulido css+js enlazados'    = ($h.Contains('css/pulido.css') -and $h.Contains('js/pulido.js'))
    'sin target=_blank en #'     = -not [regex]::IsMatch($h, '<a [^>]*href="#[^"]*"[^>]*target="_blank"')
    'sin "sin verificar/confirmar"' = -not [regex]::IsMatch($j, 'sin verificar|sin confirmar', 'IgnoreCase')
    'aviso de ficha unificado'   = $j.Contains('No constituye una oferta ni una reserva. Al publicar')
    'sin .bak'                   = (@(Get-ChildItem (Join-Path $s 'js') -Filter '*.bak*' -ErrorAction SilentlyContinue)).Count -eq 0
  }
  foreach ($k in $chk.Keys) { if (-not $chk[$k]) { $ok = $false; Write-Host "[FALLA] $a : $k" -ForegroundColor Red } }
  if ($ok) { Write-Host "[OK ] $a" }
}
if (-not $ok) { Write-Host "`nHay FALLAS. Restaura desde $Raiz/_backups/pulido-resto-$stamp" -ForegroundColor Red; exit 1 }
Write-Host "`nTodo OK. Siguiente: ./desplegar-resto.ps1" -ForegroundColor Green
