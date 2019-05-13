
.PHONY: all

all: docs/index.html docs/clippy.min.js

docs/index.html: README.md
	pandoc --self-contained README.md -o docs/index.html
	echo '<script src="clippy.js" type="text/javascript"></script>' >> docs/index.html

docs/clippy.js: src/mkclippy.sh src/menu.html src/menu.css src/main.js
	src/mkclippy.sh > docs/clippy.js

docs/clippy.min.js: docs/clippy.js
  #uglify

