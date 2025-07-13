document.addEventListener('DOMContentLoaded', () => {
  // Create bubbles
  createBubbles();

  // Set initial active state on the first nav link
  const firstNavLink = document.querySelector('.nav-links li:first-child a');
  if (firstNavLink) {
    firstNavLink.classList.add('active');
  }

  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  
  // Get Started button effects
  const getStartedBtn = document.querySelector('.get-started-btn');
  
  if (getStartedBtn) {
    // Add click ripple effect
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      setTimeout(() => {
        ripple.remove();
        // Navigate to remove-bg.html page after ripple effect
        window.location.href = 'remove-bg.html';
      }, 600);
    });
  }

  // FAQ functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle the current FAQ item
        item.classList.toggle('active');
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        
        // Remove active class from all links
        document.querySelectorAll('.nav-links li a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Scroll to the target element
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animations on scroll
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll(
    '.feature-card, .about-content, .tech-card, .step, .testimonial-card'
  );
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});

// Function to create bubbles
function createBubbles() {
  const bubblesContainer = document.querySelector('.bubbles-container');
  if (!bubblesContainer) return;
  
  // Limit bubbles based on screen size for performance
  const screenWidth = window.innerWidth;
  const bubbleCount = screenWidth < 768 ? 15 : 30;
  
  // Clear any existing bubbles
  bubblesContainer.innerHTML = '';
  
  // Create new bubbles
  for (let i = 0; i < bubbleCount; i++) {
    createBubble(bubblesContainer);
  }
}

// Function to create a single bubble
function createBubble(container) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  // Random properties for variety
  const size = Math.random() * 60 + 20; // 20-80px
  const left = Math.random() * 100; // 0-100%
  const delay = Math.random() * 5; // 0-5s
  const duration = Math.random() * 10 + 10; // 10-20s
  const opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5
  
  // Apply styles - use transform instead of width/height for better performance
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.opacity = opacity;
  
  // Use will-change to optimize for animation
  bubble.style.willChange = 'transform, opacity';
  
  // Add bubble to container
  container.appendChild(bubble);
  
  // Remove and recreate bubble when animation ends to prevent memory issues
  bubble.addEventListener('animationend', () => {
    bubble.remove();
    createBubble(container);
  });
}

// Recreate bubbles when window is resized
window.addEventListener('resize', () => {
  // Debounce to avoid excessive calls
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(createBubbles, 250);
}); 