#!/bin/bash

set -e

# echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
bundle check || bundle install --binstubs="$BUNDLE_BIN"

exec "$@"