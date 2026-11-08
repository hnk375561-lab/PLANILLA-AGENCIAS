$site = Join-Path $PWD '_site'
if (-not (Test-Path $site)) { throw 'No existe _site. Corre build-site primero.' }
New-Item -ItemType Directory -Force "$site\js" | Out-Null
Copy-Item "$PSScriptRoot\demo-extra.js" "$site\js\demo-extra.js" -Force
$utf8 = New-Object Text.UTF8Encoding($false)
$n = 0
Get-ChildItem $site -Recurse -Filter *.html | ForEach-Object {
  $t = [IO.File]::ReadAllText($_.FullName)
  if ($t -notmatch 'demo-extra\.js') {
    $t = $t -replace '</body>', ('<script src="/js/demo-extra.js" defer></script>' + "`n</body>")
    [IO.File]::WriteAllText($_.FullName, $t, $utf8)
    $n++
  }
}
"Avisos extra agregados en $n paginas"