// Get Elements from HTML 
const panelTitleEl = document.querySelector(".panel__title");
const sliderTitleEl = document.querySelector(".slider__title");
const dayCellEl = document.querySelectorAll(".table__body .day-cell");


// Create Date and Time Values
const date = new Date();
const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthName = monthNames[currentMonth];
const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
const firstDayOfPrevMonth = new Date(currentYear, currentMonth - 1, 1);
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0);
const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1);
console.log(date)
const currentDay = date.getDay(firstDayOfCurrentMonth);

// Push Values into HTML
panelTitleEl.innerText = `${currentDate} ${currentMonthName} ${currentYear}`;
sliderTitleEl.innerText = `${currentMonthName} ${currentYear}`;

// Current Days of the Month
for (let i = firstDayOfCurrentMonth.getDate(); i <= lastDayOfMonth.getDate(); i += 1) {
    const idxDayCorr = (i - 1) + (currentDay - 1)
    console.log(i)
    dayCellEl[idxDayCorr].innerText = i;
    
    dayCellEl[idxDayCorr].addEventListener("mouseover", onMouseOver);
    dayCellEl[idxDayCorr].addEventListener("mouseleave", onMouseLeave)
};

// Previous Days of the Month
for (let i = 1; i < currentDay; i += 1) {
    dayCellEl[i - 1].innerText = (i + 1) + (lastDayOfMonth.getDate() - currentDay);
    dayCellEl[i - 1].style.opacity = "0.6";
}

// Mouse Events
function onMouseOver(event) {
    event.target.style.backgroundColor = "var(--accent-color)";
    event.target.style.cursor = "pointer";
}

function onMouseLeave(event) {
    event.target.style.backgroundColor = "unset";
    event.target.style.cursor = "unset"
}