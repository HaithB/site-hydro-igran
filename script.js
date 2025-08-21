// Animations d'apparition au scroll (Reveal Animations)
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel: arrêter d'observer une fois l'élément visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    revealElements.forEach(elem => {
        observer.observe(elem);
    });
});

// --- GESTION DES IMAGES INTERACTIVES POUR LA SECTION "PROCESS" ---
document.addEventListener("DOMContentLoaded", function() {
    const processSteps = document.querySelectorAll('.process-step');
    const processImages = document.querySelectorAll('.process-image-container img');

    // S'assurer que les éléments existent avant d'ajouter les écouteurs
    if (processSteps.length > 0 && processImages.length > 0) {
        
        processSteps.forEach(step => {
            step.addEventListener('mouseover', function() {
                // Récupère le numéro de l'étape survolée (via l'attribut data-step)
                const stepNumber = this.dataset.step;

                // Cache toutes les images en enlevant la classe 'active'
                processImages.forEach(image => {
                    image.classList.remove('active');
                });

                // Trouve l'image correspondante et lui ajoute la classe 'active' pour l'afficher
                const activeImage = document.querySelector(`.process-image-container img[data-step='${stepNumber}']`);
                if (activeImage) {
                    activeImage.classList.add('active');
                }
            });
        });
    }
});

// ▼▼▼ AJOUTEZ CE BLOC À VOTRE FICHIER script.js ▼▼▼

// --- GESTION DU MENU DE NAVIGATION MOBILE ---
document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            // Fait glisser le menu
            navLinks.classList.toggle('active');
            
            // Anime le bouton hamburger en croix
            navToggle.classList.toggle('active');
        });
    }
});

// ▲▲▲ FIN DU BLOC JS À AJOUTER ▲▲▲

