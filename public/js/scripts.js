const burgerMenu = document.querySelector("#burger-menu"),
      menuShow = document.querySelector("#menu-show"),
      closeMenu = document.querySelector("#close-menu");

// Menu control

burgerMenu.addEventListener("click", () => {
    if(menuShow.classList.contains("menu-show")) {
        menuShow.classList.remove("menu-show");

        //has to close the resume and about section all together if it is not close.
        ClassChange(false, ".text-menu", "text-menu-hide");
        document.querySelector(".resume-hide").classList.remove("info-show");
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
    ClassChange(true, ".text-menu", "text-menu-hide");
    ClassChange(true, "." + dataInfo + "-hide", "info-show");
}

const backToMenu = (dataInfo) => {
    ClassChange(false, ".text-menu", "text-menu-hide");
    ClassChange(false, "." + dataInfo + "-hide", "info-show");
}

// copyright Section

const year = new Date().getFullYear();

document.querySelector(".copyright").textContent = "copyright@wai_leung " + year;

// Porfolio fade-in & Dots indicator

const cards = document.querySelectorAll(".sections"),
      goNext = document.querySelector("#goNext");

// This Observer serves for three different section.
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // get the data attributes from Title section and the rest of portfolio section
        let dotNum = entry.target.attributes[2].value;

        if(entry.intersectionRatio > 0) {
            //for the card fade-in
            entry.target.classList.add("card-container-show");
            //for the go next button at the bottom of Nav dots
            nextButton(entry, "data-dot", goNext);
            //for the Nav dots on the side
            if(dotNum === "d0"){
                ClassChange(true, ".d0", "port-visiting");
            } else {
                ClassChange(false, ".d0", "port-visiting");
                ClassChange(true, "." + dotNum, "dot-visiting");
            }
        } else {
            entry.target.classList.remove("card-container-show");
            ClassChange(false, "." + dotNum, "dot-visiting");
        }
    })
})

cards.forEach(card => {
    observer.observe(card);
})

function ClassChange (show, classId, classN) {
    show?
    document.querySelector(classId).classList.add(classN):
    document.querySelector(classId).classList.remove(classN);
}

function nextButton (par, data, id) {
    let num = par.target.getAttribute(data);
    id.setAttribute("href", "#toP" + (Number(num.slice(1)) + 1));
}

// background color change

const moons = document.querySelectorAll(".moon"),
      lights = document.getElementById("building-light"),
      menuLines = document.querySelectorAll(".burger-line");

let colorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
            document.body.style.backgroundColor = "#192a56";
            // for the building light in the rotating earth
            lights.textContent = ".cls-2{fill:#f9ca24;}"
            // for the burger menu color
            menuLines.forEach(line => {
                line.style.backgroundColor = "#fff";
            })
        } else {
            document.body.style.backgroundColor = "#dff9fb";
            lights.textContent = ".cls-2{fill:#1a1d21;}"
            menuLines.forEach(line => {
                line.style.backgroundColor = "#000";
            })
        }
    })
})

moons.forEach(moon => {
    colorObserver.observe(moon);
})


//message popup for email contact
const messageContainer = document.getElementById("message-container");
const messageCloseBtn = document.getElementById("message-close-btn");

messageCloseBtn.addEventListener("click", () => {
    messageContainer.classList.add('message-container-hide');
    console.log("click");
})


// Scroll button

// document.querySelector("#buttons").addEventListener("onclick", scrollWin = () => {
//     window.scrollTo({
//         top: heightOffset,
//         behavior: 'smooth'
//     })
// })

// document.querySelectorAll("#buttons").forEach(button => {
//     button.addEventListener("onclick", scrollWin = (y) => {
//         window.scrollTo({
//             top: y,
//         behavior: 'smooth'
//         });
//     }) 
// })

