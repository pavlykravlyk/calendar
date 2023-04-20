// Get Elements from HTML 
const panelTitleEl = document.querySelector(".panel__title");
const sliderTitleEl = document.querySelector(".slider__title");
const dayCellEl = document.querySelectorAll(".table__body .day-cell");

// Create Date and Time Values
const date = new Date();

const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const currentDay = date.getDay();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthName = monthNames[currentMonth];

const firstDayOftMonth = new Date(currentYear, currentMonth, 1);
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

// Push Values into HTML
panelTitleEl.innerText = `${currentDate} ${currentMonthName} ${currentYear}`;
sliderTitleEl.innerText = `${currentMonthName} ${currentYear}`;

for (let i = firstDayOftMonth.getDate(); i <= lastDayOfMonth.getDate(); i += 1) {
    dayCellEl[i + currentDay].innerText = i;
};
