// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const header = document.querySelector('.header');
  const headerCta = document.getElementById('headerCta');
  const heroCta = document.getElementById('heroCta');
  const purchaseSection = document.getElementById('purchase');
  const topicsSection = document.getElementById('topics');
  
  // Add scroll event listener for header styling
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.add('scrolled');
      setTimeout(() => {
        if (window.scrollY <= 50) {
          header.classList.remove('scrolled');
        }
      }, 300);
    }
    
    // Reveal elements on scroll
    revealElements();
  });
  
  // Smooth scroll function
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }
  
  // Click event for header CTA button
  headerCta.addEventListener('click', function() {
    smoothScroll('#purchase', 1000);
  });
  
  // Click event for hero CTA button
  heroCta.addEventListener('click', function() {
    smoothScroll('#purchase', 1000);
  });
  
  // Reveal elements on scroll
  function revealElements() {
    const elements = document.querySelectorAll('.topic-card, .benefit-card, .testimonial-content, .purchase-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize elements as hidden
  function initializeElements() {
    const elements = document.querySelectorAll('.topic-card, .benefit-card, .testimonial-content, .purchase-card');
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger reveal on page load
    setTimeout(revealElements, 300);
  }
  
  // Initialize the page
  initializeElements();
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.topic-card, .benefit-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Countdown timer for limited time offer (24 hours from when the page loads)
  function startCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.marginTop = '20px';
    countdownElement.style.fontWeight = 'bold';
    
    const purchaseCard = document.querySelector('.purchase-card');
    const priceTag = document.querySelector('.price-tag');
    
    purchaseCard.insertBefore(countdownElement, priceTag.nextSibling);
    
    // Set the countdown to 24 hours from now
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1);
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      // Calculate hours, minutes, and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the countdown
      countdownElement.innerHTML = `<p>Oferta especial termina em:</p>
                                   <div style="font-size: 1.2rem; color: #0A3D62; margin-top: 10px;">
                                     ${hours}h ${minutes}m ${seconds}s
                                   </div>`;
      
      // If the countdown is over, display a message
      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = 'Oferta especial encerrada!';
      }
    }, 1000);
  }
  
  // Start the countdown
  startCountdown();
});