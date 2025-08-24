document.addEventListener("DOMContentLoaded", function init() {

    // ==========================================================================
    // 0. CONFIGURATION GLOBALE
    // ==========================================================================
    const primaryGreen = getComputedStyle(document.documentElement).getPropertyValue('--primary-green').trim();
    const darkBlue = getComputedStyle(document.documentElement).getPropertyValue('--dark-blue').trim();
    const mediumGray = getComputedStyle(document.documentElement).getPropertyValue('--medium-gray').trim();
    const chartFont = "'Be Vietnam Pro', sans-serif";
    Chart.defaults.font.family = chartFont;
    Chart.defaults.color = mediumGray;

    // ==========================================================================
    // LOGIQUE COMMUNE (Menu Mobile, Horloge)
    // ==========================================================================
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (mobileMenuButton && sidebar && sidebarOverlay) {
        mobileMenuButton.addEventListener('click', () => { sidebar.classList.add('is-open'); sidebarOverlay.classList.add('is-active'); });
        sidebarOverlay.addEventListener('click', () => { sidebar.classList.remove('is-open'); sidebarOverlay.classList.remove('is-active'); });
    }

    const datetimeContainer = document.getElementById('datetime-container');
    if (datetimeContainer) {
        const updateTime = () => {
            const now = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
            const timeString = now.toLocaleDateString('fr-FR', options);
            datetimeContainer.textContent = timeString.charAt(0).toUpperCase() + timeString.slice(1);
        };
        updateTime();
        setInterval(updateTime, 60000);
    }


    // ==========================================================================
    // 1. LOGIQUE SPÉCIFIQUE À LA PAGE VUE SALLE (dashboard.html)
    // ==========================================================================
    if (document.querySelector('.hero-section')) {
        // --- MOTEUR DE SIMULATION EXPERT ---
        function genererDonneesSimulees() {
            const prodBaseMin = 90, prodBaseMax = 110, croissanceMin = 0.4, croissanceMax = 0.9, fluctMin = 1.5, fluctMax = 2.5;
            const aujourdhui = new Date();
            const donneesProduction = [];
            const labelsJours = [];
            let productionActuelle = prodBaseMin + Math.random() * (prodBaseMax - prodBaseMin);

            for (let i = 29; i >= 0; i--) {
                const dateJour = new Date(aujourdhui); dateJour.setDate(aujourdhui.getDate() - i);
                labelsJours.push(`${String(dateJour.getDate()).padStart(2, '0')}/${String(dateJour.getMonth() + 1).padStart(2, '0')}`);
                const croissance = croissanceMin + Math.random() * (croissanceMax - croissanceMin);
                const fluctuation = (Math.random() - 0.5) * 2 * (fluctMin + Math.random() * (fluctMax - fluctMin));
                productionActuelle += croissance + fluctuation;
                donneesProduction.push(parseFloat(productionActuelle.toFixed(1)));
            }
            const productionDuJour = donneesProduction[29];
            let consoEau = 5.8 + Math.random() * 2;
            let kWhKg = 0.35 + Math.random() * 0.2;
            let efficaciteHydrique = Math.min(97, (12 / consoEau) * 55);
            let performance = 92 + Math.random() * 4;
            let etatSanitaire = 'OK';
            let temperature = 20.0 + Math.random() * 2.5;
            if (temperature > 24) { consoEau += 0.4; }
            let humidite = 60 + Math.random() * 8;
            if (humidite > 72) { etatSanitaire = 'VIGILANCE'; performance -= 1.5; }
            if (kWhKg > 0.6) { performance -= 1; }

            return {
                production30Jours: donneesProduction, labels30Jours: labelsJours,
                kpi: {
                    productionTotale: productionDuJour.toFixed(1), tauxOccupation: 86 + Math.floor(Math.random() * 9),
                    consoEau: consoEau.toFixed(1), performance: Math.floor(performance),
                    efficaciteHydrique: Math.floor(efficaciteHydrique), efficaciteEnergetique: kWhKg.toFixed(2),
                    coutRevient: (2.2 + Math.random() * 1.2).toFixed(2),
                },
                operationnel: {
                    temperature: temperature.toFixed(1), humidite: Math.floor(humidite),
                    co2: 450 + Math.floor(Math.random() * 351), eclairage: '14/14 h',
                    niveauEau: 45 + Math.floor(Math.random() * 51), niveauSolution: 55 + Math.floor(Math.random() * 41),
                    ec: (0.4 + Math.random() * 0.4).toFixed(2), ph: (6.2 + Math.random() * 0.6).toFixed(1),
                    consoEnergie: (30 + Math.random() * 35).toFixed(1), etatSanitaire: etatSanitaire,
                    prochainNettoyage: `${Math.floor(Math.random() * 4)} jours`,
                }
            };
        }
        
        const donnees = genererDonneesSimulees();

        function updateDOM() {
            // ... (code de mise à jour du DOM pour la Vue Salle) ...
            document.querySelector('[data-counter-id="productionTotale"]').setAttribute('data-target', donnees.kpi.productionTotale);
            document.querySelector('[data-counter-id="tauxOccupation"]').setAttribute('data-target', donnees.kpi.tauxOccupation);
            document.querySelector('[data-counter-id="consoEau"]').setAttribute('data-target', donnees.kpi.consoEau);
            document.querySelector('[data-counter-id="performance"]').setAttribute('data-target', donnees.kpi.performance);
            document.getElementById('efficacite-hydrique').textContent = donnees.kpi.efficaciteHydrique;
            document.getElementById('efficacite-energetique').textContent = donnees.kpi.efficaciteEnergetique;
            document.getElementById('cout-revient').textContent = donnees.kpi.coutRevient;
            document.getElementById('valeur-temperature').textContent = `${donnees.operationnel.temperature}°C`;
            document.getElementById('valeur-humidite').textContent = `${donnees.operationnel.humidite}%`;
            document.getElementById('valeur-co2').textContent = `${donnees.operationnel.co2} ppm`;
            document.getElementById('etat-eclairage').textContent = donnees.operationnel.eclairage;
            document.getElementById('barre-eau').style.width = `${donnees.operationnel.niveauEau}%`;
            document.getElementById('barre-eau').textContent = `${donnees.operationnel.niveauEau}%`;
            document.getElementById('barre-solution').style.width = `${donnees.operationnel.niveauSolution}%`;
            document.getElementById('barre-solution').textContent = `${donnees.operationnel.niveauSolution}%`;
            document.getElementById('valeur-ec').textContent = `${donnees.operationnel.ec} mS/cm`;
            document.getElementById('valeur-ph').textContent = donnees.operationnel.ph;
            document.getElementById('conso-energie').textContent = `${donnees.operationnel.consoEnergie} kWh`;
            const badgeSanitaire = document.getElementById('etat-sanitaire');
            badgeSanitaire.textContent = donnees.operationnel.etatSanitaire;
            badgeSanitaire.className = `status-badge ${donnees.operationnel.etatSanitaire === 'OK' ? 'status-ok' : 'status-warn'}`;
            document.getElementById('prochain-nettoyage').textContent = donnees.operationnel.prochainNettoyage;
            animateCounters();
        }

        function animateCounters() {
            document.querySelectorAll('.counter').forEach(counter => {
                counter.innerText = '0'; counter.startTime = null;
                const target = parseFloat(counter.getAttribute('data-target')); if (isNaN(target)) return;
                const isDecimal = target % 1 !== 0;
                const animate = (timestamp) => {
                    if (!counter.startTime) counter.startTime = timestamp;
                    const progress = Math.min((timestamp - counter.startTime) / 1500, 1);
                    let currentValue = progress * target;
                    counter.innerText = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);
                    if (progress < 1) { requestAnimationFrame(animate); } else { counter.innerText = isDecimal ? target.toFixed(1) : target; }
                };
                requestAnimationFrame(animate);
            });
        }

        // Création des graphiques de la Vue Salle
        const ctxProdTotal = document.getElementById('productionTotalChart')?.getContext('2d');
        if(ctxProdTotal) { new Chart(ctxProdTotal, { type: 'line', data: { labels: donnees.labels30Jours.slice(-7), datasets: [{ data: donnees.production30Jours.slice(-7), borderColor: primaryGreen, borderWidth: 4, tension: 0.4, pointRadius: 0, fill: true, backgroundColor: (()=>{const g=ctxProdTotal.createLinearGradient(0,0,0,120);g.addColorStop(0,'rgba(52,168,83,0.2)');g.addColorStop(1,'rgba(52,168,83,0)');return g;})() }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } } }); }
        const ctxProd30 = document.getElementById('production30DaysChart')?.getContext('2d');
        if(ctxProd30) { 
            const crosshairPlugin = { 
                id: 'crosshair', 
                afterDraw: chart => { 
                    if (chart.tooltip?._active?.length) { // Correction: retirer l'espace entre "tooltip?" et "_active"
                        let x = chart.tooltip._active[0].element.x; 
                        let yAxis = chart.scales.y; 
                        let ctx = chart.ctx; 
                        ctx.save(); 
                        ctx.beginPath(); 
                        ctx.moveTo(x, yAxis.top); 
                        ctx.lineTo(x, yAxis.bottom); 
                        ctx.lineWidth = 1; 
                        ctx.strokeStyle = '#475467'; 
                        ctx.stroke(); 
                        ctx.restore(); 
                    } 
                } 
            };
            new Chart(ctxProd30, { 
                type: 'line', 
                data: { 
                    labels: donnees.labels30Jours, 
                    datasets: [{
                        label: 'Production', 
                        data: donnees.production30Jours, 
                        borderColor: primaryGreen, 
                        borderWidth: 3, 
                        tension: 0.4, 
                        pointBackgroundColor: '#fff', 
                        pointBorderColor: primaryGreen, 
                        pointHoverRadius: 6, 
                        pointHoverBorderWidth: 3, 
                        fill: true, 
                        backgroundColor: (() => { 
                            const g = ctxProd30.createLinearGradient(0, 0, 0, 250); 
                            g.addColorStop(0, 'rgba(52,168,83,0.25)'); 
                            g.addColorStop(1, 'rgba(52,168,83,0)'); 
                            return g; 
                        })() 
                    }] 
                }, 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    interaction: { mode: 'index', intersect: false }, 
                    plugins: { 
                        legend: { display: false }, 
                        tooltip: { 
                            enabled: true, 
                            backgroundColor: darkBlue, 
                            titleColor: primaryGreen, 
                            titleFont: { weight: 'bold' }, 
                            bodyColor: '#EAECF0', 
                            borderColor: '#475467', 
                            borderWidth: 1, 
                            padding: 12, 
                            cornerRadius: 8, 
                            displayColors: true, 
                            boxPadding: 4, 
                            callbacks: { label: (ctx) => ` ${ctx.parsed.y.toFixed(1)} kg` } 
                        } 
                    }, 
                    scales: { 
                        y: { 
                            beginAtZero: false, 
                            ticks: { color: '#98a2b3' }, 
                            grid: { drawBorder: false, color: '#344054' } 
                        }, 
                        x: { 
                            ticks: { color: '#98a2b3' }, 
                            grid: { display: false } 
                        } 
                    } 
                }, 
                plugins: [crosshairPlugin] 
            });
        }
        const ctxConsommation = document.getElementById('consommationChart')?.getContext('2d');
        if(ctxConsommation) { new Chart(ctxConsommation, { type: 'bar', data: { labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'], datasets: [ { label: 'PÔME', data: [120, 190, 300, 500, 200, 300, 450], backgroundColor: darkBlue, borderRadius: 4, barPercentage: 0.6 }, { label: 'Étiage', data: [80, 120, 200, 300, 150, 220, 310], backgroundColor: mediumGray, borderRadius: 4, barPercentage: 0.6 }, { label: 'Énergie', data: [60, 90, 150, 250, 110, 180, 260], backgroundColor: primaryGreen, borderRadius: 4, barPercentage: 0.6 } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { drawBorder: false } }, x: { grid: { display: false } } } } }); }
        
        // Lancement pour la Vue Salle
        updateDOM();
    }


    // ==========================================================================
    // 2. LOGIQUE SPÉCIFIQUE À LA PAGE VUE LIGNE (ligne.html)
    // ==========================================================================
    const growthChartCanvas = document.getElementById('growthChart');
    if (growthChartCanvas) {
        const growthData = {
            labels: ['J+1', 'J+2', 'J+3', 'J+4', 'J+5', 'J+6', 'J+7'],
            datasets: [{
                label: 'Poids estimé (kg)',
                data: [12, 25, 42, 60, 84, 105, 120],
                borderColor: primaryGreen, borderWidth: 3, tension: 0.4, fill: true,
                backgroundColor: (()=>{const g=growthChartCanvas.getContext('2d').createLinearGradient(0,0,0,300);g.addColorStop(0,'rgba(52,168,83,0.25)');g.addColorStop(1,'rgba(52,168,83,0)');return g;})(),
                pointBackgroundColor: '#fff', pointBorderColor: primaryGreen,
                pointHoverRadius: 6, pointHoverBorderWidth: 3,
            }]
        };

        new Chart(growthChartCanvas, {
            type: 'line', data: growthData,
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true, backgroundColor: darkBlue, titleColor: primaryGreen,
                        bodyColor: '#EAECF0', borderColor: '#475467', borderWidth: 1,
                        padding: 12, cornerRadius: 8, displayColors: true, boxPadding: 4,
                        callbacks: {
                            title: (ctx) => `Jour ${ctx[0].label.split('+')[1]}`,
                            label: (ctx) => ` ${ctx.parsed.y.toFixed(1)} kg`
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#98a2b3', callback: (v) => `${v} kg` }, grid: { drawBorder: false, color: '#344054' } },
                    x: { ticks: { color: '#98a2b3' }, grid: { display: false } }
                }
            }
        });
    }



    // ==========================================================================
    // GRAPHIQUE PH/EC DE LA VUE LIGNE
    // ==========================================================================
    const phEcLineChartCanvas = document.getElementById('phEcLineChart');
    if (phEcLineChartCanvas) {
        new Chart(phEcLineChartCanvas, {
            type: 'line',
            data: {
                labels: ['-24h', '-18h', '-12h', '-6h', 'Maintenant'],
                datasets: [
                    {
                        label: 'pH',
                        data: [6.9, 6.8, 6.8, 6.9, 6.5],
                        borderColor: darkBlue,
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'EC (mS/cm)',
                        data: [0.5, 0.6, 0.6, 0.7, 0.6],
                        borderColor: primaryGreen,
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'pH' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'EC' },
                        grid: { drawOnChartArea: false } // Affiche la grille que pour l'axe Y principal
                    }
                }
            }
        });
    }


        // ==========================================================================
    // 3. LOGIQUE SPÉCIFIQUE À LA PAGE VUE BAC (bac.html)
    // ==========================================================================
    const humidityChartCanvas = document.getElementById('humidityChart');
    if (humidityChartCanvas) {
        new Chart(humidityChartCanvas, {
            type: 'line',
            data: {
                labels: ['-24h', '-18h', '-12h', '-6h', 'Maintenant'],
                datasets: [{
                    label: 'Humidité Substrat (%)',
                    data: [82, 85, 83, 72, 85],
                    borderColor: primaryGreen,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: (()=>{const g=humidityChartCanvas.getContext('2d').createLinearGradient(0,0,0,150);g.addColorStop(0,'rgba(52,168,83,0.15)');g.addColorStop(1,'rgba(52,168,83,0)');return g;})()
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => `${value}%`
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

        // ==========================================================================
    // 4. LOGIQUE SPÉCIFIQUE À LA PAGE ALERTES (alertes.html)
    // ==========================================================================
    const summaryCards = document.querySelectorAll('.summary-card.interactive');
    const alertCards = document.querySelectorAll('.alert-card');
    
    if (summaryCards.length > 0 && alertCards.length > 0) {
        summaryCards.forEach(card => {
            card.addEventListener('click', () => {
                const filter = card.dataset.filter;
                
                // Gérer l'état "actif" sur les cartes de résumé
                summaryCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Filtrer les cartes d'alerte
                alertCards.forEach(alert => {
                    if (alert.dataset.type === filter) {
                        alert.style.display = 'block';
                    } else {
                        alert.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Logique de la Modale ---
    const modalOverlay = document.getElementById('alert-modal');
    const assignButtons = document.querySelectorAll('.btn-assign');
    const closeButton = document.querySelector('.modal-close');

    if (modalOverlay) {
        const openModal = () => modalOverlay.classList.add('active');
        const closeModal = () => modalOverlay.classList.remove('active');

        assignButtons.forEach(button => button.addEventListener('click', openModal));
        
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ==========================================================================
    // 5. LOGIQUE SPÉCIFIQUE À LA PAGE ÉCONOMIE (economie.html)
    // ==========================================================================
    if (document.querySelector('.simulator-card')) {
        // --- Graphiques ---
        const ctxCostEvolution = document.getElementById('costEvolutionChart')?.getContext('2d');
        if(ctxCostEvolution) {
            new Chart(ctxCostEvolution, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                    datasets: [{
                        label: 'Coût de revient Hydro Igran (MAD)', data: [2.2, 2.1, 1.9, 1.85, 1.8, 1.8],
                        borderColor: primaryGreen, backgroundColor: 'rgba(52, 168, 83, 0.1)', fill: true, tension: 0.4
                    }, {
                        label: 'Prix Marché Orge (MAD)', data: [3.5, 3.6, 3.4, 3.5, 3.7, 3.8],
                        borderColor: mediumGray, borderDash: [5, 5], tension: 0.4
                    }]
                },
                options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return `${value.toFixed(1)} MAD`;
                            }
                        }
                    }
                }}
            });
        }

        const ctxRoiProjection = document.getElementById('roiProjectionChart')?.getContext('2d');
        if(ctxRoiProjection) {
            new Chart(ctxRoiProjection, {
                type: 'bar',
                data: {
                    labels: ['3 mois', '6 mois', '9 mois', '12 mois'],
                    datasets: [{
                        label: 'ROI (%)', data: [6, 12, 19, 25],
                        backgroundColor: primaryGreen, borderRadius: 4
                    }]
                },
                options: { plugins: { legend: { display: false } } }
            });
        }

        // --- Logique du Simulateur ---
        const inputs = {
            investissement: document.getElementById('sim-investissement'),
            chargesFixes: document.getElementById('sim-charges-fixes'),
            coutVariable: document.getElementById('sim-cout-variable'),
            production: document.getElementById('sim-production'),
            prixVente: document.getElementById('sim-prix-vente')
        };

        const outputs = {
            profit: document.getElementById('output-profit'),
            marge: document.getElementById('output-marge'),
            payback: document.getElementById('output-payback'),
            roi: document.getElementById('output-roi')
        };

        const calculateProfitability = () => {
            const investissement = parseFloat(inputs.investissement.value) || 0;
            const chargesFixes = parseFloat(inputs.chargesFixes.value) || 0;
            const coutVariable = parseFloat(inputs.coutVariable.value) || 0;
            const production = parseFloat(inputs.production.value) || 0;
            const prixVente = parseFloat(inputs.prixVente.value) || 0;

            const revenus = production * prixVente;
            const coutsVariablesTotal = production * coutVariable;
            const profitNet = revenus - coutsVariablesTotal - chargesFixes;
            
            const margeNette = revenus > 0 ? (profitNet / revenus) * 100 : 0;
            const paybackMois = profitNet > 0 ? investissement / profitNet : Infinity;
            const profitAnnuel = profitNet * 12;
            const roi12Mois = investissement > 0 ? (profitAnnuel / investissement) * 100 : Infinity;
            
            outputs.profit.textContent = `${profitNet.toLocaleString('fr-FR', {maximumFractionDigits: 0})} MAD`;
            outputs.marge.textContent = `${margeNette.toFixed(0)}%`;
            outputs.payback.textContent = isFinite(paybackMois) ? `${Math.ceil(paybackMois)} mois` : 'Jamais';
            outputs.roi.textContent = isFinite(roi12Mois) ? `${roi12Mois.toFixed(0)}%` : 'N/A';
        };

        Object.values(inputs).forEach(input => {
            input.addEventListener('input', calculateProfitability);
        });
        
        // Calcul initial
        calculateProfitability();
    }
});