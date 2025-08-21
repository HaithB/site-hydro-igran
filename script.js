// This single event listener ensures all code runs only after the page is fully loaded.
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================================================
    // 1. REVEAL-ON-SCROLL ANIMATION LOGIC
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once an element is visible, we can stop observing it for performance.
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // ==========================================================================
    // 2. INTERACTIVE PROCESS IMAGES LOGIC
    // ==========================================================================
    const processSteps = document.querySelectorAll('.process-step');
    const processImages = document.querySelectorAll('.process-image-container img');

    if (processSteps.length > 0 && processImages.length > 0) {
        processSteps.forEach(step => {
            step.addEventListener('mouseover', function() {
                const stepNumber = this.dataset.step;

                // Deactivate all images
                processImages.forEach(image => image.classList.remove('active'));

                // Activate the corresponding image
                const activeImage = document.querySelector(`.process-image-container img[data-step='${stepNumber}']`);
                if (activeImage) {
                    activeImage.classList.add('active');
                }
            });
        });
    }

    // ▼▼▼ AJOUTEZ CE BLOC DANS votre script.js ▼▼▼

    // ==========================================================================
    // 2B. GRAPHIQUES POUR LA PAGE "VUE LIGNE"
    // ==========================================================================
    const ctxTemperature = document.getElementById('temperatureChart')?.getContext('2d');
    if (ctxTemperature) {
        new Chart(ctxTemperature, {
            type: 'line',
            data: {
                labels: ['-24h', '-18h', '-12h', '-6h', 'Maintenant'],
                datasets: [{
                    label: 'Température',
                    data: [21.5, 22.0, 22.8, 22.5, 22.5],
                    borderColor: primaryGreen,
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

    const ctxPhEc = document.getElementById('phEcChart')?.getContext('2d');
    if (ctxPhEc) {
        new Chart(ctxPhEc, {
            type: 'line',
            data: {
                labels: ['-24h', '-18h', '-12h', '-6h', 'Maintenant'],
                datasets: [
                    {
                        label: 'pH',
                        data: [6.9, 6.8, 6.8, 6.9, 6.8],
                        borderColor: darkBlue,
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'EC',
                        data: [1.1, 1.2, 1.2, 1.3, 1.2],
                        borderColor: statusBlue,
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'pH' } },
                    y1: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'EC' }, grid: { drawOnChartArea: false } }
                }
            }
        });
    }

    // ▲▲▲ FIN DU BLOC À AJOUTER ▲▲▲ 

    // ==========================================================================
    // 3. MOBILE NAVIGATION TOGGLE LOGIC
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

