// This single event listener ensures all code runs only after the page is fully loaded.
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================================================
    // 1. REVEAL-ON-SCROLL ANIMATION LOGIC (For landing pages)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // ==========================================================================
    // 2. INTERACTIVE PROCESS IMAGES LOGIC (For index.html)
    // ==========================================================================
    const processSteps = document.querySelectorAll('.process-step');
    const processImages = document.querySelectorAll('.process-image-container img');

    if (processSteps.length > 0 && processImages.length > 0) {
        processSteps.forEach(step => {
            step.addEventListener('mouseover', function() {
                const stepNumber = this.dataset.step;
                processImages.forEach(image => image.classList.remove('active'));
                const activeImage = document.querySelector(`.process-image-container img[data-step='${stepNumber}']`);
                if (activeImage) {
                    activeImage.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // 3. MOBILE NAVIGATION TOGGLE LOGIC (For landing pages navbar)
    // ==========================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});