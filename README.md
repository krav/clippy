---
title: Clippy
...

Toy proposal for Borderland uglyweb navigation. [source](https://github.com/krav/clippy)

# Reasoning

The Borderland is a decentralised mishmash of sites. Instead of trying to
enforce a unifying navigation paradigm and mantaining links between them
multiple places, this toy is an easily injectable movable icon that show a
Geocities/ATM style menu. 

# Using

At the end of your document, put

```html
<script src="https://krav.github.io/clippy/clippy.js" type="text/javascript"></script>
```

e.g. using nginx as a reverse proxy you can inject it:

```nginx
proxy_set_header 'X-Forwarded-Proto' 'https';
proxy_set_header 'Accept-Encoding' '';
sub_filter_once on;
sub_filter "</body>" '<script src="https://krav.github.io/clippy/clippy.js" type="text/javascript"></script></body>';
```

# TODO
  - "prettier" orb animation icon
  - encapsulate so it doesn't pollute the global scope
  - enforce position boundary (also on load, since screen size might have changed)
  - Maybe don't use backtick quote syntax
  - minify
  - preload background image
  - show account status and log out link
  - first timers guide is too big
  - throw some !important on the right CSS things so inherited styles don't break things
  - open links in new tab
  - different cursor
  
