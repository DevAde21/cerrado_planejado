
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

    const navLinks = document.querySelectorAll('.nav ul li a, .secondary-menu ul li a');

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
    let isTransitioning = false; // Controla transições para evitar cliques múltiplos
    let intervalId; // Variable to hold the interval ID

    // Navigation dots container
    const navDots = document.createElement('div');
    navDots.classList.add('home-carousel-nav');
    carouselInner.parentNode.appendChild(navDots); // Append to carousel container

    // Create dots
    for (let i = 0; i < carouselItems.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('home-carousel-dot');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetInterval(); // Reset interval on manual navigation
        });
        navDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.home-carousel-dot');

    // Clone first and last items for infinite carousel
    let firstItemClone = carouselItems[0].cloneNode(true);
    let lastItemClone = carouselItems[carouselItems.length - 1].cloneNode(true);

    carouselInner.appendChild(firstItemClone);
    carouselInner.insertBefore(lastItemClone, carouselInner.firstChild);

    // Recalculate items after cloning
    const allCarouselItems = document.querySelectorAll('.home-carousel-item');
    let itemWidth = carouselItems[0].offsetWidth; // Assuming all items have the same width initially. Recalculate on resize if needed.
    let numItems = carouselItems.length;
    currentIndex = 1; // Start at the original first item (after prepended clone)
    carouselInner.style.transform = `translateX(${-itemWidth * currentIndex}px)`;

    // Set active dot initially
    updateNavDots();

    function updateNavDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex - 1);
        });
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index + 1;
        carouselInner.style.transition = 'transform 0.4s ease-in-out';
        carouselInner.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
        updateNavDots();
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        carouselInner.style.transition = 'transform 0.4s ease-in-out';
        carouselInner.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
        updateNavDots();
    }

    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 6000);
    }

    carouselInner.addEventListener('transitionend', function() {
        if (currentIndex === numItems + 1) { // If we've moved past the last original item to the first clone
            carouselInner.style.transition = 'none'; // Disable transition for immediate repositioning
            currentIndex = 1; // Go back to the original first item position
            carouselInner.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
            updateNavDots();
        } else if (currentIndex === 0) { // Went to the cloned last item by going prev from the first
            carouselInner.style.transition = 'none';
            currentIndex = numItems; // Jump to the original last item
            carouselInner.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
            updateNavDots();
        }
        isTransitioning = false;
    });

    // Start interval after initial setup, with a slight delay to prevent immediate transition
    setTimeout(() => {
        intervalId = setInterval(nextSlide, 6000);
    }, 100); // Small delay to ensure initial setup completes first
});

