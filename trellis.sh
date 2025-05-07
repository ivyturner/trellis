#!/usr/bin/env bash

caddy_config="./src/data/caddy.json"

gen_redirects () {
  caddyfile="redirects.caddyfile"

  # clean before we append  
  rm -rf $caddyfile;
  touch $caddyfile;
  # Append the redirects
  jq -r '.redirects | to_entries[] | "redir \(.key) \(.value)"' "$caddy_config" >> "$caddyfile";
}

gen_robots () {
  caddyfile="robots.caddyfile"

  rm -rf $caddyfile;
  touch $caddyfile;
  
  jq -r '.blockedCrawlers | to_entries | "respond \(.value) "Access Denied" 403';
}

gen_redirects