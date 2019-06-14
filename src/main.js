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
