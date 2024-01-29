---
title: 'Version Management with Git'
description: 'A Powerful tool to manage version and release over time.'
---

# general knowledge:

- then go to setting in github adding new ssh key from `~/.ssh/id_rsa.pub`
- update remote branches to local branches: `git remote update origin —prune`
- rename local branch:`git branch -m <oldname> <newname>`
- recover deleted on local branches:`git fsck —lost-found`


## use git helper to save username and password

$ git help -a | grep credential-cache
$ git config — global credential.helper cache

## go get the firsttime is not allow until we add this

`git config --global url.ssh://git@github.com/.insteadOf [https://github.com/](https://github.com/)`
