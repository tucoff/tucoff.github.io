// Language selector functionality
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Initialize Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,pt-br,es,fr,de,it,ja,zh-CN,ko,ru,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Language selector button functionality
const languageBtn = document.querySelector('.language-btn');
const languagePopup = document.getElementById('language-popup');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangDisplay = document.getElementById('current-lang');

// Toggle popup
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = languagePopup.getAttribute('aria-hidden') === 'true';
    languagePopup.setAttribute('aria-hidden', !isHidden);
    languagePopup.classList.toggle('active');
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        languagePopup.setAttribute('aria-hidden', 'true');
        languagePopup.classList.remove('active');
    }
});

// Language selection
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.getAttribute('data-lang');
        
        // Save preference
        localStorage.setItem('selectedLanguage', selectedLang);
        currentLanguage = selectedLang;
        
        // Update button display
        updateLanguageDisplay(selectedLang);
        
        // Trigger Google Translate
        if (selectedLang === 'en') {
            // Reset to English
            location.reload();
        } else {
            translatePage(selectedLang);
        }
        
        // Close popup
        languagePopup.setAttribute('aria-hidden', 'true');
        languagePopup.classList.remove('active');
    });
});

function updateLanguageDisplay(lang) {
    const langMap = {
        'en': 'EN',
        'pt-br': 'PT',
        'es': 'ES',
        'fr': 'FR',
        'de': 'DE',
        'it': 'IT',
        'ja': 'JA',
        'zh-CN': 'ZH',
        'ko': 'KO',
        'ru': 'RU',
        'ar': 'AR'
    };
    currentLangDisplay.textContent = langMap[lang] || lang.toUpperCase();
}

function translatePage(lang) {
    // Use Google Translate API
    const googleTranslateWidget = document.querySelector('.goog-te-combo');
    if (googleTranslateWidget) {
        googleTranslateWidget.value = lang;
        googleTranslateWidget.dispatchEvent(new Event('change'));
    } else {
        // Fallback: reload with translation
        const langCode = lang === 'pt-br' ? 'pt' : lang;
        window.location.href = '/?_x_tr_sl=en&_x_tr_tl=' + langCode;
    }
}

// Set initial display
updateLanguageDisplay(currentLanguage);

// Apply saved language on page load
window.addEventListener('load', () => {
    if (currentLanguage !== 'en') {
        translatePage(currentLanguage);
    }
});
