// Resume page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Skills bar animation for resume page
    const skillsBars = document.querySelectorAll('.skills-bar .bar');
    const percentageElements = document.querySelectorAll('.percentage');
    
    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillsBar = entry.target;
                const listItem = skillsBar.closest('li');
                const percentage = listItem.getAttribute('data-percent');
                const percentageElement = listItem.querySelector('.percentage');
                
                // Animate the bar
                setTimeout(() => {
                    skillsBar.style.width = percentage + '%';
                }, 300);
                
                // Animate percentage text
                if (percentageElement) {
                    animateCounter(percentageElement, percentage);
                }
                
                skillsObserver.unobserve(skillsBar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all skills bars
    skillsBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
    
    // Counter animation function
    function animateCounter(element, targetPercentage) {
        const target = parseInt(targetPercentage);
        let current = 0;
        const increment = target / 30; // 30 steps for smooth animation
        const duration = 1200; // 1.2 seconds
        const stepTime = duration / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, stepTime);
    }
    
    // Timeline animation for experience and education
    const timelineItems = document.querySelectorAll('.work ul li, .edu ul li');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Set initial state and observe timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Profile section animation
    const profileSection = document.querySelector('.profile');
    if (profileSection) {
        const profileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        profileSection.style.opacity = '0';
        profileSection.style.transform = 'translateY(-30px)';
        profileSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        profileObserver.observe(profileSection);
    }
    
    // Contact section animation
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(30px)';
        contactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        contactObserver.observe(contactSection);
    }
    
    // Follow section animation
    const followSection = document.querySelector('.follow');
    if (followSection) {
        const followObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        followSection.style.opacity = '0';
        followSection.style.transform = 'translateY(30px)';
        followSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        followObserver.observe(followSection);
    }
    
    // Add hover effects to skills bars
    skillsBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scaleY(1.1)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scaleY(1)';
        });
    });
    
    // Add hover effects to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
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
    
    // Download CV button animation
    const cvButton = document.querySelector('.cv-btn');
    if (cvButton) {
        cvButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(100, 255, 218, 0.3)';
        });
        
        cvButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.2)';
        });
    }
    
    // Social media icons animation
    const socialIcons = document.querySelectorAll('.follow .box a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}); 