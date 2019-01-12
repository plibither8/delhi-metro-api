#!/bin/sh

setup_git() {
    git config --global user.email "plibither8.ci@gmail.com"
    git config --global user.name "plibother8"
}

commit_website_files() {
    DATE=$(date "+%F %T %Z")
    git add api/data/*
    git commit --message "chore: Auto-update metro data [${DATE}]"
}

upload_files() {
    git remote remove origin
    git remote add origin https://${GH_TOKEN}@github.com/plibither8/delhi-metro-api.git > /dev/null 2>&1
    git push --quiet origin HEAD:master
}

setup_git
commit_website_files
upload_files
