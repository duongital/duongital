# curl

- download a file: `curl -L https://github.com/ryanoasis/IBMPlexMono.zip -o Output.zip`
- unzip a file: `apt install unzip` then `unzip Output.zip -d ./`:w
- 

# wsl

- list all wsl distro: `wsl -l`
- run a distro: `wsl -d distro_name`
- set default distro_name: `wsl -s distro_name`

see more: https://gist.github.com/karthiks/1700a56b7bfb79e6e1c345230c2e26b6

# tmux

- change between terminal `C-b n`
- create new tab `C-b c`
- delete current tab: `C-b x`
- split vertial: `C-b %` or horizon `C-b "`
- split and move between: `C-b o`
- install plugnins: `C-b I` from file `./.tmux.conf`

## config to take effect all terminals

- config file: `alias tmux='TERM=xterm-256color tmux'`
- kill tmux: `tmux kill-server && tmux`

---

# alacritty

- config windows location: `%APPDATA%\alacritty\alacritty.yml`
- config macos location `~/.alacritty.yml`

# alias

alias on different os

## cài alias cho powershell windows 10

$PROFILE is a path to config file of powershell: alias, util functions...

to edit that file: `vim $PROFILE`

```bash
Set-PoshPrompt -Theme material

Function CD32 {Set-Location -Path C:\Users\duong\OneDrive\notes}
Set-Alias -Name odn -Value CD32

Function CD33 {Set-Location -Path C:\Users\duong\AppData\Local\nvim}
Set-Alias -Name nvimconfig -Value CD33
```

## alias for cmd in windows 10

tutorial: https://stackoverflow.com/questions/20530996/aliases-in-windows-command-prompt

```bat
@echo off

:: Temporary system path at cmd startup
set PATH=%PATH%;"C:\Program Files\Sublime Text 2\";
set PATH=%PATH%;"C:\Users\duong\AppData\Local\Programs\Microsoft VS Code Insiders\bin";

:: Add to path by command
DOSKEY add_python26=set PATH=%PATH%;"C:\Python26\"
DOSKEY add_python33=set PATH=%PATH%;"C:\Python33\"

:: Applications
DOSKEY gsp="C:\Program Files (x86)\Sketchpad5\GSP505en.exe"
DOSKEY wsl="C:\Windows\\System32\wsl.exe"
DOSKEY ps="C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"

:: Directories
DOSKEY dropbox=cd "%USERPROFILE%\Dropbox\$*"
DOSKEY markdown=cd %USERPROFILE%\Dropbox\Markdown\
DOSKEY ~=cd %USERPROFILE%\

:: Execute a file or folder with application
::DOSKEY alias=notepad %USERPROFILE%\Dropbox\alias.cmd
DOSKEY alacrity=code %APPDATA%\alacritty\alacritty.yml
DOSKEY alias=code "C:\Alias\alias.bat"
DOSKEY notes=code-insiders "C:\Users\duong\Dropbox\Markdown"

:: Simulator
DOSKEY ls=dir /B
DOSKEY rm=del $*
DOSKEY touch=copy NUL $*
```

