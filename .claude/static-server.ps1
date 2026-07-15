param(
  [int]$Port = 8000
)

$root = (Get-Location).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Serving $root on http://localhost:$Port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".webmanifest" = "application/manifest+json"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $path = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }
    $fsPath = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
    if (Test-Path $fsPath -PathType Container) {
      $fsPath = Join-Path $fsPath "index.html"
    }
    if (Test-Path $fsPath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($fsPath).ToLower()
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($fsPath)
      $response.ContentType = $contentType
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $response.ContentLength64 = $notFound.Length
      $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
  } catch {
    $response.StatusCode = 500
    $errBytes = [System.Text.Encoding]::UTF8.GetBytes("500: $($_.Exception.Message)")
    $response.ContentLength64 = $errBytes.Length
    $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
  } finally {
    $response.OutputStream.Close()
  }
}
