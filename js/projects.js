// Projects page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filtering and Search Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const searchInput = document.getElementById('projectSearch');
    const portfolioContainer = document.getElementById('portfolioContainer');
    
    // Initialize all items as visible
    portfolioItems.forEach(item => {
        item.classList.add('visible');
        item.classList.remove('hidden');
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue, searchInput ? searchInput.value : '');
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
            filterProjects(activeFilter, searchTerm);
        });
    }
    
    // Combined filter and search function
    function filterProjects(filterValue, searchTerm) {
        let visibleCount = 0;
        
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category') || '';
            const title = item.getAttribute('data-title') || '';
            const itemTitle = item.querySelector('h3')?.textContent || '';
            
            const matchesFilter = filterValue === 'all' || 
                                 categories.includes(filterValue) ||
                                 title.toLowerCase().includes(filterValue.toLowerCase());
            
            const matchesSearch = searchTerm === '' || 
                                 title.toLowerCase().includes(searchTerm) ||
                                 itemTitle.toLowerCase().includes(searchTerm) ||
                                 categories.toLowerCase().includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                item.classList.remove('hidden');
                item.classList.add('visible');
                visibleCount++;
                // Remove animation: just reset styles
                item.style.opacity = '';
                item.style.transform = '';
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
                item.style.opacity = '';
                item.style.transform = '';
            }
        });
        
        // Show "no results" message if needed
        showNoResultsMessage(visibleCount === 0);
    }
    
    // Show/hide no results message
    function showNoResultsMessage(show) {
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (show) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: var(--color-grey-3);">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                        <h3>No projects found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
                portfolioContainer.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
    
    // Remove hover effects that animate card movement and shadow
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Add click effects to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(100, 255, 218, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Add search suggestions
    if (searchInput) {
        const suggestions = [
            'chatbot', 'web', 'clone', 'app', 'ai', 'calculator', 
            'timer', 'quiz', 'todo', 'netflix', 'apple', 'upwork'
        ];
        
        searchInput.addEventListener('focus', function() {
            this.setAttribute('placeholder', 'Try: chatbot, web, clone, app...');
        });
        
        searchInput.addEventListener('blur', function() {
            this.setAttribute('placeholder', 'Search projects...');
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
            filterProjects(activeFilter, '');
        }
    });
    
    // Add smooth scroll to top when filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                portfolioContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        });
    });
    
    // Initialize with "All" filter active
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Add loading animation for portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // On-scroll hover effect using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.3 });

    portfolioItems.forEach(item => {
        observer.observe(item);
    });
}); 