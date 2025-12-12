// Simple language switcher
const langEn = document.getElementById('lang-en');
const langPt = document.getElementById('lang-pt');
const englishSection = document.getElementById('english');
const portuguesSection = document.getElementById('portugues');

function showEnglish() {
    englishSection.classList.add('active');
    portuguesSection.classList.remove('active');
    langEn.classList.add('active');
    langPt.classList.remove('active');
    localStorage.setItem('language', 'en');
}

function showPortuguese() {
    englishSection.classList.remove('active');
    portuguesSection.classList.add('active');
    langEn.classList.remove('active');
    langPt.classList.add('active');
    localStorage.setItem('language', 'pt');
}

langEn.addEventListener('click', (e) => {
    e.preventDefault();
    showEnglish();
    window.location.hash = 'english';
});

langPt.addEventListener('click', (e) => {
    e.preventDefault();
    showPortuguese();
    window.location.hash = 'portugues';
});

// Load saved language preference or detect from hash
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('language');
    const hash = window.location.hash;

    if (hash === '#portugues') {
        showPortuguese();
    } else if (hash === '#english') {
        showEnglish();
    } else if (savedLang === 'pt') {
        showPortuguese();
    }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#portugues') {
        showPortuguese();
    } else if (hash === '#english') {
        showEnglish();
    }
});
