// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });
    
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert('Search functionality would be implemented here. You searched for: ' + searchBox.value);
                searchBox.value = '';
            }
        });
    }
    
    // Game card hover effect
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Theme toggle functionality - Improved version
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        
        console.log('Setting up theme toggle. Desktop button exists:', !!themeToggle, 'Mobile button exists:', !!themeToggleMobile);
        
        // Initialize theme based on localStorage or system preference
        if (localStorage.getItem('color-theme') === 'dark' || 
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        
        // Theme toggle handler function
        function handleThemeToggle(e) {
            console.log('Theme toggle clicked', e.currentTarget.id);
            
            // Toggle dark class on document element
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                localStorage.setItem('color-theme', 'light');
                console.log('Switched to light theme');
            } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                localStorage.setItem('color-theme', 'dark');
                console.log('Switched to dark theme');
            }
            
            // Prevent any default behavior or event bubbling
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Add click event listeners to theme toggle buttons
        if (themeToggle) {
            themeToggle.addEventListener('click', handleThemeToggle);
            console.log('Added event listener to desktop theme toggle');
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', handleThemeToggle);
            console.log('Added event listener to mobile theme toggle');
        }
    }

    // Create a more reliable mechanism to set up theme toggle after header loads
    function waitForElement(selector, callback, maxTimes = 10) {
        if (maxTimes <= 0) {
            console.warn('Element not found after multiple attempts:', selector);
            return;
        }
        
        if (document.querySelector(selector)) {
            callback();
        } else {
            console.log('Waiting for element:', selector);
            setTimeout(() => waitForElement(selector, callback, maxTimes - 1), 300);
        }
    }

    // Run theme toggle setup after components are loaded
    waitForElement('#theme-toggle', setupThemeToggle);
    
    // Also, listen for when header component might be added to DOM
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => waitForElement('#theme-toggle', setupThemeToggle), 500);
    });
    
    // Initialize theme even before toggle buttons are available
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        console.log('Initial theme set to dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        console.log('Initial theme set to light');
    }
    
    // Google Translate integration fixes
    // Observer to fix Google Translate iframe body classes when theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                const frameBody = document.querySelector('.goog-te-menu-frame').contentDocument.body;
                if (frameBody) {
                    if (document.documentElement.classList.contains('dark')) {
                        frameBody.classList.add('dark-theme');
                    } else {
                        frameBody.classList.remove('dark-theme');
                    }
                }
            }
        });
    });
    
    // Wait for Google Translate to load
    window.addEventListener('load', function() {
        setTimeout(function() {
            // Remove Google Translate top bar if present
            const googleTopBar = document.getElementById(':1.container');
            if (googleTopBar) {
                googleTopBar.style.display = 'none';
            }
            
            // Fix skipping that Google Translate causes
            if (document.body.classList.contains('translated-ltr')) {
                document.body.style.top = '0px';
            }
            
            // Observe theme changes for Google Translate widget
            try {
                observer.observe(document.documentElement, {
                    attributes: true
                });
            } catch(e) {
                console.log("Google Translate frame not loaded yet");
            }
        }, 1000);
    });
});
