document.addEventListener('DOMContentLoaded', function () {

    // Menu de Navegação para Media Query 2
    const menuToggle = document.querySelector('.secondary-menu-toggle');
    const secondaryMenu = document.createElement('div'); // Cria o menu secundário
    secondaryMenu.classList.add('secondary-menu');
    document.body.appendChild(secondaryMenu); // Adiciona o menu ao body

    // Cria a lista de itens do menu secundário
    const menuItems = `
        <ul>
            <li><a href="#inicio" class="active">Tela Inicial</a></li>
            <li><a href="#produtos">Ambientes</a></li>
            <li><a href="#processo">Etapas do processo</a></li>
            <li><a href="#escolher">Por que nos escolher</a></li>
            <li><a href="scripts/html/about_us.html">Sobre nós</a></li>
        </ul>
        <div class="secondary-menu-contacts">
          <a href="https://www.instagram.com/cerradoplanejado/" target="_blank" rel="noopener noreferrer">
              <img class="secondary-menu-contacts-icon" src="assets/instagram2.png" alt="Instagram">
            </a>
            <a href="https://wa.me/+5561981002114" target="_blank" rel="noopener noreferrer">
                <img class="secondary-menu-contacts-icon" src="assets/whatsapp2.png" alt="WhatsApp">
            </a>
            <a href="mailto:contato@cerradoplanejado.com.br">
                <img class="secondary-menu-contacts-icon" src="assets/email2.png" alt="E-mail">
            </a>
        </div>
    `;
    secondaryMenu.innerHTML = menuItems;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            secondaryMenu.classList.toggle('active'); // Abre/fecha o menu
            overlay.style.display = 'block'; //mostra o overlay
            document.body.classList.add('menu-active'); // Adiciona classe para prevenir scroll
        });
    }

    // Fecha o menu ao clicar fora dele
    if (overlay) {
        overlay.addEventListener('click', function() {
            secondaryMenu.classList.remove('active');
            overlay.style.display = 'none';
            document.body.classList.remove('menu-active'); // Remove classe para permitir scroll
        });
    }

    const navLinks = document.querySelectorAll('.nav ul li a, .secondary-menu ul li a'); // Alteração na linha para adicionar itens do menu

    // Adicionando o redirecionamento para o botão Sobre
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'scripts/html/about_us.html') {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                secondaryMenu.classList.remove('active');
                overlay.style.display = 'none';
                document.body.classList.remove('menu-active'); // Remove classe para permitir scroll
                window.location.href = 'scripts/html/about_us.html';
            });
        }
    });

    // Adicionando o redirecionamento para o botão de orçamento
    const budgetButton = document.querySelector('.home-budget-button');
    if (budgetButton) {
        budgetButton.addEventListener('click', function() {
            window.location.href = 'scripts/html/budget_prev.html';
        });
    }

    // Faz a página voltar ao topo ao clicar em Tela Inicial
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            let offset = 0;

            if (targetId === '#inicio') {
                window.scrollTo(0, 0);
                secondaryMenu.classList.remove('active');
                overlay.style.display = 'none';
                document.body.classList.remove('menu-active');
            } else {
                let targetElement;
                if (targetId === '#produtos') {
                    targetElement = document.querySelector('.products-main-container');
                    offset = -90; // Ajuste o valor do offset aqui
                } else if (targetId === '#processo') {
                    targetElement = document.querySelector('#processo .content');
                    offset = -80; // Ajuste o valor do offset aqui
                } else if (targetId === '#escolher') {
                    targetElement = document.querySelector('.choose-us-card');
                    offset = -130; // Ajuste o valor do offset aqui
                }

                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    secondaryMenu.classList.remove('active');
                    overlay.style.display = 'none';
                    document.body.classList.remove('menu-active');
                }
            }
        });
    });

    const carouselInner = document.querySelector('.home-carousel-inner');
    const carouselItems = document.querySelectorAll('.home-carousel-item');
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    setInterval(nextSlide, 3000);
});

// Dados dos produtos para os carrosséis
const productsCarouselData = [ // ideal serem sempre números pares
    { title: "Salas", directory: "assets/produtos/sala", numImages: 18 },
    { title: "Escritórios", directory: "assets/produtos/escritorio", numImages: 6 },
    { title: "Quartos", directory: "assets/produtos/quarto", numImages: 6 },
    { title: "Banheiros", directory: "assets/produtos/banheiro", numImages: 6 },
    { title: "Cozinhas", directory: "assets/produtos/cozinha", numImages: 9 }
];

