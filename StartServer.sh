#!/bin/bash
cd /home/ubuntu/twitterclone_ui
screen -d -m -S twittercloneui sh -c "serve -l 4001 -s build"