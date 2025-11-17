const eventDate = document.getElementById('event-date');
const eventDateText = document.getElementById('event-date-text');
const datePicker = document.getElementById('date-picker');

datePicker.addEventListener("click", () => {
	eventDate.showPicker();
})

eventDate.addEventListener("change", () => {
	if (eventDate.value) {
		const date = new Date(eventDate.value);

		const options = { day: "2-digit", month: "short", year: "numeric", weekday: "short" };
		const formatted = date.toLocaleDateString("en-US", options);

		const [weekday, month, day, year] = formatted
			.replace(",", "")
			.split(" ");

		const finalText = `${day} ${month} ${year} (${weekday})`;
		eventDateText.textContent = finalText;
		eventDateText.style.color = 'black';
	} else {
		eventDateText.textContent = "Select Date";
		eventDateText.style.color = '#00000040';
	}
});

const eventDateCheckbox = document.getElementById('event-date-checkbox-input');
const eventDateCheckboxIcon = document.getElementById('event-date-checkbox-icon')

document.getElementById('event-date-checkbox').addEventListener("click", () => {
	if (eventDateCheckbox.value === "1") { // on -> off
		eventDateCheckbox.value = "0";
		eventDateCheckboxIcon.style.opacity = 0;
		datePicker.removeAttribute("disabled");
	} else { // off -> on
		eventDateCheckbox.value = "1";
		eventDateCheckboxIcon.style.opacity = 100;
		datePicker.setAttribute("disabled", "true");
	}
})

const eventTimeCheckbox = document.getElementById('event-time-checkbox-input');
const eventTimeCheckboxIcon = document.getElementById('event-time-checkbox-icon')
const eventTimeInput = document.getElementById("event-time-input");
const eventTime = document.getElementById("event-time");

document.getElementById('event-time-checkbox').addEventListener("click", () => {
	if (eventTimeCheckbox.value === "1") { // on -> off
		eventTimeCheckbox.value = "0";
		eventTimeCheckboxIcon.style.opacity = 0;
		eventTime.removeAttribute("disabled");
		eventTimeInput.classList.remove("disabled")
	} else { // off -> on
		eventTimeCheckbox.value = "1";
		eventTimeCheckboxIcon.style.opacity = 100;
		eventTime.setAttribute("disabled", "true");
		eventTimeInput.classList.add("disabled")
	}
})

const eventTypeButton = document.querySelectorAll('.event-type-button');
let checkedButton = null;
eventTypeButton.forEach(button => {
	// check default one
	if (button.classList.contains("checked")) {
		checkedButton = button;
		button.setAttribute("disabled", "true");
	}
	button.addEventListener("click", () => {
		// uncheck previous one
		checkedButton.classList.remove("checked");
		checkedButton.classList.add("unchecked");
		checkedButton.removeAttribute("disabled")
		checkedButton.querySelector('input').removeAttribute("checked");
		// check current one
		if (button.classList.contains('unchecked')) {
			button.classList.remove("unchecked");
			button.classList.add("checked");
			button.setAttribute("disabled", "true");
			button.querySelector('input').setAttribute("checked", "true");
			checkedButton = button;
		}
	})
})

const contactOption = document.querySelectorAll('.contact-input-option');
let checkedContactOption = null;
contactOption.forEach(option => {
	// check default one
	const button = option.querySelector('.contact-option-button');
	if (option.classList.contains("checked")) {
		checkedContactOption = option;
		button.setAttribute("disabled", "true");
	}
	button.addEventListener("click", () => {
		// uncheck previous one
		checkedContactOption.classList.remove("checked");
		checkedContactOption.classList.add("unchecked");
		const checkedContactOptionButton = checkedContactOption.querySelector('.contact-option-button');
		checkedContactOptionButton.removeAttribute("disabled")
		checkedContactOptionButton.querySelector('input').removeAttribute("checked");
		const parentOption = button.parentElement.parentElement;
		// check current one
		if (parentOption.classList.contains('unchecked')) {
			parentOption.classList.remove("unchecked");
			parentOption.classList.add("checked");
			button.setAttribute("disabled", "true");
			button.querySelector('input').setAttribute("checked", "true");
			checkedContactOption = parentOption;
		}
	})
})

const phoneNumberInputs = document.querySelectorAll(".phone-number");
phoneNumberInputs.forEach(phoneNumberInput => {
	phoneNumberInput.addEventListener("input", () => {
		let digits = phoneNumberInput.value.replace(/\D/g, "");

		if (digits.length > 3 && digits.length <= 7) {
			phoneNumberInput.value = digits.slice(0, 3) + "-" + digits.slice(3);
		} else if (digits.length > 7) {
			phoneNumberInput.value =
				digits.slice(0, 3) +
				"-" +
				digits.slice(3, 7) +
				"-" +
				digits.slice(7, 11);
		} else {
			phoneNumberInput.value = digits;
		}
	});
})

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", event => {
	event.preventDefault();

	// Get event type
	const eventType = document.querySelector("input[name='event-type']:checked")?.value;

	// Event date
	const eventDate = document.getElementById("event-date-checkbox-input").value === "1"
		? "Not decided"
		: document.getElementById("event-date").value;

	// Event time
	const eventTime = document.getElementById("event-time-checkbox-input").value === "1"
		? "Not decided"
		: document.getElementById("event-time").value;

	// Name
	const name = document.getElementById("name").value;

	// Contact method (call / whatsapp / sms / email)
	const contactMethod = document.querySelector("input[name='contact-method']:checked")?.value;

	// Contact detail based on selection
	let emailAddress = "";
	if (contactMethod === "email") {
		emailAddress = document.getElementById("email-address").value;
	}

	const templateParams = {
		event_type: eventType,
		event_date: eventDate,
		event_time: eventTime,
		name,
		contactMethod,
		email: emailAddress,
	}

	const errorMessage = validate(templateParams);
	if (errorMessage.length > 0) {
		alert(errorMessage)
		return
	}

	emailjs.send("service_x3i9fnj", "template_8zd6m9c", templateParams)
		.then(() => {
			alert("Your message has been sent successfully!");
		})
		.catch((error) => {
			console.error("EmailJS Error: ", error);
			alert("Failed to send message. Try again later.");
		});
})

function validate({ event_type, event_date, event_time, name, contactMethod, email }) {
	if (event_type.trim() === "") return "Please select Event Type.";
	if (event_date.trim() === "") return "Please enter Event Date.";
	if (event_time.trim() === "") return "Please select Event Time.";
	if (name.trim() === "") return "Please enter your name.";
	if (["call", "whatsapp", "sms"].includes(contactMethod)) return "Call, WhatsApp and SMS are not supported. Please select Email.";
	if (email.trim() === "") return "Please enter your email address."
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter correct email address."
	return "";
}