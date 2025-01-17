// Ouvinte de evento para o clique no ícone do menu secundário
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.secondary-menu-toggle');
    const secondaryMenu = document.querySelector('.secondary-menu');
    const navLinks = document.querySelectorAll('.nav ul li a, .secondary-menu ul li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            secondaryMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('data-target');
            const targetUrl = `../../index.html#${target}`;
    
            if (target === 'sobre-nos') {
                // Para o link "Sobre nós", abra a página about_us.html diretamente
                window.location.href = '../../scripts/html/about_us.html';
            } else {
                // Para outros links, redirecione para index.html e role para a seção correspondente
                window.location.href = targetUrl;
            }
        });
    });    
});