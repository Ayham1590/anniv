let currentIndex = 0;



function updateCarousel() {
    const slides = document.querySelector('.carousel-slides');
    const slideWidth = slides.children[0].offsetWidth; // Get width of one slide
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    const slides = document.querySelector('.carousel-slides');
    const slideCount = slides.children.length;
    currentIndex = (currentIndex + 1) % slideCount; // Increment index with wrapping
    updateCarousel();
}

function prevSlide() {
    const slides = document.querySelector('.carousel-slides');
    const slideCount = slides.children.length;
    currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Decrement index with wrapping
    updateCarousel();
}


function showPopup(voucher) {
    const popup = document.getElementById('popup');
    popup.querySelector('.popup-content p:first-child').textContent = `🎉 Congratulations! You chose "${voucher}"!`;
    popup.classList.remove('hidden');

    // Send the click data to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbyinrOXmn78y_eiX8QLXtbYYdYdlP_OyAQ3Kqx8yLEfcIa9fo0nKluEXgdnZlPGYcQq7Q/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voucher }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Logged to Google Sheets:', data);
            if (data.status !== 'success') {
                alert('Failed to log voucher. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error logging to Google Sheets:', error);
            alert('An error occurred. Please try again later.');
        });
}


function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

document.querySelectorAll('.carousel-slides img').forEach(image => {
    image.addEventListener('click', () => {
        openImagePopup(image.src, image.getAttribute('data-description'));
    });
});

function openImagePopup(src, description) {
    const popup = document.getElementById('image-popup');
    document.getElementById('popup-img').src = src;
    document.getElementById('popup-description').textContent = description;
    popup.classList.remove('hidden');
}

function closeImagePopup() {
    document.getElementById('image-popup').classList.add('hidden');
}

function createButterflies() {
    const butterflyCount = 10;
    const landing = document.querySelector('.landing');

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
greeting.addEventListener('mouseenter', createButterflies);
