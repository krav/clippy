const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `#blc_menu {
    background-image: url("https://krav.github.io/clippy/bg.gif");
    background-repeat: repeat;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 9999;
    cursor: pointer;
    display: none;
    color: green;
    padding: 5%;
}
#blc_header {
    justify-content: center;
    display: flex;
}
@media screen and (min-width: 700px) {
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
}

.blc_btn a {
    cursor: help;
}

#blc_clippy {
    z-index: 9998;
    width: 100px;
    height: 100px;
    background-size: 100px;
    background-image: url("https://krav.github.io/clippy/compass.gif");
    border: 1px solid rgba(136, 136, 136, .5);
    //background-color: rgb(245, 230, 99);
    border-radius: 50%;
    touch-action: none;
    user-select: none;
    position: absolute;
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
        <img src="https://krav.github.io/clippy/header.gif" alt="Borderland Navigation" />
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a href="https://dreams.theborderland.se">
                <img src="https://krav.github.io/clippy/dreams.gif" alt="Dreams" />
            </a>
        </div>
        <div class="blc_btn">
            <div class="blc_btn">
                <a href="https://realities.theborderland.se">
                    <img src="https://krav.github.io/clippy/realities.gif" alt="Realities" />
                </a>
            </div>
        </div>
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a href="https://talk.theborderland.se">
                <img src="https://krav.github.io/clippy/talk.gif" alt="Talk" />
            </a>
        </div>
        <div class="blc_btn">
            <div class="blc_btn">
                <a href="https://account.theborderland.se/auth/realms/master/account">
                    <img src="https://krav.github.io/clippy/account.gif" alt="Account" />
                </a>
            </div>
        </div>
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a href="https://memberships.theborderland.se">
                <img src="https://krav.github.io/clippy/memberships.gif" alt="Memberships" />
            </a>
        </div>
        <div class="blc_btn">
            <div class="blc_btn">
                <a href="https://theborderland.se">
                    <img src="https://krav.github.io/clippy/website.gif" alt="General Info" />
                </a>
            </div>
        </div>
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a href="https://talk.theborderland.se/d/RWGSpxMj/first-timers-guide">
                <img src="https://krav.github.io/clippy/firsttime.gif" alt="First Timers Guide" />
            </a>
        </div>

    </div>


    <div class="blc_row">
        <div class="blc_btn"></div>
        <div class="blc_btn" style="font-size: 20pt; font-weight: bold">
            <a onclick="hideClippy()">
                ☢️ Permanently Destroy Navigation Orb
            </a>
        </div>
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
var xOffset = getCookie("blc_xoff") || document.documentElement.clientWidth-300;
var yOffset = getCookie("blc_yoff") || -dragItem.offsetTop+100;
const cookieparams = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; //; path=/; domain=." + (document.domain.match(/[^\.]*\.[^.]*$/)[0])  + ";";

menuDiv.addEventListener("click", hideMenu, false);
dragItem.addEventListener("touchstart", dragStart, false);
dragItem.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

dragItem.addEventListener("mousedown", dragStart, false);
dragItem.addEventListener("mouseup", dragEnd, false);
// This has to be on document because the cursor can slip off the element
document.addEventListener("mousemove", drag, false);

setTranslate(xOffset, yOffset, dragItem);

console.log("xoff: " + xOffset);
console.log("yoff:" + yOffset);

function getCookie(c) {
    // FIXME
    return document.cookie.replace(new RegExp('.*' + c + "\s*\=\s*([^;]*).*"), "$1");
}

function hideMenu(e) {
    document.querySelector("#blc_menu").style.display = "none";
}

function showMenu(e) {
    document.querySelector("#blc_menu").style.display = "block";
}

function hideClippy(e) {
    // TODO store cookie
    dragItem.style.display = "none";
}

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    console.log("cientX: " + e.clientX);
    prevX = xOffset; prevY = yOffset;

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
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

        document.cookie = "blc_xoff=" + xOffset + cookieparams;
        document.cookie = "blc_yoff=" + yOffset + cookieparams;
        setTranslate(xOffset, yOffset, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

