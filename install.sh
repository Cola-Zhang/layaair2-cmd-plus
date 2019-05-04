#!/bin/bash
path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $path
npm install
cp -rf custom/browser-pack/_prelude.js node_modules/browser-pack/_prelude.js
ln -s $path/layaair2-plus-cmd.js /usr/local/bin/layaair2-plus-cmd



