//user input
const birthDay = document.getElementById("birth-day");
const birthMonth = document.getElementById("birth-month");
const birthYear = document.getElementById("birth-year");

//today's date
const date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1; // add one because array starts at 0
let currentYear = date.getFullYear();

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

const monthDays = [
	daysInMonth(1, currentYear),
	daysInMonth(2, currentYear),
	daysInMonth(3, currentYear),
	daysInMonth(4, currentYear),
	daysInMonth(5, currentYear),
	daysInMonth(6, currentYear),
	daysInMonth(7, currentYear),
	daysInMonth(8, currentYear),
	daysInMonth(9, currentYear),
	daysInMonth(10, currentYear),
	daysInMonth(11, currentYear),
	daysInMonth(12, currentYear),
];

function validate() {
	const inputs = document.querySelectorAll("input");
	const dayInMonth = daysInMonth(birthMonth.value, birthYear.value);
	let validator = true;
	inputs.forEach((i) => {
		const parent = i.parentElement;
		if (!i.value) {
			i.style.borderColor = "#ff5757";
			parent.querySelector("label").style.color = "#ff5757";
			parent.querySelector("small").innerText = "This field is required";
			validator = false;
		} else {
			i.style.borderColor = "black";
			parent.querySelector("label").style.color = "#716f6f";
			parent.querySelector("small").innerText = "";
			validator = true;
		}
		if (birthMonth.value > 12) {
			birthMonth.style.borderColor = "#ff5757";
			birthMonth.parentElement.querySelector("small").innerText =
				"Must be valid month";
			validator = false;
		}
		// max days in a month is 31 or if the day is not in the month (ex. 31 of april)
		if (birthDay.value > 31 || birthDay.value > dayInMonth) {
			birthDay.style.borderColor = "#ff5757";
			birthDay.parentElement.querySelector("small").innerText =
				"Must be valid day";
			validator = false;
		}
		if (birthYear.value > currentYear) {
			birthYear.style.borderColor = "#ff5757";
			birthYear.parentElement.querySelector("small").innerText =
				"Must be in the past";
			validator = false;
		}
	});
	return validator;
}

function handleSubmit(e) {
	e.preventDefault();
	if (validate()) {
		if (birthDay.value > currentDay) {
			currentDay += monthDays[currentMonth - 1];
			console.log(currentDay);
			currentMonth = currentMonth - 1;
		}

		if (birthMonth.value > currentMonth) {
			currentMonth += 12;
			currentYear = currentYear - 1;
		}

		let d = currentDay - birthDay.value;
		let m = currentMonth - birthMonth.value;
		let y = currentYear - birthYear.value;

		/* if user inputs the day after the current day, the correct age is calculated.
		if user inputs any previous days without refreshing the page,
		the calculation of the user's age in days is not reset.

		example. today is 27 november 2023.
		the correct age will be calculated if the user inputs 28 november 2023 and submits this date.
		if user inputs 27 november 2023 and submits right after the previous submit, 
		it results in 22 years 10 months 31 days instead of 23 years 0 months 0 days. */
		// these if statements is to try and correct that
		if (d > 30) {
			d -= 31;
			m += 1;
		}

		if (m > 11) {
			m -= 12;
			y += 1;
		}

		document.getElementById("years").innerHTML = y;
		document.getElementById("months").innerHTML = m;
		document.getElementById("days").innerHTML = d;
	}
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
