const burgerMenu = document.querySelector("#burger-menu"),
      menuShow = document.querySelector("#menu-show"),
      closeMenu = document.querySelector("#close-menu");

// Menu control
burgerMenu.addEventListener("click", () => {
    if(menuShow.classList.contains("menu-show")) {
        menuShow.classList.remove("menu-show");

        //has to close the about section if it is not close.
        classChange(false, ".text-menu", "text-menu-hide");
        document.querySelector(".about-hide").classList.remove("info-show");
    } else {
        menuShow.classList.add("menu-show");
    }
});

closeMenu.addEventListener("click", () => {
    menuShow.classList.remove("menu-show");
})


// resume fade-in control
const goToInfo = (dataInfo) => {
    classChange(true, ".text-menu", "text-menu-hide");
    classChange(true, "." + dataInfo + "-hide", "info-show");
}

const backToMenu = (dataInfo) => {
    classChange(false, ".text-menu", "text-menu-hide");
    classChange(false, "." + dataInfo + "-hide", "info-show");
}


// copyright Section
const year = new Date().getFullYear();

document.querySelector(".copyright").textContent = "copyright@wai_leung " + year;


// Dots indicator
const cards = document.querySelectorAll(".sections"),
      goNext = document.querySelector("#goNext");


//message popup for email contact
const messageContainer = document.getElementById("message-container");
const messageCloseBtn = document.getElementById("message-close-btn");

messageCloseBtn.addEventListener("click", () => {
    messageContainer.classList.remove('message-container-show');
})


// This Observer serves for three different section.
const moons = document.querySelectorAll(".moon"),
      lights = document.getElementById("building-light"),
      burgerMenuLines = document.querySelectorAll(".burger-line"),
      titleText = document.querySelectorAll(".title-text"),
      sunMoonSvg = document.getElementById("sun-moon-svg");


let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // get the data attributes from Title section and the rest of portfolio section
        let dotNum = entry.target.attributes[2].value;
        // console.log(entries)
        if(entry.intersectionRatio > 0) {
            // for background color change
            colorChangeByTime(entry, "data-time");
            //for the go next button at the bottom of Nav dots
            nextButton(entry, "data-dot", goNext);
            //for the Nav dots on the side
            if(dotNum === "d0"){
                classChange(true, ".d0", "port-visiting");
            } else {
                classChange(false, ".d0", "port-visiting");
                classChange(true, "." + dotNum, "dot-visiting");
            }
        } else {
            entry.target.classList.remove("card-container-show");
            classChange(false, "." + dotNum, "dot-visiting");
        }
    })
})

cards.forEach(card => {
    observer.observe(card);
})

function classChange (show, classId, classN) {
    show?
    document.querySelector(classId).classList.add(classN):
    document.querySelector(classId).classList.remove(classN);
}

function nextButton (par, data, id) {
    let num = par.target.getAttribute(data);
    id.setAttribute("href", "#toP" + (Number(num.slice(1)) + 1));
}

function colorChangeByTime (par, data) {
    let time = par.target.getAttribute(data);
    if (time === "moon") {
        // change the background color to night time
        document.body.style.backgroundColor = "#192a56";
        // turn on building light in the rotating earth
        lights.textContent = ".cls-2{fill:#f9ca24;}"
        // for the burger menu color
        burgerMenuLines.forEach(line => {
            line.style.backgroundColor = "#fff";
        });
        // for title color change to white
        titleText.forEach(text => {
            text.style.color = "#fff";
        });
        // change sun.svg to moon.svg
        sunMoonSvg.setAttribute("xlink:href", "img/moon.svg");
    } else {
        // change the background color to day time
        document.body.style.backgroundColor = "#dff9fb";
        // turn off building lights in the rotating earth
        lights.textContent = ".cls-2{fill:#1a1d21;}"
        burgerMenuLines.forEach(line => {
            line.style.backgroundColor = "#000";
        });
        // for title color change to back to black
        titleText.forEach(text => {
            text.style.color = "#000";
        });
        // change moon.svg back to sun.svg
        sunMoonSvg.setAttribute("xlink:href", "img/sun.svg");
    }
}


