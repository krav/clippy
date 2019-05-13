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

