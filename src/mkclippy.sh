#!/usr/bin/env bash
set -e

cwd=$(dirname "$0")

cat <<EOF
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = \`$(< $cwd/menu.css)\`;
document.head.appendChild(styleSheet);

const menu = document.createElement("div");
menu.id = "blc_menu";
menu.innerHTML = \`$(< $cwd/menu.html)\`;
document.body.appendChild(menu);

const clippy = document.createElement("div");
clippy.id = "blc_clippy";
document.body.appendChild(clippy);
EOF
cat $cwd/main.js


