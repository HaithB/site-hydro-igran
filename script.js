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

    // ▼▼▼ REMPLACEZ L'ANCIEN BLOC "2B" PAR CELUI-CI DANS script.js ▼▼▼

    // ==========================================================================
    // 2B. ANIMATION DES STATISTIQUES (Version Corrigée et Améliorée)
    // ==========================================================================
    const statCards = document.querySelectorAll('.proof-card');
    if (statCards.length > 0) {
        // On définit les couleurs directement ici pour plus de fiabilité
        const primaryGreen = '#34A853'; 
        const borderGray = '#e6ebf1';

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const statElement = card.querySelector('.proof-stat');
                    const target = parseInt(statElement.dataset.target);

                    // --- 1. Animation du Compteur ---
                    let current = 0;
                    const increment = target / 100;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            const displayValue = Math.ceil(current);
                            statElement.textContent = statElement.classList.contains('text-stat') ? `${displayValue} j/an` : `${displayValue}%`;
                            requestAnimationFrame(updateCounter);
                        } else {
                            statElement.textContent = statElement.classList.contains('text-stat') ? `${target} j/an` : `${target}%`;
                        }
                    };
                    updateCounter();

                    // --- 2. Animation du Graphique Circulaire ---
                    const canvas = card.querySelector('canvas');
                    if (canvas) {
                        new Chart(canvas.getContext('2d'), {
                            type: 'doughnut',
                            data: {
                                datasets: [{
                                    data: [target, 100 - target],
                                    backgroundColor: [primaryGreen, borderGray],
                                    borderWidth: 0,
                                    borderRadius: 5,
                                }]
                            },
                            options: {
                                responsive: true,
                                cutout: '80%',
                                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                                animation: {
                                    animateRotate: true,
                                    duration: 1500,
                                    onComplete: () => {
                                        // On fait apparaître le canvas en fondu à la fin de l'animation
                                        canvas.style.opacity = 1;
                                    }
                                }
                            }
                        });
                    }
                    
                    observer.unobserve(card); // Animer une seule fois
                }
            });
        }, { threshold: 0.6 }); // On augmente un peu le seuil pour être sûr

        statCards.forEach(card => {
            statObserver.observe(card);
        });
    }

    // ▲▲▲ FIN DU BLOC DE REMPLACEMENT ▲▲▲

    // ▼▼▼ AJOUTEZ CE BLOC DANS votre script.js ▼▼▼

    // ==========================================================================
    // 5. LOGIQUE INTERACTIVE POUR LA PAGE CONTACT
    // ==========================================================================
    const contactPathBtns = document.querySelectorAll('.contact-path-btn');
    const subjectInput = document.getElementById('subject');

    if (contactPathBtns.length > 0 && subjectInput) {
        // Pré-remplir le sujet avec le bouton actif par défaut
        subjectInput.value = document.querySelector('.contact-path-btn.active').dataset.subject;

        contactPathBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Gérer le style du bouton actif
                contactPathBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Mettre à jour la valeur du champ "Sujet"
                subjectInput.value = this.dataset.subject;
            });
        });
    }

    // ▲▲▲ FIN DU BLOC À AJOUTER ▲▲▲

    // ==========================================================================
    // 6. LOGIQUE DU PRODUCT TOUR INTERACTIF
    // ==========================================================================
    const tourNavItems = document.querySelectorAll('.feature-tour-item');
    const tourImages = document.querySelectorAll('.tech-image-wrapper img');

    if (tourNavItems.length > 0 && tourImages.length > 0) {
        tourNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetId = this.dataset.target;

                // Gérer les styles des boutons de navigation
                tourNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Gérer l'affichage des images
                tourImages.forEach(img => {
                    if (img.dataset.id === targetId) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 7. LOGIQUE DE LA SECTION INTERACTIVE "COMMENT ÇA MARCHE"
    // ==========================================================================
    const processNavBtns = document.querySelectorAll('.process-step-btn');
    const processContents = document.querySelectorAll('.process-content');

    if (processNavBtns.length > 0 && processContents.length > 0) {
        processNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const step = this.dataset.step;

                // Gérer les boutons
                processNavBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Gérer les panneaux de contenu
                processContents.forEach(content => {
                    if (content.dataset.step === step) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });

        // Gestion responsive : sur mobile, on cache/montre différemment
        if (window.innerWidth <= 768) {
            processNavBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const step = this.dataset.step;
                    // On cache tous les contenus
                    processContents.forEach(c => c.style.display = 'none');
                    // On affiche le bon
                    const activeContent = document.querySelector(`.process-content[data-step='${step}']`);
                    if(activeContent) activeContent.style.display = 'grid';
                });
            });
            // Affiche le premier contenu par défaut sur mobile
            if(document.querySelector('.process-content[data-step="1"]')) {
                document.querySelector('.process-content[data-step="1"]').style.display = 'grid';
            }
        }
    }

});

