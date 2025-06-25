// About page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Skills animation
    const progressBars = document.querySelectorAll('.progress span');
    const progressTexts = document.querySelectorAll('.prog-text');
    
    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progressText = progressBar.parentElement.previousElementSibling;
                const percentage = progressText.textContent;
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = percentage;
                }, 500);
                
                // Animate percentage text
                animateCounter(progressText, percentage);
                
                skillsObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all progress bars
    progressBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
    
    // Counter animation function
    function animateCounter(element, targetPercentage) {
        const target = parseInt(targetPercentage);
        let current = 0;
        const increment = target / 50; // 50 steps for smooth animation
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, stepTime);
    }
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Set initial state and observe timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px -15px rgba(2, 12, 27, 0.8)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px -15px rgba(2, 12, 27, 0.7)';
        });
    });
    
    // Add typing effect to the main heading
    const mainHeading = document.querySelector('.left-about h4');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '2px solid #64ffda';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                mainHeading.style.borderRight = 'none';
            }
        };
        
        // Start typing animation when page loads
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll-triggered animations for the about section
    const aboutSection = document.querySelector('.left-about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(30px)';
        aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        aboutObserver.observe(aboutSection);
    }
}); 