const productsItemsToShow = 3;
const productsTransitionDuration = 200;

// Variável global para armazenar a imagem ampliada atualmente
let expandedImg = null;

// Criação global do overlayZoom e ajuste no z-index
const overlayZoom = document.createElement('div');
overlayZoom.classList.add('overlay'); // Usa a mesma classe 'overlay' para estilo
overlayZoom.style.zIndex = '9999'; // Posiciona acima dos outros elementos, exceto a imagem ampliada
overlayZoom.style.display = 'none'; // Oculta inicialmente
document.body.appendChild(overlayZoom);

// Função global para fechar a imagem ampliada
const closeExpandedImage = () => {
    if (expandedImg) {
        document.body.removeChild(expandedImg);
        expandedImg = null; // Limpa a referência
        overlayZoom.style.display = 'none';
        document.body.classList.remove('zoom-active');

        // Reativa a interação com elementos abaixo do overlay
        overlayZoom.style.pointerEvents = 'none';
    }
};

// Adiciona ouvintes de eventos globais para fechar a imagem
overlayZoom.addEventListener('click', closeExpandedImage);
window.addEventListener('wheel', closeExpandedImage);
window.addEventListener('touchmove', closeExpandedImage);
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeExpandedImage();
    }
});

function createProductsCarousel(data) {
    const productsMainContainer = document.createElement('div');
    productsMainContainer.classList.add('products-main-container');

    const productsTitle = document.createElement('h1');
    productsTitle.textContent = data.title;
    productsMainContainer.appendChild(productsTitle);

    const productsSeparator = document.createElement('div');
    productsSeparator.classList.add('products-separator');
    productsMainContainer.appendChild(productsSeparator);

    const productsCarouselContainer = document.createElement('div');
    productsCarouselContainer.classList.add('products-carousel-container');

    const productsCarouselTrack = document.createElement('div');
    productsCarouselTrack.classList.add('products-carousel-track');
    productsCarouselContainer.appendChild(productsCarouselTrack);
    productsMainContainer.appendChild(productsCarouselContainer);

    document.body.insertBefore(productsMainContainer, document.getElementById("processo"));

    function createProductsCarouselItems() {
        for (let i = 1; i <= data.numImages; i++) {
            const productsCarouselItem = document.createElement('div');
            productsCarouselItem.classList.add('products-carousel-item');
            const img = document.createElement('img');
            img.loading = 'lazy';
            img.src = `${data.directory}/${data.directory.split('/').pop()}${i}.webp`;
            img.alt = `${data.title} ${i}`;

            // Adiciona ouvinte de evento de clique para cada imagem
            img.addEventListener('click', () => {
                expandedImg = document.createElement('img');
                expandedImg.src = img.src;
                expandedImg.classList.add('expanded-image');
                document.body.appendChild(expandedImg);
                overlayZoom.style.display = 'block';
                document.body.classList.add('zoom-active');

                // Desativa a interação com elementos abaixo do overlay
                overlayZoom.style.pointerEvents = 'auto';
            });

            productsCarouselItem.appendChild(img);
            productsCarouselTrack.appendChild(productsCarouselItem);
        }
    }

    createProductsCarouselItems();

    const productsCarouselItems = productsCarouselTrack.querySelectorAll('.products-carousel-item');
    const productsItemWidth = productsCarouselItems[0].offsetWidth + parseInt(window.getComputedStyle(productsCarouselItems[0]).marginRight);

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const maxTranslate = 0;
    const minTranslate = -(productsCarouselItems.length * productsItemWidth - productsCarouselContainer.offsetWidth);

    productsCarouselTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        productsCarouselTrack.style.transition = 'none';
    });

    productsCarouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;

        currentTranslate = Math.max(Math.min(prevTranslate + deltaX, maxTranslate), minTranslate);
        productsCarouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    });

    productsCarouselTrack.addEventListener('touchend', () => {
        isDragging = false;
        prevTranslate = currentTranslate;
    });
}
productsCarouselData.forEach(data => createProductsCarousel(data));

// Função para desativar o efeito de seleção azul
function disableBlueHighlight() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent;
        }
    `;
    document.head.appendChild(style);
}

// Função para remover animações de hover em dispositivos sem cursor
function removeHoverAnimations() {
    if (!window.matchMedia('(pointer: fine)').matches) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .products-carousel-item img:hover,
            .home-budget-button:hover,
            .products-carousel-arrow:hover,
            .header-contacts button:hover {
                transform: none !important;
                background-color: inherit !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Executar as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    disableBlueHighlight();
    removeHoverAnimations();
});