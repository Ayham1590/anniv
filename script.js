let currentIndex = 0;



const SUPABASE_URL = 'https://fesabtarxdmbbgrxplrn.supabase.co'; // Replace with your Supabase URL
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlc2FidGFyeGRtYmJncnhwbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzAxODEsImV4cCI6MjA0ODkwNjE4MX0.jZKIyrUEteDJOZzr8n_wBm5583qTgKMeqfBcJIUQxgg'; // Replace with your Supabase API Key

async function logVoucherToSupabase(voucher) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/vouchers`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voucher: voucher,
                timestamp: new Date().toISOString(),
            }),
        });
        const data = await response.json();
        console.log('Logged to Supabase:', data);
    } catch (error) {
        console.error('Error logging to Supabase:', error);
    }
}



function showPopup(voucher) {
    const popup = document.getElementById('popup');
    popup.querySelector('.popup-content p:first-child').textContent = `🎉 Congratulations! You chose "${voucher}"!`;
    popup.classList.remove('hidden');

    // Log voucher to Supabase
    logVoucherToSupabase(voucher);
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

