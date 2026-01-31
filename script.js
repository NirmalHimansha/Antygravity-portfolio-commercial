// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you, ${name}! Your message has been sent successfully.</p>
    `;
    
    // Add success styling
    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            background: linear-gradient(135deg, hsl(150, 70%, 50%), hsl(170, 70%, 50%));
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin-top: 1rem;
            animation: slideIn 0.5s ease;
        }
        
        .form-success i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .form-success p {
            margin: 0;
            font-weight: 600;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Replace form with success message
    contactForm.innerHTML = '';
    contactForm.appendChild(successMessage);
    
    // Log form data (in production, you would send this to a server)
    console.log('Form submitted:', { name, email, subject, message });
    
    // Reset after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 5000);
});

// ===================================
// Dynamic Text Animation (Optional Enhancement)
// ===================================
const heroTagline = document.querySelector('.hero-tagline');
const roles = [
    'Creative Developer & Designer',
    'Full-Stack Engineer',
    'UI/UX Enthusiast',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        heroTagline.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        heroTagline.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation after page load
setTimeout(typeRole, 1000);

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Create cursor trail circles
function createCursorTrail() {
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        document.body.appendChild(circle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .circle {
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, hsl(250, 85%, 60%), hsl(320, 80%, 60%));
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);
}

// Uncomment to enable cursor trail
// createCursorTrail();

// ===================================
// Project Image Loading
// ===================================
// Set the generated images as sources
window.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profile-img');
    const project1Img = document.getElementById('project1-img');
    const project2Img = document.getElementById('project2-img');
    const project3Img = document.getElementById('project3-img');
    
    // These will be replaced with actual image paths
    if (profileImg) {
        profileImg.src = 'images/profile.jpg';
        profileImg.onerror = function() {
            this.src = 'https://via.placeholder.com/500x600/667eea/ffffff?text=Profile';
        };
    }
    
    if (project1Img) {
        project1Img.src = 'images/project1.jpg';
        project1Img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/667eea/ffffff?text=Project+1';
        };
    }
    
    if (project2Img) {
        project2Img.src = 'images/project2.jpg';
        project2Img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Project+2';
        };
    }
    
    if (project3Img) {
        project3Img.src = 'images/project3.jpg';
        project3Img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Project+3';
        };
    }
});

// ===================================
// Skill Cards Tilt Effect
// ===================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Project Cards Hover Effect
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to body
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #f093fb;');
console.log('%c📧 alex@example.com', 'font-size: 12px; color: #4facfe;');
