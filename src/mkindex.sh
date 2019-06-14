#!/usr/bin/env bash
set -e

cwd=$(dirname "$0")

cat <<EOF
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Borderland Navigation</title>
  <meta name="description" content="A list of Borderland Websites">
  <meta name="author" content="Borderland">

  <style>
  $(<$cwd/menu.css)
  #blc_menu {
    display: block;
  };
  </style>
</head>
<body>
<div id="blc_menu">
$(<$cwd/menu.html)
</div>
</body>
</html>
EOF