// Dados dos produtos para os carrosséis
const productsCarouselData = [ // ideal serem sempre múltiplos de 3
    { title: "Salas", directory: "assets/produtos/sala", numImages: 18 },
    { title: "Escritórios", directory: "assets/produtos/escritorio", numImages: 6 },
    { title: "Quartos", directory: "assets/produtos/quarto", numImages: 6 },
    { title: "Banheiros", directory: "assets/produtos/banheiro", numImages: 3 },
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
        expandedImg.removeEventListener('click', closeExpandedImage); // Remove listener
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

    // Criação dos botões de seta ou container do carrossel, dependendo do tipo de dispositivo
    const isCursorDevice = window.matchMedia('(pointer: fine)').matches;
    let productsCarouselContainer;

    if (isCursorDevice) {
        const productsArrowsContainer = document.createElement('div');
        productsArrowsContainer.classList.add('products-arrows-container');

        const productsPrevButton = document.createElement('button');
        productsPrevButton.classList.add('products-carousel-arrow', 'products-prev');
        const productsPrevImg = document.createElement('img');
        productsPrevImg.src = "assets/seta.png";
        productsPrevImg.alt = "prev";
        productsPrevButton.appendChild(productsPrevImg);

        const productsNextButton = document.createElement('button');
        productsNextButton.classList.add('products-carousel-arrow', 'products-next');
        const productsNextImg = document.createElement('img');
        productsNextImg.src = "assets/seta.png";
        productsNextImg.alt = "next";
        productsNextButton.appendChild(productsNextImg);

        productsArrowsContainer.appendChild(productsPrevButton);
        productsArrowsContainer.appendChild(productsNextButton);
        productsMainContainer.appendChild(productsArrowsContainer);

        productsCarouselContainer = document.createElement('div');
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

                img.addEventListener('click', () => {
                    if (expandedImg) {
                        closeExpandedImage();
                    }
                    expandedImg = document.createElement('img');
                    expandedImg.src = img.src;
                    expandedImg.classList.add('expanded-image');
                    document.body.appendChild(expandedImg);
                    overlayZoom.style.display = 'block';
                    document.body.classList.add('zoom-active');

                    // Novo evento de clique na imagem ampliada
                    expandedImg.addEventListener('click', closeExpandedImage);

                    overlayZoom.style.pointerEvents = 'auto';
                });

                productsCarouselItem.appendChild(img);
                productsCarouselTrack.appendChild(productsCarouselItem);
            }
        }

        createProductsCarouselItems();

        const productsCarouselItems = productsCarouselTrack.querySelectorAll('.products-carousel-item');
        const productsItemWidth = productsCarouselItems[0].offsetWidth + parseInt(window.getComputedStyle(productsCarouselItems[0]).marginRight);
        const productsNumItems = productsCarouselItems.length;
        let productsFirstVisibleItem = 0;
        let productsIsTransitioning = false;
        let productsStartX = 0;
        let productsCurrentX = 0;
        let productsIsDragging = false;
        let productsThreshold = productsItemWidth / 2;

        function cloneProductsItems() {
            for (let i = 0; i < productsItemsToShow; i++) {
                let productsFirstClone = productsCarouselItems[i].cloneNode(true);
                let productsLastClone = productsCarouselItems[productsNumItems - 1 - i].cloneNode(true);

                productsFirstClone.querySelector('img').addEventListener('click', () => {
                    if (expandedImg) {
                        closeExpandedImage();
                    }
                    expandedImg = document.createElement('img');
                    expandedImg.src = productsFirstClone.querySelector('img').src;
                    expandedImg.classList.add('expanded-image');
                    document.body.appendChild(expandedImg);
                    overlayZoom.style.display = 'block';
                    document.body.classList.add('zoom-active');

                    expandedImg.addEventListener('click', closeExpandedImage);

                    overlayZoom.style.pointerEvents = 'auto';
                });

                productsLastClone.querySelector('img').addEventListener('click', () => {
                    if (expandedImg) {
                        closeExpandedImage();
                    }
                    expandedImg = document.createElement('img');
                    expandedImg.src = productsLastClone.querySelector('img').src;
                    expandedImg.classList.add('expanded-image');
                    document.body.appendChild(expandedImg);
                    overlayZoom.style.display = 'block';
                    document.body.classList.add('zoom-active');

                    expandedImg.addEventListener('click', closeExpandedImage);

                    overlayZoom.style.pointerEvents = 'auto';
                });

                productsCarouselTrack.appendChild(productsFirstClone);
                productsCarouselTrack.insertBefore(productsLastClone, productsCarouselItems[0]);
            }
        }

        cloneProductsItems();

        const productsClonedItems = productsCarouselTrack.querySelectorAll('.products-carousel-item');
        const productsTotalItems = productsClonedItems.length;

        productsFirstVisibleItem = productsItemsToShow;
        productsCarouselTrack.style.transform = `translateX(-${productsFirstVisibleItem * productsItemWidth}px)`;

        function calculateProductsSlidePosition(index) {
            return -index * productsItemWidth;
        }

        function updateProductsCarouselItems() {
            productsClonedItems.forEach((item, index) => {
                const itemIndex = calculateProductsLoopIndex(index);
                item.querySelector('img').src = `${data.directory}/${data.directory.split('/').pop()}${itemIndex}.webp`;
            });
        }

        function calculateProductsLoopIndex(index) {
            const baseIndex = index - productsItemsToShow;
            return (baseIndex % productsNumItems + productsNumItems) % productsNumItems + 1;
        }

        updateProductsCarouselItems();

        function moveToProductsSlide(index) {
            if (productsIsTransitioning) return;
            productsIsTransitioning = true;
            productsCarouselTrack.style.transition = 'transform .5s ease-in-out';
            productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(index)}px)`;

            productsFirstVisibleItem = index;
            updateProductsCarouselItems();
            setTimeout(() => {
                productsIsTransitioning = false;
            }, productsTransitionDuration);
        }

        const checkProductsAndResetPosition = () => {
            if (productsFirstVisibleItem >= productsTotalItems - productsItemsToShow) {
                productsCarouselTrack.style.transition = 'none';
                productsFirstVisibleItem = productsItemsToShow;
                productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
            } else if (productsFirstVisibleItem <= productsItemsToShow - 1) {
                productsCarouselTrack.style.transition = 'none';
                productsFirstVisibleItem = productsTotalItems - productsItemsToShow - 1;
                productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
            }
        }

        function startDrag(e) {
            productsIsDragging = true;
            if (e.type === 'mousedown') {
                productsStartX = e.pageX - productsCarouselTrack.offsetLeft;
            } else {
                productsStartX = e.touches[0].pageX - productsCarouselTrack.offsetLeft;
            }
            productsCarouselContainer.classList.add('dragging');
            productsCarouselTrack.style.transition = 'none';
        }

        function moveDrag(e) {
            if (!productsIsDragging) return;
            if (e.type === 'mousemove') {
                productsCurrentX = e.pageX - productsCarouselTrack.offsetLeft;
            } else {
                productsCurrentX = e.touches[0].pageX - productsCarouselTrack.offsetLeft;
            }
            productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem) + (productsCurrentX - productsStartX)}px)`;
        }

        const endDrag = () => {
            if (!productsIsDragging) return;
            productsIsDragging = false;
            productsCarouselContainer.classList.remove('dragging');
            let diff = productsCurrentX - productsStartX;

            if (Math.abs(diff) > productsThreshold) {
                const dragDistanceInItems = Math.round(diff / productsItemWidth);
                let targetIndex = productsFirstVisibleItem - dragDistanceInItems;
                let adjustedTargetIndex = targetIndex;

                if(diff > 0) { //Dragging right
                     if (targetIndex < productsItemsToShow) {
                        productsCarouselTrack.style.transition = 'none';
                        adjustedTargetIndex = productsTotalItems - productsItemsToShow + (targetIndex - productsItemsToShow);
                        productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(adjustedTargetIndex)}px)`;
                       productsCarouselTrack.offsetHeight;
                     }
                }else { //Dragging left
                    if (targetIndex > productsTotalItems - productsItemsToShow -1) {
                         productsCarouselTrack.style.transition = 'none';
                        adjustedTargetIndex = productsItemsToShow + (targetIndex - (productsTotalItems - productsItemsToShow));
                         productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(adjustedTargetIndex)}px)`;
                        productsCarouselTrack.offsetHeight;
                    }
                }

                // Ajustar o índice para múltiplas imagens
                 let numImagesToMove = productsItemsToShow * Math.round((adjustedTargetIndex - productsFirstVisibleItem) / productsItemsToShow);
                  if (numImagesToMove !== 0) {
                      moveToProductsSlide(productsFirstVisibleItem + numImagesToMove);
                 } else {
                      productsCarouselTrack.style.transition = 'transform 0.2s ease-in-out';
                      productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                 }

            } else {
                productsCarouselTrack.style.transition = 'transform 0.2s ease-in-out';
                productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
            }
            productsStartX = 0;
            productsCurrentX = 0;
        };

        productsNextButton.addEventListener('click', () => {
            if (productsIsTransitioning) return;
            if (productsFirstVisibleItem >= productsTotalItems - productsItemsToShow - productsItemsToShow) {
                productsCarouselTrack.style.transition = 'none';
                productsFirstVisibleItem = productsItemsToShow - productsItemsToShow;
                productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                productsCarouselTrack.offsetHeight;
            }
            moveToProductsSlide(productsFirstVisibleItem + productsItemsToShow);
        });

        productsPrevButton.addEventListener('click', () => {
            if (productsIsTransitioning) return;
            if (productsFirstVisibleItem <= productsItemsToShow) {
                productsCarouselTrack.style.transition = 'none';
                productsFirstVisibleItem = productsTotalItems - productsItemsToShow;
                productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                productsCarouselTrack.offsetHeight;
            }
            moveToProductsSlide(productsFirstVisibleItem - productsItemsToShow);
        });

        productsCarouselTrack.addEventListener('transitionend', () => {
            checkProductsAndResetPosition();
        });

         productsCarouselContainer.addEventListener('mousedown', startDrag);
        productsCarouselContainer.addEventListener('mousemove', moveDrag);
        productsCarouselContainer.addEventListener('mouseup', endDrag);
        productsCarouselContainer.addEventListener('mouseleave', endDrag);

        productsCarouselContainer.addEventListener('touchstart', startDrag);
        productsCarouselContainer.addEventListener('touchmove', moveDrag);
        productsCarouselContainer.addEventListener('touchend', endDrag);
    } else {
        // Configuração para dispositivos sem cursor (touchscreen)
        productsCarouselContainer = document.createElement('div');
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

                img.addEventListener('click', () => {
                    expandedImg = document.createElement('img');
                    expandedImg.src = img.src;
                    expandedImg.classList.add('expanded-image');
                    document.body.appendChild(expandedImg);
                    overlayZoom.style.display = 'block';
                    document.body.classList.add('zoom-active');

                    expandedImg.addEventListener('click', closeExpandedImage);

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
}

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

// Função para atualizar o texto de apresentação com base no tipo de dispositivo
function updatePresentationText() {
    const isCursorDevice = window.matchMedia('(pointer: fine)').matches;
    const presentationTextElement = document.querySelector('.products-apresentation-text');

    if (!isCursorDevice) {
        presentationTextElement.innerHTML = "Confira abaixo alguns dos serviços que oferecemos!<br>Arraste as imagens para ver mais";
    } else {
        presentationTextElement.innerHTML = "Confira abaixo alguns dos serviços que oferecemos!";
    }
}

// Função de inicialização que verifica o tipo de dispositivo e executa o código apropriado
function initialize() {
    disableBlueHighlight();
    removeHoverAnimations();
    updatePresentationText();

    productsCarouselData.forEach(data => {
        createProductsCarousel(data);
    });
}

// Executar a função de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('resize', updatePresentationText);