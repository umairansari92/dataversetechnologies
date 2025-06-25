// Clean app.js with only common functionality
document.addEventListener("DOMContentLoaded", function() {
  
  // =================== CONTACT FORM VALIDATION =====================
  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Real-time validation
    function validateField(field, validationRules) {
      const value = field.value.trim();
      const errorElement = field.parentNode.querySelector('.error-message') || 
                          document.createElement('div');
      
      if (!errorElement.classList.contains('error-message')) {
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff4757';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        field.parentNode.appendChild(errorElement);
      }
      
      let isValid = true;
      let errorMessage = '';
      
      // Required field validation
      if (validationRules.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
      }
      
      // Email validation
      if (validationRules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }
      
      // Length validation
      if (validationRules.minLength && value.length < validationRules.minLength) {
        isValid = false;
        errorMessage = `Minimum ${validationRules.minLength} characters required`;
      }
      
      if (validationRules.maxLength && value.length > validationRules.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${validationRules.maxLength} characters allowed`;
      }
      
      // Update UI
      if (isValid) {
        field.style.borderColor = '#64ffda';
        errorElement.textContent = '';
      } else {
        field.style.borderColor = '#ff4757';
        errorElement.textContent = errorMessage;
      }
      
      return isValid;
    }
    
    // Add validation listeners
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        validateField(nameInput, { required: true, minLength: 2, maxLength: 50 });
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        validateField(emailInput, { required: true, email: true });
      });
    }
    
    if (subjectInput) {
      subjectInput.addEventListener('blur', () => {
        validateField(subjectInput, { required: true, minLength: 5, maxLength: 100 });
      });
    }
    
    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        validateField(messageInput, { required: true, minLength: 10, maxLength: 1000 });
      });
    }
    
    // Form submission validation
    contactForm.addEventListener('submit', function(e) {
      let isFormValid = true;
      
      // Validate all fields
      if (nameInput) {
        isFormValid = validateField(nameInput, { required: true, minLength: 2, maxLength: 50 }) && isFormValid;
      }
      
      if (emailInput) {
        isFormValid = validateField(emailInput, { required: true, email: true }) && isFormValid;
      }
      
      if (subjectInput) {
        isFormValid = validateField(subjectInput, { required: true, minLength: 5, maxLength: 100 }) && isFormValid;
      }
      
      if (messageInput) {
        isFormValid = validateField(messageInput, { required: true, minLength: 10, maxLength: 1000 }) && isFormValid;
      }
      
      if (!isFormValid) {
        e.preventDefault();
        
        // Show error message
        const formError = document.createElement('div');
        formError.className = 'form-error';
        formError.style.color = '#ff4757';
        formError.style.textAlign = 'center';
        formError.style.marginTop = '10px';
        formError.style.padding = '10px';
        formError.style.backgroundColor = 'rgba(255, 71, 87, 0.1)';
        formError.style.borderRadius = '5px';
        formError.textContent = 'Please fix the errors above before submitting.';
        
        // Remove existing error message
        const existingError = contactForm.querySelector('.form-error');
        if (existingError) {
          existingError.remove();
        }
        
        contactForm.appendChild(formError);
        
        // Scroll to first error
        const firstError = contactForm.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Show success message
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }
      }
    });
  }
  
  // =================== ANALYTICS TRACKING =====================
  
  // Track page visits
  function trackPageVisit() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }
  
  // Track form submissions
  function trackFormSubmission() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        form_name: 'contact_form',
        page_title: document.title
      });
    }
  }
  
  // Track project clicks
  function trackProjectClick(projectName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'portfolio',
        event_label: projectName,
        value: 1
      });
    }
  }
  
  // Initialize analytics
  trackPageVisit();
  
  // Add form submission tracking
  if (contactForm) {
    contactForm.addEventListener('submit', trackFormSubmission);
  }
  
  // Add project click tracking
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    const projectName = item.querySelector('h3')?.textContent || 'Unknown Project';
    item.addEventListener('click', () => trackProjectClick(projectName));
  });
  
  // =================== SMOOTH SCROLLING =====================
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  console.log("App.js loaded successfully!");
}); 