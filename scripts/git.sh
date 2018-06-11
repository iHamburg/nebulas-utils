#!/usr/bin/env bash

echo 'begin pull git'

git add -A
#git pull
git commit -am update
git push

echo 'begin push git'