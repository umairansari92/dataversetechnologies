const titles = ["Web Developer", "Web Designer", "Chatbot Developer", "FreeLancer"];
let titleIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Adjust typing speed here
const erasingSpeed = 50; // Adjust erasing speed here
const delayBetweenTitles = 2000; // Delay between titles

function type() {
  if (charIndex < titles[titleIndex].length) {
    document.getElementById("typing-text").innerHTML +=
      titles[titleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTitles);
  }
}

function erase() {
  if (charIndex > 0) {
    document.getElementById("typing-text").innerHTML = titles[
      titleIndex
    ].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    titleIndex++;
    if (titleIndex >= titles.length) titleIndex = 0;
    setTimeout(type, typingSpeed);
  }
}

// Portfolio Filtering and Search Functionality
function setupPortfolioFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const searchInput = document.getElementById('projectSearch');
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        const title = item.getAttribute('data-title') || '';
        
        if (filterValue === 'all' || 
            (categories && categories.includes(filterValue)) ||
            (title && title.toLowerCase().includes(filterValue.toLowerCase()))) {
          item.classList.remove('hidden');
          item.classList.add('visible');
        } else {
          item.classList.add('hidden');
          item.classList.remove('visible');
        }
      });
    });
  });
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const title = item.getAttribute('data-title') || '';
        const categories = item.getAttribute('data-category') || '';
        const matchesSearch = title.toLowerCase().includes(searchTerm) || 
                             categories.toLowerCase().includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || 
                             categories.includes(activeFilter);
        
        if (matchesSearch && matchesFilter) {
          item.classList.remove('hidden');
          item.classList.add('visible');
        } else {
          item.classList.add('hidden');
          item.classList.remove('visible');
        }
      });
    });
  }
  
  // Add missing data attributes to portfolio items
  portfolioItems.forEach(item => {
    if (!item.getAttribute('data-category')) {
      // Auto-detect category based on title or content
      const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
      let category = 'web';
      
      if (title.includes('clone')) category = 'clone';
      else if (title.includes('chatbot') || title.includes('ai')) category = 'chatbot';
      else if (title.includes('calculator') || title.includes('timer') || title.includes('quiz') || title.includes('todo')) category = 'app';
      else if (title.includes('teachable') || title.includes('machine')) category = 'ai';
      
      item.setAttribute('data-category', category);
    }
    
    if (!item.getAttribute('data-title')) {
      const title = item.querySelector('h3')?.textContent || '';
      item.setAttribute('data-title', title);
    }
  });
}

// About Page Progress Bars Animation
function animateAboutProgress() {
  const progressBars = document.querySelectorAll('.progress-bars .progress-bar');
  
  progressBars.forEach((bar, index) => {
    const progressSpan = bar.querySelector('.progress span');
    const progText = bar.querySelector('.prog-text');
    
    if (progressSpan && progText) {
      const percentage = progText.textContent.replace('%', '');
      
      // Reset to 0 initially
      progressSpan.style.width = '0%';
      
      // Animate after a delay
      setTimeout(() => {
        progressSpan.style.width = percentage + '%';
      }, index * 200); // Stagger animation
    }
  });
}

// Resume Skills Progress Bars Animation
function animateSkillsProgress() {
  const skillItems = document.querySelectorAll('.skills-prog ul li');
  
  skillItems.forEach((item, index) => {
    const percentage = item.getAttribute('data-percent');
    const bar = item.querySelector('.bar');
    const percentageElement = item.querySelector('.percentage');
    
    if (bar && percentage) {
      // Reset bar to 0 initially
      bar.style.width = '0%';
      
      // Add percentage text if not exists
      if (!percentageElement) {
        const percentageDiv = document.createElement('div');
        percentageDiv.className = 'percentage';
        percentageDiv.textContent = percentage + '%';
        item.appendChild(percentageDiv);
      }
      
      // Animate the bar
      setTimeout(() => {
        bar.style.width = percentage + '%';
        // Make percentage visible immediately
        if (percentageElement) {
          percentageElement.style.opacity = '1';
        }
      }, index * 200); // Stagger animation
    }
  });
}

// Intersection Observer for scroll-based animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.3, // Trigger when 30% of element is visible
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // About page progress bars
        if (entry.target.classList.contains('progress-bars')) {
          animateAboutProgress();
          observer.unobserve(entry.target); // Only animate once
        }
        
        // Resume page skills
        if (entry.target.classList.contains('skills-prog')) {
          animateSkillsProgress();
          observer.unobserve(entry.target); // Only animate once
        }
      }
    });
  }, observerOptions);

  // Observe about page progress bars
  const aboutProgressBars = document.querySelector('.progress-bars');
  if (aboutProgressBars) {
    observer.observe(aboutProgressBars);
  }

  // Observe resume page skills
  const resumeSkills = document.querySelector('.skills-prog');
  if (resumeSkills) {
    observer.observe(resumeSkills);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetweenTitles);
  setupScrollAnimations();
  setupPortfolioFiltering(); // Add portfolio filtering setup
});

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
})();
