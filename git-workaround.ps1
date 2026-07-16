param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Command,
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$gitDir = Join-Path $repoRoot ".git"
$tempIndex = Join-Path $gitDir "index_temp"

$env:GIT_INDEX_FILE = $tempIndex

if ($Command -eq "add") {
    & git add @Args
    if ($LASTEXITCODE -eq 0 -and (Test-Path $tempIndex)) {
        $content = [System.IO.File]::ReadAllBytes($tempIndex)
        [System.IO.File]::WriteAllBytes((Join-Path $gitDir "index"), $content)
        Remove-Item $tempIndex -Force -ErrorAction SilentlyContinue
    }
} elseif ($Command -eq "commit") {
    # Write tree from our temp index
    $tree = & git write-tree
    if ($LASTEXITCODE -eq 0) {
        $parent = & git rev-parse HEAD 2>$null
        $parentArg = if ($parent) { @("-p", $parent) } else { @() }
        $commit = & git commit-tree $tree @parentArg -m $Args[0]
        if ($LASTEXITCODE -eq 0) {
            [System.IO.File]::WriteAllText((Join-Path $gitDir "refs\heads\main"), $commit + "`n")
            Write-Host "Commit berhasil: $commit"
            # Also rebuild the real index
            $env:GIT_INDEX_FILE = $tempIndex
            & git reset --mixed HEAD 2>$null
            $content = [System.IO.File]::ReadAllBytes($tempIndex)
            [System.IO.File]::WriteAllBytes((Join-Path $gitDir "index"), $content)
            Remove-Item $tempIndex -Force -ErrorAction SilentlyContinue
        }
    }
} else {
    & git $Command @Args
}
