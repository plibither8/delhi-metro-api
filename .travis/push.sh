#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_website_files() {
    git add api/data/*
    git commit --message "chore: Update metro data [${date +%Y-%m-%d}]"
}

upload_files() {
    git remote add origin https://${GH_TOKEN}@github.com/plibither8/delhi-metro-api.git > /dev/null 2>&1
    git push --quiet --set-upstream origin master
}

setup_git
commit_website_files
upload_files