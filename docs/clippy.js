const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `#blc_menu {
    background-color: aqua;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 9999;
    cursor: pointer;
    display: none;

}
#blc_header {
    justify-content: center;
    display: flex;
}
#blc_cols {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.blc_row {
    justify-content: space-between;
    display: flex;
}
.blc_btn {
}

#blc_clippy {
    z-index: 9998;
    width: 100px;
    height: 100px;
    background-color: rgb(245, 230, 99);
    border: 10px solid rgba(136, 136, 136, .5);
    border-radius: 50%;
    touch-action: none;
    user-select: none;
}
#blc_clippy:active { // FIXME no worky on touchy
                     background-color: rgba(168, 218, 220, 1.00);
                   }
#blc_clippy:hover {
    cursor: move;
    border-width: 20px;
}
body {
    height: 100%;
    width: 100%;
}`;
document.head.appendChild(styleSheet);

const menu = document.createElement("div");
menu.id = "blc_menu";
menu.innerHTML = `<div id="blc_cols">
    <div id="blc_header">
        <img src="header.gif" alt="Borderland Navigation" />
    </div>
    <div class="blc_row">
        <div class="blc_btn">
            <a href="https://dreams.theborderland.se">
                <img src="dreams.gif" alt="Dreams" />
            </a>
        </div>
        <div class="blc_btn">
            <div class="blc_btn">
                <a href="https://realities.theborderland.se">
                    <img src="realities.gif" alt="Realities" />
                </a>
            </div>
        </div>
    </div>
    <div class="blc_row">
        <div class="blc_btn">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/skull-and-crossbones.svg" alt="" />
        </div>
        <div class="blc_btn">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/skull-and-crossbones.svg" alt="" />
        </div>
    </div>
    <div class="blc_row">
        <div class="blc_btn">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/skull-and-crossbones.svg" alt="" />
        </div>
        <div class="blc_btn">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/skull-and-crossbones.svg" alt="" />
        </div>
    </div>


    <div class="blc_row">
        <div class="blc_btn">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/skull-and-crossbones.svg" alt="" />
        </div>
    </div>


    <div class="blc_row">
    </div>
    <div class="blc_row">
    </div>
</div>`;
document.body.appendChild(menu);

const clippy = document.createElement("div");
clippy.id = "blc_clippy";
document.body.appendChild(clippy);
// Drag code inspired by https://www.kirupa.com/html5/drag.htm

var dragItem = document.querySelector("#blc_clippy");
var menuDiv = document.querySelector("#blc_menu");
var active = false;
var initialX;
var initialY;
var prevX;
var prevY;
var xOffset = 0;
var yOffset = 0;

menuDiv.addEventListener("click", hideMenu, false);
dragItem.addEventListener("touchstart", dragStart, false);
dragItem.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

dragItem.addEventListener("mousedown", dragStart, false);
dragItem.addEventListener("mouseup", dragEnd, false);
// This has to be on document because the cursor can slip off the element
document.addEventListener("mousemove", drag, false);

function hideMenu(e) {
    console.log(e);
    document.querySelector("#blc_menu").style.display = "none";
}

function showMenu(e) {
    console.log(e);
    document.querySelector("#blc_menu").style.display = "block";
}

function dragStart(e) {
    console.log(e);
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    prevX = xOffset; prevY = yOffset;

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    console.log(e);
    if (prevX == xOffset && prevY == yOffset) {
        e.preventDefault();
        showMenu();
    };
    active = false;
}

function drag(e) {
    if (active) {
        e.preventDefault();

        if (e.type === "touchmove") {
            xOffset = e.touches[0].clientX - initialX;
            yOffset = e.touches[0].clientY - initialY;
        } else {
            xOffset = e.clientX - initialX;
            yOffset = e.clientY - initialY;
        }
        // c = document.documentElement;
        // if (xOffset < 0 || yOffset < 0 || xOffset > c.clientWidth || yOffset > c.clientHeight ) {
        //     console.log("booop");
        //     console.log(c.scrollWidth);
        //     console.log(xOffset);
        //     console.log(c.scrollHeight);
        //     console.log(yOffset);
        //     return
        // }

        setTranslate(xOffset, yOffset, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

