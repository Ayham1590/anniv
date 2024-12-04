let currentIndex = 0;



const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe5IaeFvp-dyAYEVLEqzhpkdX5XkL7y0lAdQbADmIej1lrIUQ/viewform?usp=pp_url&entry.1652906474=Voucher+Name:+Test&entry.1770646240=Timestamp:+2024-12-04T12:34:56Z';

function logVoucherToGoogleForms(voucher) {
    const formData = new URLSearchParams();
    formData.append('entry.1652906474', voucher); // Replace with the field ID for Voucher
    formData.append('entry.1770646240', new Date().toISOString()); // Replace with the field ID for Timestamp

    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData
    })
        .then(() => console.log('Logged to Google Forms'))
        .catch(error => console.error('Error logging to Google Forms:', error));
}


function showPopup(voucher) {
    const popup = document.getElementById('popup');
    popup.querySelector('.popup-content p:first-child').textContent = `🎉 Congratulations! You chose "${voucher}"!`;
    popup.classList.remove('hidden');

    // Log voucher to Google Forms
    logVoucherToGoogleForms(voucher);
}


function updateCarousel() {
    const slides = document.querySelector('.carousel-slides');
    if (!slides || !slides.children[0]) {
        console.error("Carousel slides not found");
        return;
    }
    const slideWidth = slides.children[0].offsetWidth; // Get width of one slide
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    const slides = document.querySelector('.carousel-slides');
    if (!slides) return;
    const slideCount = slides.children.length;
    currentIndex = (currentIndex + 1) % slideCount; // Increment index with wrapping
    updateCarousel();
}

function prevSlide() {
    const slides = document.querySelector('.carousel-slides');
    if (!slides) return;
    const slideCount = slides.children.length;
    currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Decrement index with wrapping
    updateCarousel();
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.classList.add('hidden');
}

document.querySelectorAll('.carousel-slides img').forEach(image => {
    image.addEventListener('click', () => {
        openImagePopup(image.src, image.getAttribute('data-description'));
    });
});

function openImagePopup(src, description) {
    const popup = document.getElementById('image-popup');
    if (!popup) return;
    document.getElementById('popup-img').src = src;
    document.getElementById('popup-description').textContent = description;
    popup.classList.remove('hidden');
}

function closeImagePopup() {
    const popup = document.getElementById('image-popup');
    if (popup) popup.classList.add('hidden');
}

function createButterflies() {
    const butterflyCount = 10;
    const landing = document.querySelector('.landing');
    if (!landing) return;

    for (let i = 0; i < butterflyCount; i++) {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        butterfly.style.left = `${Math.random() * 100}vw`;
        butterfly.style.top = `${Math.random() * 100}vh`;
        butterfly.style.animationDuration = `${Math.random() * 2 + 2}s`;

        landing.appendChild(butterfly);
        butterfly.addEventListener('animationend', () => {
            butterfly.remove();
        });
    }
}

const greeting = document.querySelector('.landing h2');
if (greeting) greeting.addEventListener('mouseenter', createButterflies);

