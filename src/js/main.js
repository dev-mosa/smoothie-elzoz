// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  setupMobileMenu();

  // Add back to top button
  setupBackToTop();

  // Add smooth scrolling for navigation links
  setupSmoothScrolling();

  // Initialize animations
  setupAnimations();
});

// Mobile menu setup
function setupMobileMenu() {
  // Create mobile menu toggle button if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
    const navContainer = document.querySelector('#main-nav .container');
    const navLinks = document.querySelector('.nav-links');

    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Insert before navControls
    const navControls = document.querySelector('.nav-controls');
    navContainer.insertBefore(mobileToggle, navControls);

    // Create close button for mobile menu
    const closeButton = document.createElement('div');
    closeButton.className = 'mobile-menu-close';
    closeButton.innerHTML = '&times;'; // Cross symbol
    navLinks.insertBefore(closeButton, navLinks.firstChild);

    // Add toggle functionality
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      // Lock or unlock body scroll
      if (navLinks.classList.contains('active')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu when clicking close button
    closeButton.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });

// Close menu when clicking anywhere else
document.addEventListener('click', (event) => {
  if (!event.target.closest('.mobile-menu-toggle') &&
    !event.target.closest('.nav-links')) {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    // Unlock body scroll
    document.body.classList.remove('menu-open');
    // Reset theme-toggle z-index
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.style.zIndex = '1000';
    }
  }
});

// Set theme-toggle z-index lower when clicking links inside nav-links
const navLinksElement = document.querySelector('.nav-links');
if (navLinksElement) {
  const links = navLinksElement.querySelectorAll('a');
  const themeToggle = document.getElementById('theme-toggle');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    if (themeToggle) {
      themeToggle.style.zIndex = '900';
    }
    // Close the toggle menu
    if (mobileToggle && navLinks) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
    // Navigate to the link href
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      // For anchor links, smooth scroll handled elsewhere, so just close menu
      // Prevent default to avoid double scroll
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        history.pushState(null, null, href);
      }
    } else if (href) {
      // For normal links, navigate normally
      window.location.href = href;
    }
  });
});
}
  }
}

// Back to top button setup
function setupBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scrolling setup
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-links a, .footer-section a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only apply to links with hash
      if (link.hash) {
        const targetElement = document.querySelector(link.hash);

        if (targetElement) {
          e.preventDefault();

          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for header height
            behavior: 'smooth'
          });

          // Update URL without scrolling
          history.pushState(null, null, link.hash);
        }
      }
    });
  });
}

// Animation setup
function setupAnimations() {
  // Animate elements when they enter the viewport
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-item, .category-card, .about-content > div');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (elementPosition.top < windowHeight * 0.9) {
        element.classList.add('fade-in');
      }
    });
  };

  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
}

// Restaurant customization settings
// Edit these variables to customize the restaurant branding
const restaurantSettings = {
  name: "Smoothie Elzoz",
  primaryColor: "#009439", // Main brand color
  secondaryColor: "#afaf07", // Secondary brand color
  accentColor: "#FFFF00", // Accent color
  headerImage: "./src/imgs/header.jpg", // Header background
  logoText: "" // Text or initials shown in the logo
};

// Apply restaurant settings
function applyRestaurantSettings() {
  // Set restaurant name
  const nameElements = document.querySelectorAll('#restaurant-name');
  nameElements.forEach(el => el.textContent = restaurantSettings.name);

  // Set document title
  document.title = restaurantSettings.name;

  // Set logo text if it exists
  const logo = document.getElementById('restaurant-logo');
  if (logo) {
    logo.innerHTML = `<span>${restaurantSettings.logoText}</span>`;
  }

  // Apply primary color
  document.documentElement.style.setProperty('--primary-color', restaurantSettings.primaryColor);

  // Apply color variations (lighter and darker versions)
  const primaryRGB = hexToRgb(restaurantSettings.primaryColor);
  if (primaryRGB) {
    const primaryLight = lightenColor(primaryRGB, 0.2);
    const primaryDark = darkenColor(primaryRGB, 0.2);

    document.documentElement.style.setProperty('--primary-light', primaryLight);
    document.documentElement.style.setProperty('--primary-dark', primaryDark);
  }

  // Apply secondary color
  document.documentElement.style.setProperty('--secondary-color', restaurantSettings.secondaryColor);

  // Apply accent color
  document.documentElement.style.setProperty('--accent-color', restaurantSettings.accentColor);

  // Apply header image if it exists
  const header = document.getElementById('main-header');
  if (header) {
    header.style.backgroundImage = `url('${restaurantSettings.headerImage}')`;
  }
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper function to lighten a color
function lightenColor(rgb, amount) {
  return `rgb(${Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount))}, ${Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount))}, ${Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))})`;
}

// Helper function to darken a color
function darkenColor(rgb, amount) {
  return `rgb(${Math.max(0, Math.round(rgb.r * (1 - amount)))}, ${Math.max(0, Math.round(rgb.g * (1 - amount)))}, ${Math.max(0, Math.round(rgb.b * (1 - amount)))})`;
}

// Apply settings on load
document.addEventListener('DOMContentLoaded', () => {
  applyRestaurantSettings();
});