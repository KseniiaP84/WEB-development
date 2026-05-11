

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
}

document.querySelector(".next").addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
});

document.querySelector(".prev").addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});

setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
}, 3000);
