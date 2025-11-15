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

// ⭐ THEME TOGGLE FUNCTIONALITY (FIXED) ⭐
themeToggle.addEventListener('click', () => {
    // 💡 FIX: Toggling the class will switch the theme
    // If the default is dark, adding 'light-theme' switches it to light.
    document.body.classList.toggle('light-theme');

    // Toggle icons based on the new state
    if (document.body.classList.contains('light-theme')) {
        // If light-theme is active, show the Moon (to switch back to dark)
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        // Save 'light'
        localStorage.setItem('theme', 'light');
    } else {
        // If light-theme is NOT active (i.e., we are in dark theme), show the Sun (to switch to light)
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        // Save 'dark'
        localStorage.setItem('theme', 'dark');
    }
});


// ⭐ LOAD SAVED THEME PREFERENCE (FIXED) ⭐
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    // Load theme preference
    if (savedTheme === 'light') {
        // If saved theme is 'light', ensure the class is added
        document.body.classList.add('light-theme');
        // Set icons for light theme: Show Moon (switch to dark)
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    } else {
        // If saved theme is 'dark' or no theme is saved (default dark)
        // Ensure the class is NOT added (default state)
        document.body.classList.remove('light-theme');
        // Set icons for dark theme: Show Sun (switch to light)
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
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
