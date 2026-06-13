// ============================================
// فایل اصلی جاوااسکریپت پروژه کارلنسر
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('پروژه کارلنسر با موفقیت بارگذاری شد');
    
    // ========== منوی همبرگر موبایل ==========
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggleBtn && navMenu) {
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }
        
        function closeMenu() {
            toggleBtn.classList.remove('active');
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function openMenu() {
            toggleBtn.classList.add('active');
            navMenu.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        overlay.addEventListener('click', closeMenu);
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }
});