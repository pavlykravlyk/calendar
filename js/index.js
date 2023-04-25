// Get Elements from HTML 
const refs = {
    panelTitleEl: document.querySelector(".panel__title"),
    sliderTitleEl: document.querySelector(".slider__title"),
    dayCellEl: document.querySelectorAll(".table__body .day-cell"),
    tableHeadEl: document.querySelector(".table-head__row-js"),
};
const { panelTitleEl, sliderTitleEl, dayCellEl, tableHeadEl } = refs;

// Create Date and Time Values
const date = new Date();
const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["M", "T", "W", "T", "F", "Sat", "Sun"]
const currentMonthName = monthNames[currentMonth];
const currentWeekDay = (day) => day.getDay() === 0 ? day.getDay() + 6 : day.getDay() - 1;
const datesArr = [];

const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
const firstDayOfPrevMonth = new Date(currentYear, currentMonth - 1, 1);
const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0);
const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1);

// Push Values into HTML
panelTitleEl.innerText = `${currentDate} ${currentMonthName} ${currentYear}`;
sliderTitleEl.innerText = `${currentMonthName} ${currentYear}`;

const createCalenderHeaderMarkup = (weekDays) => {
    return weekDays.map(weekDay => {
        return `<th class="table__cell"><span class="day-cell">${weekDay}</span></th>`
    }).join("")
};
tableHeadEl.insertAdjacentHTML("beforeend", createCalenderHeaderMarkup(dayNames));

// Previous Days of the Month
for (let i = lastDayOfPrevMonth.getDate() - currentWeekDay(firstDayOfCurrentMonth) + 1; i <= lastDayOfPrevMonth.getDate(); i += 1) {
    datesArr.push(i);
    dayCellEl[lastDayOfPrevMonth.getDate() - i].style.opacity = "0.6";
};
// Current Days of the Month
for (let i = firstDayOfCurrentMonth.getDate(); i <= lastDayOfCurrentMonth.getDate(); i += 1) {
    datesArr.push(i);
    dayCellEl[i - 1 + currentWeekDay(firstDayOfCurrentMonth)].addEventListener("mouseover", onMouseOver);
    dayCellEl[i - 1 + currentWeekDay(firstDayOfCurrentMonth)].addEventListener("mouseleave", onMouseLeave)
};
// Next Days of the Month
for (let i = currentWeekDay(firstDayOfNextMonth) + 1; i <= 7; i += 1) {
    if (!currentWeekDay(firstDayOfNextMonth) + 1 === 1) {
        datesArr.push(i - currentWeekDay(firstDayOfNextMonth));
        dayCellEl[datesArr.length - 1].style.opacity = "0.6";
    }
};

datesArr.map((value, idx) => dayCellEl[idx].innerText = value)

// Mouse Events
function onMouseOver(event) {
    event.target.style.backgroundColor = "var(--accent-color)";
    event.target.style.cursor = "pointer";
    };

function onMouseLeave(event) {
    event.target.style.backgroundColor = "unset";
    event.target.style.cursor = "unset"
    };