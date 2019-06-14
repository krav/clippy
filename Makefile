
.PHONY: all

all: docs/index.html docs/clippy.min.js docs/readme.html

docs/readme.html: README.md
	pandoc --self-contained README.md -o docs/readme.html
	echo '<script src="clippy.js" type="text/javascript"></script>' >> docs/readme.html

docs/clippy.js: src/mkclippy.sh src/menu.html src/menu.css src/main.js
	src/mkclippy.sh > docs/clippy.js

docs/clippy.min.js: docs/clippy.js
  #uglify

docs/index.html: src/menu.html src/mkindex.sh
	src/mkindex.sh > docs/index.html

