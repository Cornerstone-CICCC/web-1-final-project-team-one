const chatButton = document.getElementById("chat-button");
const closeButton = document.getElementById("close-button");
const chatContactIcons = document.getElementById("chat-contact-icons");
const chatIcon = document.getElementById("chat-icon");

chatButton.addEventListener('click', () => {
	chatIcon.classList.remove("open");
	chatIcon.classList.add("close");
	chatContactIcons.classList.remove("close");
	chatContactIcons.classList.add("open");
})

closeButton.addEventListener('click', () => {
	chatContactIcons.classList.remove("open");
	chatContactIcons.classList.add("close");
	chatIcon.classList.remove("close");
	chatIcon.classList.add("open");
})

document.querySelectorAll(".fake-button").forEach(button => {
	button.addEventListener("click", () => {
		alert("Caught you! That button was a trap!")
	})
})