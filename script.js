document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add animation classes to elements based on scroll position
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    // Initialize the animated counters in the footer
    initCounters();
    
    // Add hover effects for tooltip positioning
    setupTooltips();
});

// Set up scroll-triggered animations
function initScrollAnimations() {
    // Add animation classes to elements
    const eraContents = document.querySelectorAll('.era-content');
    eraContents.forEach((content, index) => {
        if (index % 2 === 0) {
            content.classList.add('slide-in-left');
        } else {
            content.classList.add('slide-in-right');
        }
    });
    
    const eraVisuals = document.querySelectorAll('.era-visual');
    eraVisuals.forEach((visual, index) => {
        if (index % 2 === 0) {
            visual.classList.add('slide-in-right');
        } else {
            visual.classList.add('slide-in-left');
        }
    });
    
    // Initial animation check
    animateOnScroll();
}

// Check if elements are in viewport and animate them
function animateOnScroll() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize the animated counters in the footer
function initCounters() {
    animateCounter('satellites-counter', 5000, 3);
    animateCounter('astronauts-counter', 600, 2);
    animateCounter('missions-counter', 1500, 3);
}

// Animate number counters
function animateCounter(elementId, finalValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    let startTime = null;
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    // Start the animation when the counter comes into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(element);
}

// Set up tooltip positioning and interactions
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('.infographic-element');
    
    tooltipElements.forEach(element => {
        const tooltip = element.querySelector('.tooltip');
        
        // Set background images for tooltip images (real images)
        const tooltipImage = tooltip.querySelector('.tooltip-image');
        if (tooltipImage) {
            // Get the element ID to determine which image to show
            const id = element.id;
            switch (id) {
                case 'sputnik':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg')";
                    break;
                case 'gagarin':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6e/Yuri_Gagarin_%281961%29_-_Restoration.jpg')";
                    break;
                case 'apollo':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg')";
                    break;
                case 'skylab':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/07/Skylab_%28SL-4%29.jpg')";
                    break;
                case 'shuttle':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/41/Space_Shuttle_Columbia_launching.jpg')";
                    break;
                case 'mir':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/09/Mir_space_station_12_June_1998.jpg')";
                    break;
                case 'iss':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/0e/ISS_March_2022.jpg')";
                    break;
                case 'hubble':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/HST-SM4.jpeg')";
                    break;
                case 'rovers':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg')";
                    break;
                case 'commercial':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Crew_Dragon_approached_to_ISS.jpg')";
                    break;
                case 'artemis':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Artemis_I_at_Launch_Pad_39B.jpg')";
                    break;
                case 'mars':
                    tooltipImage.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg')";
                    break;
                default:
                    tooltipImage.style.backgroundImage = "linear-gradient(135deg, #111827, #374151)";
            }
        }
        
        // Position tooltips on small screens
        function positionTooltip() {
            if (window.innerWidth <= 768) {
                tooltip.style.left = '30px';
            } else {
                tooltip.style.left = '50px';
            }
        }
        
        // Check on load and resize
        positionTooltip();
        window.addEventListener('resize', positionTooltip);
    });
}

// Create a parallax effect for the stars background
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    document.querySelector('.stars-container').style.transform = 'translateY(' + (scrolled * 0.2) + 'px)';
});

// Add GSAP ScrollTrigger animations for each era section
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Add animations for each section
    const sections = document.querySelectorAll('.era');
    
    sections.forEach((section, index) => {
        // Animate each section's content
        gsap.from(section.querySelector('.era-content'), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "center center",
                scrub: true
            },
            y: 100,
            opacity: 0,
            duration: 1
        });
        
        // Add a zoom effect to section backgrounds
        gsap.fromTo(
            section,
            {
                backgroundPosition: "50% 50%",
                backgroundSize: "120%"
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                backgroundPosition: "50% 0%",
                backgroundSize: "100%",
                ease: "none"
            }
        );
    });
    
    // Animate the counter numbers for a more dynamic effect
    gsap.from('.counter', {
        scrollTrigger: {
            trigger: '.data-counter',
            start: "top 80%"
        },
        textContent: 0,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.25,
        onUpdate: function() {
            this.targets()[0].textContent = Math.floor(this.targets()[0].textContent).toLocaleString();
        }
    });
} 