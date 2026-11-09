# aplicar-pulido.ps1 - Colon Autos + Lucar's Automotores
# Uso (PowerShell, desde la carpeta donde descomprimiste el zip):
#   .\aplicar-pulido.ps1
#   .\aplicar-pulido.ps1 -Raiz "D:\otra\ruta\demos-agencias"
# Hace backup de las dos _site, aplica los cambios y verifica. Si algo no coincide, ABORTA sin tocar nada.
param([string]$Raiz = "C:\Users\santi\Downloads\PLANILLA-AGENCIAS-main\demos-agencias")
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$agencias = 'colon-autos','lucar-s-automotores'
$aqui = $PSScriptRoot
function Leer($p) { [IO.File]::ReadAllText($p, $utf8) }
function Escribir($p, $t) { [IO.File]::WriteAllText($p, $t, $utf8) }

# 1) Comprobaciones previas (no se toca nada todavia)
foreach ($f in 'pulido\js\pulido.js','pulido\css\pulido.css') { if (-not (Test-Path (Join-Path $aqui $f))) { throw "Falta $f junto al script." } }
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a\_site"
  foreach ($f in 'index.html','js\demo-extra.js') { if (-not (Test-Path (Join-Path $s $f))) { throw "No existe $s\$f" } }
  $h = Leer (Join-Path $s 'index.html')
  if (-not $h.Contains('<script src="js/etiquetas.js" defer></script>')) { throw "$a : index.html no tiene la linea de etiquetas.js (ancla). Abortado." }
  if (-not $h.Contains('<link rel="stylesheet" href="css/etiquetas.css">')) { throw "$a : index.html no tiene la linea de etiquetas.css (ancla). Abortado." }
}

# 2) Backup
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
foreach ($a in $agencias) {
  $dest = Join-Path $Raiz "_backups\pulido-$stamp\$a"
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-Item -Recurse -Force (Join-Path $Raiz "$a\_site") $dest
  Write-Host "Backup OK: $dest"
}

# 3) Aplicar
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a\_site"
  Copy-Item -Force (Join-Path $aqui 'pulido\js\pulido.js')   (Join-Path $s 'js\pulido.js')
  Copy-Item -Force (Join-Path $aqui 'pulido\css\pulido.css') (Join-Path $s 'css\pulido.css')
  Get-ChildItem (Join-Path $s 'js') -Filter '*.bak*' -ErrorAction SilentlyContinue | ForEach-Object { Remove-Item -Force $_.FullName; Write-Host "Borrado: $($_.Name)" }

  $p = Join-Path $s 'index.html'; $h = Leer $p
  if (-not $h.Contains('css/pulido.css')) { $h = $h.Replace('<link rel="stylesheet" href="css/etiquetas.css">', "<link rel=`"stylesheet`" href=`"css/etiquetas.css`">`n<link rel=`"stylesheet`" href=`"css/pulido.css`">") }
  if (-not $h.Contains('js/pulido.js'))  { $h = $h.Replace('<script src="js/etiquetas.js" defer></script>', "<script src=`"js/etiquetas.js`" defer></script>`n<script src=`"js/pulido.js`" defer></script>") }
  $h = [regex]::Replace($h, '(<a [^>]*href="#[^"]*")( target="_blank" rel="noopener noreferrer")', '$1')
  Escribir $p $h

  $p = Join-Path $s 'js\demo-extra.js'; $j = Leer $p
  $j = $j.Replace("small ? 'Ejemplo' : 'Ejemplo a reemplazar'", "small ? 'Ejemplo' : 'Ejemplo'")
  $nuevo = 'son de muestra. No constituye una oferta ni una reserva. Al publicar, los reemplazo por los datos reales de cada unidad.'
  if (-not $j.Contains($nuevo)) {
    $j = $j.Replace('son de muestra. Al publicar, los reemplazo por los datos reales de cada unidad.', $nuevo)
    $j = $j.Replace('son de muestra. No constituye una oferta ni una reserva.</div>', $nuevo + '</div>')
  }
  Escribir $p $j
}

# 4) Verificacion estricta (bytes UTF-8)
$ok = $true
foreach ($a in $agencias) {
  $s = Join-Path $Raiz "$a\_site"
  $h = Leer (Join-Path $s 'index.html'); $j = Leer (Join-Path $s 'js\demo-extra.js')
  $chk = [ordered]@{
    'pulido.css enlazado'        = $h.Contains('css/pulido.css')
    'pulido.js enlazado'         = $h.Contains('js/pulido.js')
    'sin target=_blank en #'     = -not ([regex]::IsMatch($h, '<a [^>]*href="#[^"]*"[^>]*target="_blank"'))
    'aviso de ficha unificado'   = $j.Contains('No constituye una oferta ni una reserva. Al publicar')
    'sin "Ejemplo a reemplazar"' = -not $j.Contains('Ejemplo a reemplazar')
    'sin .bak'                   = (@(Get-ChildItem (Join-Path $s 'js') -Filter '*.bak*' -ErrorAction SilentlyContinue)).Count -eq 0
  }
  foreach ($k in $chk.Keys) { $m = if ($chk[$k]) { 'OK ' } else { 'FALLA'; $ok = $false }; Write-Host ("[{0}] {1} : {2}" -f $m, $a, $k) }
}
if (-not $ok) { Write-Host "`nHay FALLAS. Restaura desde $Raiz\_backups\pulido-$stamp" -ForegroundColor Red; exit 1 }
Write-Host "`nTodo OK. Ahora desplega (de a uno):" -ForegroundColor Green
Write-Host "  cd `"$Raiz\colon-autos\_site`"; npx wrangler pages deploy . --project-name=demo-colon-autos"
Write-Host "  cd `"$Raiz\lucar-s-automotores\_site`"; npx wrangler pages deploy . --project-name=demo-lucar-s-automotores"
Write-Host "Wrangler debe decir 'Uploaded N files' con N >= 1."
