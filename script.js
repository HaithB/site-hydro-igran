/* TON CSS COMPLET ICI */

/* ------------------- */
/* VARIABLES & RESET   */
/* ------------------- */
:root {
    --green-dark: #3A6B4B;
    --green-light: #F5FAF6;
    --text-dark: #1F2937;
    --text-light: #6B7280;
    --background-white: #FFFFFF;
    --border-color: #E5E7EB;
    --spacing-unit: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    background-color: var(--background-white);
    line-height: 1.6;
}

/* ... (TOUT LE RESTE DU CSS VA ICI) ... */
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 calc(var(--spacing-unit) * 2);
}

section {
    padding: calc(var(--spacing-unit) * 10) 0;
}

h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
}

h2 {
    font-size: 36px;
    color: var(--text-dark);
    text-align: center;
    margin-bottom: calc(var(--spacing-unit) * 6);
}

/* ------------------- */
/* ANIMATIONS          */
/* ------------------- */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ------------------- */
/* HERO SECTION        */
/* ------------------- */
.hero {
    background-color: var(--green-light);
    padding: calc(var(--spacing-unit) * 8) 0;
    text-align: center;
}

.hero h1 {
    font-size: 48px;
    max-width: 600px;
    margin: 0 auto calc(var(--spacing-unit) * 2);
}

.hero p {
    font-size: 18px;
    color: var(--text-light);
    max-width: 500px;
    margin: 0 auto calc(var(--spacing-unit) * 4);
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: calc(var(--spacing-unit) * 2);
}

.btn {
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--green-dark);
    color: var(--background-white);
}
.btn-primary:hover {
    background-color: #2d533a;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: var(--background-white);
    color: var(--text-dark);
    border: 1px solid var(--border-color);
}
.btn-secondary:hover {
    background-color: #f9fafb;
    transform: translateY(-2px);
}

/* ------------------- */
/* FEATURES SECTION    */
/* ------------------- */
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: calc(var(--spacing-unit) * 3);
    margin-top: calc(var(--spacing-unit) * 6);
}

.feature-card {
    background-color: var(--background-white);
    border-radius: 12px;
    padding: calc(var(--spacing-unit) * 3);
    text-align: center;
    border: 1px solid var(--border-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.feature-card .icon {
    font-size: 28px;
    color: var(--green-dark);
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.feature-card h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: calc(var(--spacing-unit) * 1);
}

.feature-card p {
    font-size: 14px;
    color: var(--text-light);
}

/* ------------------- */
/* TECHNOLOGY SECTION  */
/* ------------------- */
.technology {
    text-align: center;
}

.laptop-mockup {
    max-width: 800px;
    margin: calc(var(--spacing-unit) * 4) auto 0;
    background: #2d3748;
    border-radius: 16px;
    padding: 15px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.laptop-screen {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.laptop-screen img {
    width: 100%;
    display: block;
}

.laptop-base {
    width: 85%;
    height: 12px;
    background: #1a202c;
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.cta-button {
    display: inline-block;
    margin-top: calc(var(--spacing-unit) * 4);
}

/* Dashboard specific styles */
.dashboard {
    padding: 20px;
    background: #f9fafb;
    text-align: left;
}
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.dashboard-header span {
    font-size: 14px;
    color: var(--text-light);
}
.dashboard-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin-bottom: 20px;
}
.dashboard-card h4 {
    font-size: 16px;
    margin-bottom: 5px;
}
.dashboard-card .value {
    font-size: 28px;
    font-weight: 700;
    color: var(--green-dark);
}
.dashboard-chart-container {
    height: 150px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 10px 0;
}
.chart-bar {
    width: 15%;
    background-color: #a5d6a7;
    border-radius: 4px 4px 0 0;
    transition: height 1s ease-out;
    height: 0;
}


/* ------------------- */
/* TARGET SECTION      */
/* ------------------- */
.target {
    background-color: var(--green-light);
}
.target-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: calc(var(--spacing-unit) * 3);
}

/* ------------------- */
/* HOW IT WORKS SECTION*/
/* ------------------- */
.how-it-works .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing-unit) * 8);
}
.process-steps {
    list-style: none;
    position: relative;
}
.process-steps::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: var(--border-color);
    z-index: -1;
}
.step {
    display: flex;
    align-items: flex-start;
    margin-bottom: calc(var(--spacing-unit) * 5);
}
.step-number {
    width: 40px;
    height: 40px;
    background-color: var(--background-white);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: calc(var(--spacing-unit) * 3);
    flex-shrink: 0;
}
.step-content h3 {
    font-size: 20px;
    font-weight: 600;
}

.grass-image {
    max-width: 300px;
    width: 100%;
}
.grass-image img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

/* ------------------- */
/* INNOVATION SECTION  */
/* ------------------- */
.innovation-list {
    display: flex;
    justify-content: center;
    gap: calc(var(--spacing-unit) * 6);
    flex-wrap: wrap;
    text-align: center;
}
.innovation-item {
    font-size: 18px;
    font-weight: 500;
}
.innovation-item .icon {
    margin-right: 8px;
    color: var(--green-dark);
}

/* ------------------- */
/* RESPONSIVE DESIGN   */
/* ------------------- */
@media (max-width: 768px) {
    h1 { font-size: 36px; }
    h2 { font-size: 28px; }
    .hero-buttons { flex-direction: column; }
    .how-it-works .content {
        flex-direction: column;
    }
}