document.addEventListener('DOMContentLoaded', function () {
    // Vérifie si l'élément canvas existe sur la page
    if (document.getElementById('productionChart')) {
        const ctx = document.getElementById('productionChart').getContext('2d');

        // Définition des couleurs à partir de vos variables CSS (si possible, sinon en dur)
        const primaryGreen = '#34A853';
        const darkBlue = '#0A2540';
        const gridColor = '#e6ebf1';

        // Création d'un dégradé pour le remplissage du graphique
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(52, 168, 83, 0.4)');
        gradient.addColorStop(1, 'rgba(52, 168, 83, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '5', '10', '15', '20', '25', '30'], // Jours du mois (simplifié)
                datasets: [{
                    label: 'Production (kg)',
                    data: [42, 45, 44, 48, 47, 50, 47], // Données d'exemple
                    backgroundColor: gradient,
                    borderColor: primaryGreen,
                    borderWidth: 3,
                    pointBackgroundColor: primaryGreen,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4, // Pour des courbes fluides
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // On cache la légende pour un look plus épuré
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: gridColor
                        }
                    },
                    x: {
                        grid: {
                            display: false // Pas de lignes de grille verticales
                        }
                    }
                }
            }
        });
    }
});