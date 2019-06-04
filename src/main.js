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
    // CSRF-TOKEN=XqjDaPES4kOK0OP67YS9K786skxaJsMfvdRh7mm4fbwNo%2Bbdp%2Bn%2FXfvKyQ1eWXtnm0qmSnMIjgowyMIzILTjOg%3D%3D; ahoy_visit=141a3ca2-c861-48d8-aae0-be0926cbe3f2; ahoy_visitor=c0013e34-6583-4dfd-9108-9e6709ba08d9
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

