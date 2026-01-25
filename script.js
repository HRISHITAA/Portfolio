/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const stickyNav = document.getElementById('stickyNav');

    // Only run this if the sticky nav exists (i.e., not on the home page)
    if (stickyNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                stickyNav.classList.add('scrolled');
            } else {
                stickyNav.classList.remove('scrolled');
            }
        });
    }
});
