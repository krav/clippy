const Clippy = obj => {
    const styleSheet = obj.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `#blc_menu {
    all: initial;
    background-image: url("https://menu.theborderland.se/bg.gif");
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
    all: initial;
    z-index: 9998;
    width: 50px;
    height: 50px;
    background-size: 50px;
    background-image: url("https://menu.theborderland.se/compass.gif");
//    background-image: url("compass.gif");
    border: 1px solid rgba(136, 136, 136, .5);
    //background-color: rgb(245, 230, 99);
    border-radius: 50%;
    touch-action: none;
    user-select: none;
    position: absolute;
}

@media screen and (max-width: 350px) {
    #blc_clippy {
        display: none;
    }
}

#blc_clippy:active { // FIXME no worky on touchy
                     background-color: rgba(168, 218, 220, 1.00);
                   }

#blc_clippy:hover {
    cursor: move;
    border-width: 20px;
}`;
    obj.head.appendChild(styleSheet);

    const menu = obj.createElement("div");
    menu.id = "blc_menu";
    menu.innerHTML = `<div id="blc_cols">
    <div id="blc_header">
        <img src="https://menu.theborderland.se/header.gif" alt="Borderland Navigation" />
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a target="_blank" href="https://talk.theborderland.se">
                <img src="https://menu.theborderland.se/talk.gif" alt="Talk" />
            </a>
        </div>

        <div class="blc_btn">
            <div class="blc_btn">
                <a target="_blank" href="http://realities.theborderland.se">
                    <img src="https://menu.theborderland.se/realities.gif" alt="Realities" />
                </a>
            </div>
        </div>
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a target="_blank" href="https://dreams.theborderland.se">
                <img src="https://menu.theborderland.se/dreams.gif" alt="Dreams" />
            </a>
        </div>

       <div class="blc_btn">
            <div class="blc_btn">
                <a target="_blank" href="https://account.theborderland.se/auth/realms/master/account">
                    <img src="https://menu.theborderland.se/account.gif" alt="Account" />
                </a>
            </div>
        </div>
    </div>

    <div class="blc_row">
        <div class="blc_btn">
            <a target="_blank" href="https://memberships.theborderland.se">
                <img src="https://menu.theborderland.se/memberships.gif" alt="Memberships" />
            </a>
        </div>
        <div class="blc_btn">
            <div class="blc_btn">
                <a target="_blank" href="https://theborderland.se">
                    <img src="https://menu.theborderland.se/website.gif" alt="General Info" />
                </a>
            </div>
        </div>
    </div>

    <!--
    <div class="blc_row">
        <div class="blc_btn">
            <a target="_blank" href="https://talk.theborderland.se/d/RWGSpxMj/first-timers-guide">
                <img src="https://menu.theborderland.se/firsttime.gif" alt="First Timers Guide" />
            </a>
        </div>

    </div>
    -->


    <div class="blc_row">
        <div class="blc_btn">
            [ <a target="_blank" href="https://menu.theborderland.se/readme.html"> π pull requests </a> ]
        </div>
        <div class="blc_btn">
            [ <a onclick="blc_clippy.hide()">
            🌚 hide orb
            </a> ]
        </div>
        <div class="blc_btn">
            [ <a onclick="blc_clippy.destroy()">
                ☢ destroy orb
            </a> ]
        </div>


    </div>
</div>
<audio id="blc_sound" src="external.mp3"></audio>`;
    obj.body.appendChild(menu);

    const clippy = obj.createElement("div");
    clippy.id = "blc_clippy";
    obj.body.appendChild(clippy);

    // Drag code inspired by https://www.kirupa.com/html5/drag.htm

const cookieparams = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; //; path=/; domain=." + (document.domain.match(/[^\.]*\.[^.]*$/)[0])  + ";";
const dragItem = document.querySelector("#blc_clippy");
const menuDiv = document.querySelector("#blc_menu");
var active = false;
var initialX;
var initialY;
var prevX;
var prevY;

const resetPosition = () => {
    var rect = dragItem.getBoundingClientRect();
    if (
        (rect.x + rect.width) < 0
        || (rect.y + rect.height) < 0
        || (rect.x > window.innerWidth)
        || (rect.y > window.innerHeight)
       ) {
        xOffset = document.documentElement.clientWidth-160;
        yOffset = document.documentElement.clientHeight-dragItem.offsetTop-160;
        setTranslate(xOffset, yOffset, dragItem);
    }
};

const getCookie = (a) => {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
};

const showMenu = (e) => {
    history.pushState("", "", "#borderland_menu");
    document.querySelector("#blc_menu").style.display = "block";
    //document.getElementById("blc_sound").play();
};

const hideMenu = () => {
    window.history.back();
};

const hideClippy = (e) => {
    dragItem.style.display = "none";
};

const dragStart = (e) => {
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
};

const dragEnd = (e) => {
    if (prevX == xOffset && prevY == yOffset) {
        e.preventDefault();
        showMenu();
    };
    active = false;
};

const drag = (e) => {
    if (active) {
        e.preventDefault();

        if (e.type === "touchmove") {
            xOffset = e.touches[0].clientX - initialX;
            yOffset = e.touches[0].clientY - initialY;
        } else {
            xOffset = e.clientX - initialX;
            yOffset = e.clientY - initialY;
        }

        document.cookie = "blc_xoff=" + xOffset + cookieparams;
        document.cookie = "blc_yoff=" + yOffset + cookieparams;
        setTranslate(xOffset, yOffset, dragItem);
    }
};

const setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};

var xOffset = getCookie("blc_xoff");
var yOffset = getCookie("blc_yoff");


if (getCookie("blc_destroy")) {
    hideClippy(undefined);
}

// Initialise
setTranslate(xOffset, yOffset, dragItem);
resetPosition();

window.onresize = resetPosition;
menuDiv.addEventListener("click", hideMenu, false);
dragItem.addEventListener("touchstart", dragStart, false);
dragItem.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

dragItem.addEventListener("mousedown", dragStart, false);
dragItem.addEventListener("mouseup", dragEnd, false);
// This has to be on document because the cursor can slip off the element
document.addEventListener("mousemove", drag, false);
window.addEventListener('popstate', e => {
    if (menuDiv.style.display == "block") {
        document.querySelector("#blc_menu").style.display = "none";
        //document.getElementById("blc_sound").pause();
    };
});

return {
    hide: hideClippy,
    destroy: function() {
        document.cookie = "blc_destroy=true" + cookieparams;
        hideClippy(undefined);
    }
};
}
const blc_clippy = Clippy(document);
