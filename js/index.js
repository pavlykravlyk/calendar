// Get Elements from HTML 
const refs = {
    panelTitleEl: document.querySelector(".panel__title"),
    sliderTitleEl: document.querySelector(".slider__title"),
    dayCellEl: document.querySelectorAll(".table__body .day-cell"),
    tableHeadEl: document.querySelector(".table-head__row-js"),
    prevBtnEl: document.querySelector(".prev-btn-js"),
    nextBtnEl: document.querySelector(".next-btn-js"),
};
const { panelTitleEl, sliderTitleEl, dayCellEl, tableHeadEl, prevBtnEl, nextBtnEl } = refs;

// Create Date and Time Values
const date = new Date();
const today = new Date(date)
const monthNamesArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["M", "T", "W", "T", "F", "Sat", "Sun"];
const currentWeekDay = (day) => day.getDay() === 0 ? day.getDay() + 6 : day.getDay() - 1;
let datesArr = [];

// Push Values into HTML
panelTitleEl.innerText = `${date.getDate()} ${monthNamesArr[date.getMonth()]} ${date.getFullYear()}`;
sliderTitleEl.innerText = `${monthNamesArr[date.getMonth()]} ${date.getFullYear()}`;

const createCalenderHeaderMarkup = (days) => {
    return days.map(day => {
        return `<th class="table__cell"><span class="day-cell">${day}</span></th>`
    }).join("")
};
tableHeadEl.insertAdjacentHTML("beforeend", createCalenderHeaderMarkup(dayNames));

function createDatesArr() {
  datesArr = [];

    for (let i = 0; i < dayCellEl.length; i++) {
        dayCellEl[i].innerText = ""
        dayCellEl[i].style.opacity = "unset"
        dayCellEl[i].style.backgroundColor = "unset"
        dayCellEl[i].removeEventListener("mouseover", onMouseOver);
        dayCellEl[i].removeEventListener("mouseleave", onMouseLeave);
    };
    // Previous Days of the Month
    for (let i = new Date(date.getFullYear(), date.getMonth(), 0).getDate() - currentWeekDay(new Date(date.getFullYear(), date.getMonth(), 1)) + 1; i <= new Date(date.getFullYear(), date.getMonth(), 0).getDate(); i += 1) {
        datesArr.push(i);
        dayCellEl[new Date(date.getFullYear(), date.getMonth(), 0).getDate() - i].style.opacity = "0.6";
    };
    // Current Days of the Month
    for (let i = new Date(date.getFullYear(), date.getMonth(), 1).getDate(); i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i += 1) {
        datesArr.push(i);
        dayCellEl[i - 1 + currentWeekDay(new Date(date.getFullYear(), date.getMonth(), 1))].addEventListener("mouseover", onMouseOver);
        dayCellEl[i - 1 + currentWeekDay(new Date(date.getFullYear(), date.getMonth(), 1))].addEventListener("mouseleave", onMouseLeave)
    };
    // Next Days of the Month
    for (let i = currentWeekDay(new Date(date.getFullYear(), date.getMonth() + 1)) + 1; i <= 7; i += 1) {
        if (!currentWeekDay(new Date(date.getFullYear(), date.getMonth() + 1)) + 1 === 1) {
            datesArr.push(i - currentWeekDay(new Date(date.getFullYear(), date.getMonth() + 1)));
            dayCellEl[datesArr.length - 1].style.opacity = "0.6";
        }
    };

    datesArr.map((value, idx) => {
        dayCellEl[idx].innerText = value
    });

    if (date.toDateString() === today.toDateString()) {
        dayCellEl[date.getDate() + currentWeekDay(new Date(date.getFullYear(), date.getMonth(), 1)) - 1].style.backgroundColor = "var(--accent-color)";
    }
}
createDatesArr()

// Mouse Events
function onMouseOver(event) {
    event.target.style.backgroundColor = "var(--accent-color)";
    event.target.style.cursor = "pointer";
};

function onMouseLeave(event) {
    if (event.target !== dayCellEl[date.getDate() + currentWeekDay(new Date(date.getFullYear(), date.getMonth(), 1)) - 1] || date.toDateString() !== today.toDateString()) {
        event.target.style.backgroundColor = "unset";
        event.target.style.cursor = "unset"
    };
    
};

function onClick(event) {
    event.currentTarget.className === "slider__btn prev-btn-js" ? date.setMonth(date.getMonth() - 1) : date.setMonth(date.getMonth() + 1);
    sliderTitleEl.innerText = `${monthNamesArr[date.getMonth()]} ${date.getFullYear()}`;

    createDatesArr()
};

prevBtnEl.addEventListener("click", onClick);
nextBtnEl.addEventListener("click", onClick);