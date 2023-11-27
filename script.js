//user input
const birthDay = document.getElementById("birth-day");
const birthMonth = document.getElementById("birth-month");
const birthYear = document.getElementById("birth-year");

//today's date
const date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1; // add one because array starts at 0
let currentYear = date.getFullYear();

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

const form = document.querySelector("form");

function validate() {
	const inputs = document.querySelectorAll("input");
	const dayInMonth = daysInMonth(birthMonth.value, birthYear.value);
	console.log(dayInMonth);
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
			currentMonth--;
		}
		if (birthMonth.value > currentMonth) {
			currentMonth += 12;
			currentYear--;
		}

		let d = currentDay - birthDay.value;
		let m = currentMonth - birthMonth.value;
		let y = currentYear - birthYear.value;

		document.getElementById("years").innerHTML = y;
		document.getElementById("months").innerHTML = m;
		document.getElementById("days").innerHTML = d;
	}
}

form.addEventListener("submit", handleSubmit);
