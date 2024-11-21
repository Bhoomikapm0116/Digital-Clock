const $ = (selector) => document.querySelector(selector);

const hour = $(".hour");
const dot = $(".dot");
const min = $(".min");
const week = $(".week");
const dayElement = $(".day");
const monthElement = $(".month");
const yearElement = $(".year");
const tickSound = document.getElementById("tickSound");
let showDot = true;

function update() {
    showDot = !showDot;
    const now = new Date();

    if (showDot) {
        dot.classList.add("invisible");
    } else {
        dot.classList.remove("invisible");
    }

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; 

    hour.textContent = String(hours).padStart(2, "0");
    min.textContent = minutes;

    Array.from(week.children).forEach((ele) => {
        ele.classList.remove("active");
    });
    week.children[now.getDay()].classList.add("active");

    console.log(amPm);
}

function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();

    dayElement.textContent = day;
    monthElement.textContent = month;
    yearElement.textContent = year;
}

function playTickSound() {
    if (tickSound.paused) {
        tickSound.currentTime = 0;  // Reset to the beginning if already playing
        tickSound.play();
    }
}

setInterval(update, 500);
update();

setInterval(updateDate, 60000);
updateDate();

setInterval(playTickSound, 1000);