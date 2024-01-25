
# vim shortcuts

copy trong vim vào clipboard: `"*y`, sau đó ra vscode dán

markdown notes:

- `zM` to fold all, `zm` to fold level 2
- `zr` to open all folds

cheatsheet for vim

- gg: top of file, G: bottom of file
- H: go to top screen, M: go to middle screen, L: go to last screen
- $: end of line, 0: beginning of line
- w: move forward a word, b: move backward a word
- a: insert after pointer, i: insert before pointer
- A: insert at the end of line
- I: insert at the beginning of line
- yy: copy 1 line, 2yy copy 2 lines
- dd: delete 1 line, 2dd delete 2 lines
- p: paste below, P: paste above
- u: undo, ctr+R: redo
- /: search, for next result click `n`
- v: visual mode to select words, d: to delete
- t_: _ is something that u want go to
- o: insert below line, while O: insert above line

- use `shift v` or visual mode to select words, then: `"*yy`
- :sp open horizontal split
- :vsp open vertical split
- C-w to switch between screens
- `zz` to middle of the screen overview, `zt` and `zb` for top and bottom
- `shift $` move to end, `0` move to beginning

## vim format with prettier

format code `:Prettier`

toggle tab tree: `Ctrl T`

## setup code 

```bash
md ~\AppData\Local\nvim\autoload
$uri = 'https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
(New-Object Net.WebClient).DownloadFile(
  $uri,
  $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath(
    "~\AppData\Local\nvim\autoload\plug.vim"
  )
)
``` 


## can be installed via chocolately

then create file plug in local, if doesn't exist just create a folder with below example: 

# nvim 

simple IDE setup with nvim lua kickstar: [reference](https://github.com/nvim-lua/kickstart.nvim)

- installation: copy `init.lua` to `$HOME/.config/nvim/init.lua`
- all shortcuts: `:Telescope keymaps` or install LSP `:Mason`, or search all files with `<space> s f`
- add custom plugins with Packer
	- define plugins: `$HOME/.config/nvim/lua/custom/plugins.lua`
	- config: `$HOME/.config/nvim/after/plugin/defaults.lua`


## old notes

using floating terminal: install package vim-floaterm, binding key `<C-t>` for toggling and change between mode by using: `<C-\><C-n>`

### setup c++ for nvim

- install ccls with apt
- in root folder, create .ccls file to setup language server
- config language server with cpp file iwth `:CocConfig`

ref: https://codevion.github.io/#!vim/coc.md

### key mapping

- word wrapped by word: `set linebreak`
- root foler `~/.config/nvim`

go to defination config:

```vim 
" Remap keys for gotos
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
```

### nvim on macos

config file: ~/.config/nvim

include: autoload, init.vim, plugged

## nvim on windows

đường dẫn tới file cài đặt: `C:\Users\duong\AppData\Local\nvim`

nội dung file: autoload\plug.vim được tải từ trên mạng rồi copy bỏ vào

## nvim on wsl

- install: `sudo apt install neovim`
- create folder `~/.config/nvim`, then create file vim.init to config
- clone: 
```bash
curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

---

# emacs 

M-x and use `package-list` then search `markdown-mode` and restart emacs

bookmarks:
	- C-x r b: go to bookmark name
	- C-x r m: set bookmark name at the current folder
	- C-x r l: list all bookmark names


to install new package: `package-list` or `list-packages` and then search with ctrl+s






