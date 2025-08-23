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
    // 1. MOTEUR DE SIMULATION EXPERT
    // ==========================================================================
    function genererDonneesSimulees() {
        // Paramètres validés par l'expert
        const prodBaseMin = 90, prodBaseMax = 110;
        const croissanceMin = 0.4, croissanceMax = 0.9;
        const fluctMin = 1.5, fluctMax = 2.5;

        // Initialisation
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

        // Calcul des KPIs dynamiques
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
            production30Jours: donneesProduction,
            labels30Jours: labelsJours,
            kpi: {
                productionTotale: productionDuJour.toFixed(1),
                tauxOccupation: 86 + Math.floor(Math.random() * 9),
                consoEau: consoEau.toFixed(1),
                performance: Math.floor(performance),
                efficaciteHydrique: Math.floor(efficaciteHydrique),
                efficaciteEnergetique: kWhKg.toFixed(2),
                coutRevient: (2.2 + Math.random() * 1.2).toFixed(2),
            },
            operationnel: {
                temperature: temperature.toFixed(1),
                humidite: Math.floor(humidite),
                co2: 450 + Math.floor(Math.random() * 351),
                eclairage: '14/14 h',
                niveauEau: 45 + Math.floor(Math.random() * 51),
                niveauSolution: 55 + Math.floor(Math.random() * 41),
                ec: (0.4 + Math.random() * 0.4).toFixed(2),
                ph: (6.2 + Math.random() * 0.6).toFixed(1),
                consoEnergie: (30 + Math.random() * 35).toFixed(1),
                etatSanitaire: etatSanitaire,
                prochainNettoyage: `${Math.floor(Math.random() * 4)} jours`,
            }
        };
    }
    
    // ==========================================================================
    // 2. INITIALISATION ET MISE À JOUR DU DASHBOARD
    // ==========================================================================
    const donnees = genererDonneesSimulees();

    function updateDOM() {
        const ui = {
            // KPIs animés
            productionTotale: document.querySelector('[data-counter-id="productionTotale"]'),
            tauxOccupation: document.querySelector('[data-counter-id="tauxOccupation"]'),
            consoEau: document.querySelector('[data-counter-id="consoEau"]'),
            performance: document.querySelector('[data-counter-id="performance"]'),
            // KPIs stratégiques
            efficaciteHydrique: document.getElementById('efficacite-hydrique'),
            efficaciteEnergetique: document.getElementById('efficacite-energetique'),
            coutRevient: document.getElementById('cout-revient'),
            // Données opérationnelles
            temperature: document.getElementById('valeur-temperature'),
            humidite: document.getElementById('valeur-humidite'),
            co2: document.getElementById('valeur-co2'),
            eclairage: document.getElementById('etat-eclairage'),
            barreEau: document.getElementById('barre-eau'),
            barreSolution: document.getElementById('barre-solution'),
            ec: document.getElementById('valeur-ec'),
            ph: document.getElementById('valeur-ph'),
            consoEnergie: document.getElementById('conso-energie'),
            etatSanitaire: document.getElementById('etat-sanitaire'),
            prochainNettoyage: document.getElementById('prochain-nettoyage'),
        };

        // Set data-targets for counters
        ui.productionTotale.setAttribute('data-target', donnees.kpi.productionTotale);
        ui.tauxOccupation.setAttribute('data-target', donnees.kpi.tauxOccupation);
        ui.consoEau.setAttribute('data-target', donnees.kpi.consoEau);
        ui.performance.setAttribute('data-target', donnees.kpi.performance);

        // Update static values
        ui.efficaciteHydrique.textContent = donnees.kpi.efficaciteHydrique;
        ui.efficaciteEnergetique.textContent = donnees.kpi.efficaciteEnergetique;
        ui.coutRevient.textContent = donnees.kpi.coutRevient;
        ui.temperature.textContent = `${donnees.operationnel.temperature}°C`;
        ui.humidite.textContent = `${donnees.operationnel.humidite}%`;
        ui.co2.textContent = `${donnees.operationnel.co2} ppm`;
        ui.eclairage.textContent = donnees.operationnel.eclairage;
        ui.barreEau.style.width = `${donnees.operationnel.niveauEau}%`;
        ui.barreEau.textContent = `${donnees.operationnel.niveauEau}%`;
        ui.barreSolution.style.width = `${donnees.operationnel.niveauSolution}%`;
        ui.barreSolution.textContent = `${donnees.operationnel.niveauSolution}%`;
        ui.ec.textContent = `${donnees.operationnel.ec} mS/cm`;
        ui.ph.textContent = donnees.operationnel.ph;
        ui.consoEnergie.textContent = `${donnees.operationnel.consoEnergie} kWh`;
        ui.etatSanitaire.textContent = donnees.operationnel.etatSanitaire;
        ui.etatSanitaire.className = `status-badge ${donnees.operationnel.etatSanitaire === 'OK' ? 'status-ok' : 'status-warn'}`;
        ui.prochainNettoyage.textContent = donnees.operationnel.prochainNettoyage;

        animateCounters();
    }

    function animateCounters() {
        document.querySelectorAll('.counter').forEach(counter => {
            counter.innerText = '0'; counter.startTime = null;
            const target = parseFloat(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            const isDecimal = target % 1 !== 0;
            const animate = (timestamp) => {
                if (!counter.startTime) counter.startTime = timestamp;
                const progress = Math.min((timestamp - counter.startTime) / 1500, 1);
                let currentValue = progress * target;
                counter.innerText = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.innerText = isDecimal ? target.toFixed(1) : target;
                }
            };
            requestAnimationFrame(animate);
        });
    }

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const timeString = now.toLocaleDateString('fr-FR', options);
        document.getElementById('datetime-container').textContent = timeString.charAt(0).toUpperCase() + timeString.slice(1);
    }

    // ==========================================================================
    // 3. CRÉATION DES GRAPHIQUES & LANCEMENT
    // ==========================================================================
    const ctxProdTotal = document.getElementById('productionTotalChart')?.getContext('2d');
    if(ctxProdTotal) {
        new Chart(ctxProdTotal, { type: 'line', data: { labels: donnees.labels30Jours.slice(-7), datasets: [{ data: donnees.production30Jours.slice(-7), borderColor: primaryGreen, borderWidth: 4, tension: 0.4, pointRadius: 0, fill: true, backgroundColor: (()=>{const g=ctxProdTotal.createLinearGradient(0,0,0,120);g.addColorStop(0,'rgba(52,168,83,0.2)');g.addColorStop(1,'rgba(52,168,83,0)');return g;})() }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } } });
    }

    const ctxProd30 = document.getElementById('production30DaysChart')?.getContext('2d');
    if(ctxProd30) { 
        const crosshairPlugin = { 
            id: 'crosshair', 
            afterDraw: chart => { 
                if (chart.tooltip?._active?.length) { 
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
                    backgroundColor: (()=>{ 
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
    if(ctxConsommation) {
        new Chart(ctxConsommation, { type: 'bar', data: { labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'], datasets: [ { label: 'PÔME', data: [120, 190, 300, 500, 200, 300, 450], backgroundColor: darkBlue, borderRadius: 4, barPercentage: 0.6 }, { label: 'Étiage', data: [80, 120, 200, 300, 150, 220, 310], backgroundColor: mediumGray, borderRadius: 4, barPercentage: 0.6 }, { label: 'Énergie', data: [60, 90, 150, 250, 110, 180, 260], backgroundColor: primaryGreen, borderRadius: 4, barPercentage: 0.6 } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { drawBorder: false } }, x: { grid: { display: false } } } } });
    }

    // --- Lancement final ---
    updateTime();
    setInterval(updateTime, 60000);
    updateDOM();
});