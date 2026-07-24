/* 1. DARK MODE & PERSISTENCE */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

function updateIcon(isDark) {
    if (isDark) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

function applyForceDarkMode() {
    const isDark = document.body.classList.contains('dark');
    let styleTag = document.getElementById('force-dark-style');

    if (isDark) {
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'force-dark-style';
            document.head.appendChild(styleTag);
        }
    
        styleTag.innerHTML = `
            body.dark, 
            body.dark *:not(.card-innovation):not(.stat-item), 
            body.dark *:not(.card-innovation):not(.stat-item):before, 
            body.dark *:not(.card-innovation):not(.stat-item):after { 
                background-color: #040404 !important; 
                background-image: none !important; 
                color: #f1f5f9 !important; 
                border-color: #090909 !important;
            }
                body.dark #grille-intervenants { 
        background-color: #040404 !important; 
        background-image: none !important; 
    }
        `;
    } else if (styleTag) {
        styleTag.remove();
    }
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateIcon(isDark);
    applyForceDarkMode();
});

// Au chargement de la page
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    updateIcon(true);
    applyForceDarkMode();
}
/* 2. NAVBAR DYNAMIQUE & HAMBURGER */
const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('navbar-scrolled');
    } else {
        header.classList.remove('navbar-scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



/* 3. COMPTE À REBOURS */
document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date("December 31, 2026 10:00:00").getTime();

    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');

    if (d && h && m && s) {
        setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff > 0) {
                d.innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                h.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                m.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                s.innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }
        }, 1000); 
    }
});

/* 4. ANIMATION STATISTIQUES AU SCROLL */
const statsSection = document.getElementById('chiffres');
if (statsSection) {
    const observerStats = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const headers = statsSection.querySelectorAll('h3');
                headers.forEach(h3 => {
                    const fullText = h3.innerText;
                    const target = parseInt(fullText.replace('+', '')); 
                    let current = 0;
                    const increment = Math.max(1, Math.ceil(target / 50));
                    
                    const update = () => {
                        if (current < target) {
                            current += increment;
                            if (current > target) current = target;
                            h3.innerText = (fullText.includes('+') ? '+' : '') + current;
                            setTimeout(update, 30);
                        }
                    };
                    update();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observerStats.observe(statsSection);
}

/* 5. ONGLETS PROGRAMME (programme.html) */
function showDay(day) {
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`day${day}`).style.display = 'block';
    event.currentTarget.classList.add('active');
}

