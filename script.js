// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should animate
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature, .chapter, .project-card, .part');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Newsletter Form Handling
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '✓ Subscribed!';
        button.style.background = '#22c55e';
        this.querySelector('input').value = '';
        showMessage('Thank you for subscribing! We\'ll send you updates about the book.', 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '#ffffff';
        }, 3000);
    }, 1500);
});

// Show Message Function
function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="message-text">${message}</span>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles for the message popup
    const style = document.createElement('style');
    style.textContent = `
        .message-popup {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .message-popup.success {
            border-left: 5px solid #22c55e;
        }
        
        .message-popup.error {
            border-left: 5px solid #ef4444;
        }
        
        .message-popup.info {
            border-left: 5px solid #3b82f6;
        }
        
        .message-content {
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .message-icon {
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .message-popup.success .message-icon {
            color: #22c55e;
        }
        
        .message-popup.error .message-icon {
            color: #ef4444;
        }
        
        .message-popup.info .message-icon {
            color: #3b82f6;
        }
        
        .message-text {
            flex: 1;
            color: #333;
            line-height: 1.4;
        }
        
        .message-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .message-close:hover {
            color: #333;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .message-popup {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('#message-styles')) {
        style.id = 'message-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add loading animation for code preview
document.addEventListener('DOMContentLoaded', function() {
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalContent = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        // Type out the code with animation
        let index = 0;
        const speed = 50; // milliseconds per character
        
        function typeCode() {
            if (index < originalContent.length) {
                const char = originalContent.charAt(index);
                if (char === '<') {
                    // Skip HTML tags
                    const tagEnd = originalContent.indexOf('>', index);
                    if (tagEnd !== -1) {
                        codeContent.innerHTML += originalContent.substring(index, tagEnd + 1);
                        index = tagEnd + 1;
                    }
                } else {
                    codeContent.innerHTML += char;
                    index++;
                }
                setTimeout(typeCode, speed);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeCode, 1000);
    }
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Interactive project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Add click-to-copy functionality for code snippets
document.addEventListener('DOMContentLoaded', function() {
    const codePreview = document.querySelector('.code-preview');
    if (codePreview) {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copy';
        copyButton.className = 'copy-code-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        codePreview.style.position = 'relative';
        codePreview.appendChild(copyButton);
        
        codePreview.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        codePreview.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', () => {
            const codeText = `# Your first Python program
print("Hello, World!")
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")`;
            
            navigator.clipboard.writeText(codeText).then(() => {
                copyButton.innerHTML = '✓ Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            }).catch(() => {
                showMessage('Could not copy code to clipboard', 'error');
            });
        });
    }
});

// Add mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);
