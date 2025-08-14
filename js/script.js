
function sendWhatsApp(productInfo) {
    const phoneNumber = '393331234567'; // Sostituisci con il tuo numero WhatsApp
    const message = `Ciao Marco, sono interessato a:\n\n${productInfo}\n\nPotresti darmi maggiori informazioni su disponibilità e consegna?\n\nGrazie!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation to WhatsApp buttons
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Apertura WhatsApp...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
