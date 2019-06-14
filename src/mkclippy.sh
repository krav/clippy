#!/usr/bin/env bash
set -e

cwd=$(dirname "$0")

cat <<EOF
const Clippy = obj => {
    const styleSheet = obj.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = \`$(< $cwd/menu.css)\`;
    obj.head.appendChild(styleSheet);

    const menu = obj.createElement("div");
    menu.id = "blc_menu";
    menu.innerHTML = \`$(< $cwd/menu.html)\`;
    obj.body.appendChild(menu);

    const clippy = obj.createElement("div");
    clippy.id = "blc_clippy";
    obj.body.appendChild(clippy);

    $(<$cwd/main.js)
}
const blc_clippy = Clippy(document);
EOF

