


# golang installation

to install on ubuntu run 2 lines of CLI when press go (standard)

to install certained version of Go, just download that zip file and export anywhere on your local disk. Then, get PATH to that folder in `~/.profile` file:
export `PATH=$PATH:/usr/local/go/bin`

to check, type: go version.

sample in my `~/.profile` file:

```bash
export GOROOT=/usr/lib/go-1.12
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin
```


