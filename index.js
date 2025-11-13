document.querySelector("#hairstyle").addEventListener("click", () => {
    console.log("clicked")
    const hairButton = document.querySelector("#hairstyle");
    const makeupButton = document.querySelector("#makeup");
    hairButton.classList.add("border-bottom")
    makeupButton.classList.remove("border-bottom")
    const images = document.querySelectorAll("img");
    images.forEach((img, index) => {
        img.setAttribute("src", `../assets/portfolio/hair/hair${index + 1}.png`)
    })
})

document.querySelector("#makeup").addEventListener("click", () => {
    console.log("clicked")
    const hairButton = document.querySelector("#hairstyle");
    const makeupButton = document.querySelector("#makeup");
    hairButton.classList.remove("border-bottom")
    makeupButton.classList.add("border-bottom")
    const images = document.querySelectorAll("img");
    images.forEach((img, index) => {
        img.setAttribute("src", `../assets/portfolio/makeup/makeup${index + 1}.png`)
    })
})

