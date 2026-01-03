
// Menu-toggle

const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const closeIcon = document.querySelector('.close-icon');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
            
        if (mobileMenu.classList.contains('active')) {
            hamburger.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            hamburger.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    })


// Navbar scroll effect

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "10px 20px";
        document.getElementById("navbar").style.width = "70%";
    } else {
        document.getElementById("navbar").style.padding = "15px 40px";
        document.getElementById("navbar").style.width = "80%"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15, // Reveal when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Optional: Adjust as needed
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Stop watching once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Target all elements you want to animate
    const targets = document.querySelectorAll(".reveal");
    targets.forEach((target) => observer.observe(target));
});


// Typewriter Effect

const textElement = document.getElementById("typewriter");

// List of domains
const phrases = [
    "behindmylinks.com/yourname",
    "mybounty.link.com/yourname",
    "clickmysocials.com/yourname",
    "exploremysocials.com/yourname",
    "checkmysocials.com/yourname",
    "myallsocials.com/yourname",
    "tapmysocials.com/yourname"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 70;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Remove a character
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is usually faster
    } else {
        // Add a character
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 70;
    }

    // Logic to handle switching between typing and deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing the whole word
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of the word
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting the whole word
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next word
        typeSpeed = 300; // Small pause before starting next word
    }

    setTimeout(type, typeSpeed);
}

// Start the effect
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
});


// Mouse Spotlight and Click Expansion Logic
const grid = document.querySelector('.benefits-grid');
const cards = document.querySelectorAll('.js-benefit-card');
const plusIcons = document.querySelectorAll('.plus-icon');

// 1. Mouse Spotlight Tracking
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', `-1000px`);
        card.style.setProperty('--mouse-y', `-1000px`);
    });
});

// 2. Expand all 6 cards when any plus icon is clicked
plusIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        grid.classList.toggle('all-expanded');
    });
});


// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Total duration of the animation in milliseconds

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || "";
        const suffix = counter.getAttribute('data-suffix') || "";
        
        let startTime = null;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Calculate current number based on progress
            const currentCount = Math.min(Math.floor((progress / speed) * target), target);
            
            counter.innerText = prefix + currentCount + suffix;

            if (progress < speed) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = prefix + target + suffix; // Ensure final number is exact
            }
        };

        requestAnimationFrame(updateCount);
    };

    // Intersection Observer to trigger when the section becomes visible
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing after animation runs once
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
// End of Counter Animation


// Feature dropdown-items
document.addEventListener('DOMContentLoaded', function() {
    const pricingData = {
        monthly: {
            solo: "8", growth: "35", scaling: "75",
            dom: { "50": "150", "100": "250", "150": "300", "200": "350", "250": "400", "300": "450" }
        },
        annually: {
            solo: "4", growth: "17.5", scaling: "37.5",
            dom: { "50": "75", "100": "125", "150": "150", "200": "175", "250": "200", "300": "225" }
        },
        rates: { "50": "3.00", "100": "2.50", "150": "2.00", "200": "1.75", "250": "1.60", "300": "1.50" }
    };

    const toggle = document.querySelector('.switch input');
    const saveLabels = document.querySelectorAll('.save-label'); 
    const selectedVal = document.getElementById('selectedVal');
    const domDiscountBlock = document.getElementById('dominance-discount-info');
    const svgRotate = document.querySelector('.dropdown-trigger svg');

    // Added "shouldFade" parameter (defaulting to true)
    function updateUI(shouldFade = true) {
        const isAnnual = toggle.checked;
        const mode = isAnnual ? 'annually' : 'monthly';
        let links = selectedVal.innerText.trim();

        if (!pricingData[mode].dom[links]) links = "50";

        // Select targets EXCEPT the Free Card (using :not selector)
        // We assume your first card doesn't have these IDs or we exclude it.
        const fadeTargets = document.querySelectorAll('.pricing-card:not(:first-child) .currency, #yearly-total, #subtext-dominance');

        const applyData = () => {
            // 1. Toggle "Save 50%" visibility
            saveLabels.forEach(label => {
                label.style.display = isAnnual ? "block" : "none";
            });

            // 2. Update prices (Free card is static, so these IDs only exist in Paid cards)
            if(document.getElementById('price-solo')) document.getElementById('price-solo').innerText = "$" + pricingData[mode].solo;
            if(document.getElementById('price-growth')) document.getElementById('price-growth').innerText = "$" + pricingData[mode].growth;
            if(document.getElementById('price-scaling')) document.getElementById('price-scaling').innerText = "$" + pricingData[mode].scaling;

            // 3. Update Dominance
            const domPrice = pricingData[mode].dom[links];
            document.getElementById('price-dominance').innerText = "$" + domPrice;
            
            if (domDiscountBlock) {
                domDiscountBlock.style.display = isAnnual ? "block" : "none";
                if (isAnnual) {
                    const yearlyTotal = parseInt(domPrice) * 12;
                    document.getElementById('yearly-total').innerText = `$${yearlyTotal}/year`;
                    document.getElementById('subtext-dominance').innerText = `$${pricingData.rates[links]}/link`;
                }
            }
        };

        if (shouldFade) {
            fadeTargets.forEach(el => el.classList.add('price-updating'));
            setTimeout(() => {
                applyData();
                fadeTargets.forEach(el => el.classList.remove('price-updating'));
            }, 150);
        } else {
            // No animation if shouldFade is false
            applyData();
        }
    }

    // TOGGLE: Triggers fade
    toggle.addEventListener('change', () => updateUI(true));
    
    // DROPDOWN: Does NOT trigger fade
    document.querySelectorAll('.drop-opt').forEach(opt => {
        opt.addEventListener('click', function() {
            selectedVal.innerText = this.getAttribute('data-value');
            svgRotate.classList.remove("rotate-180"); 
            updateUI(false); // Passing 'false' disables the animation
        });
    });

    // Dropdown toggle logic
    document.getElementById('dropTrigger').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('dropMenu').classList.toggle('active');
        if (svgRotate)
        svgRotate.classList.toggle("rotate-180");
    });

    document.addEventListener('click', () => {
        const menu = document.getElementById('dropMenu');
        if(menu) menu.classList.remove('active');
    });

    updateUI(false); // Initial load: no animation
});

// FAQ Session

function toggleFaq(id) {
    // 1. Find the specific card by its ID
    const card = document.getElementById(id);

    // 2. Toggle the active class
    if (card) {
        card.classList.toggle('active');
    }

    // Optional: Close other cards when opening this one
    const allCards = document.querySelectorAll('.faq-card');
    allCards.forEach(otherCard => {
        if (otherCard.id !== id) {
            otherCard.classList.remove('active');
        }
    });

}