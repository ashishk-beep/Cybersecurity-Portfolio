// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const themeToggle = document.querySelector('.theme-toggle');
// Select icons using their Font Awesome classes
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent body scrolling when menu is open
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// ⭐ THEME TOGGLE FUNCTIONALITY (FINAL FIX) ⭐
themeToggle.addEventListener('click', () => {
    // 1. Toggle the 'light-theme' class. This is the only action needed here.
    // CSS will handle all visual and icon changes based on this class's presence.
    document.body.classList.toggle('light-theme');

    // 2. Save theme preference to localStorage
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    // NOTE: We rely entirely on the CSS for icon visibility now.
});

// ⭐ LOAD SAVED THEME PREFERENCE (FINAL FIX) ⭐
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    // Load theme preference
    if (savedTheme === 'light') {
        // If saved theme is 'light', ensure the class is added.
        document.body.classList.add('light-theme');
    } else {
        // If saved theme is 'dark' or no theme is saved (default dark), ensure the class is removed.
        document.body.classList.remove('light-theme');
    }

    // Add animations with delay for elements (Animation on Scroll)
    const animateElements = () => {
        // We select the 'section' element to apply animations to entire sections
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-animate');
                        // Optional: Unobserve after animating to save resources
                        // observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

            observer.observe(section);
        });
    };

    animateElements();
});

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields');
            return;
        }

        // --- Start of Form Submission Logic (Replace this with actual server code) ---
        
        // For local development, simulate successful submission:
        const formData = {
            name,
            email,
            subject,
            message
        };

        console.log('Form submitted:', formData);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);

        // --- End of Form Submission Logic ---
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href is just "#"

        const targetElement = document.querySelector(targetId);
        
        // Get the actual height of the fixed header dynamically
        const headerHeight = header ? header.offsetHeight : 0;

        if (targetElement) {
            window.scrollTo({
                // Subtract header height from target's top position
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Add typing effect to the binary in hero section
const binaryElement = document.querySelector('.binary');
if (binaryElement) {
    // Check if the element has content defined in HTML, otherwise use a default
    const originalText = binaryElement.dataset.text || binaryElement.innerText || '01100101 01111000 01100001 01101101 01110000 01101100 01100101';
    binaryElement.innerText = ''; // Clear text content

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            binaryElement.innerText += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing effect when page loads
    setTimeout(typeWriter, 1000);
}
