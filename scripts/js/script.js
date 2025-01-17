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
    { title: "Banheiros", directory: "assets/produtos/banheiro", numImages: 3 },
    { title: "Cozinhas", directory: "assets/produtos/cozinha", numImages: 9 }
];

const productsItemsToShow = 3;
const productsTransitionDuration = 200;

function createProductsCarousel(data) {
    const productsMainContainer = document.createElement('div');
    productsMainContainer.classList.add('products-main-container');

    const productsTitle = document.createElement('h1');
    productsTitle.textContent = data.title;
    productsMainContainer.appendChild(productsTitle);

    const productsSeparator = document.createElement('div');
    productsSeparator.classList.add('products-separator');
    productsMainContainer.appendChild(productsSeparator);

    const productsArrowsContainer = document.createElement('div');
    productsArrowsContainer.classList.add('products-arrows-container');

    // Criação dos botões de seta (inicialmente ocultos)
    const productsPrevButton = document.createElement('button');
    productsPrevButton.classList.add('products-carousel-arrow', 'products-prev', 'hidden'); // Adiciona 'hidden'
    const productsPrevImg = document.createElement('img');
    productsPrevImg.src = "assets/seta.png";
    productsPrevImg.alt = "prev";
    productsPrevButton.appendChild(productsPrevImg);

    const productsNextButton = document.createElement('button');
    productsNextButton.classList.add('products-carousel-arrow', 'products-next', 'hidden'); // Adiciona 'hidden'
    const productsNextImg = document.createElement('img');
    productsNextImg.src = "assets/seta.png";
    productsNextImg.alt = "next";
    productsNextButton.appendChild(productsNextImg);

    productsArrowsContainer.appendChild(productsPrevButton);
    productsArrowsContainer.appendChild(productsNextButton);
    productsMainContainer.appendChild(productsArrowsContainer);

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
    let productsItemsToMove = productsItemsToShow;


    function cloneProductsItems() {
        for (let i = 0; i < productsItemsToShow; i++) {
            let productsFirstClone = productsCarouselItems[i].cloneNode(true);
            let productsLastClone = productsCarouselItems[productsNumItems - 1 - i].cloneNode(true);
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

    // Função para verificar se um cursor está presente
    function hasCursor() {
        return window.matchMedia('(pointer: fine)').matches;
    }

    // Exibe ou oculta setas e habilita/desabilita drag dependendo se há cursor ou não
    function updateCarouselMode() {
       if (hasCursor()) {
            // Exibe setas e habilita clique
            productsArrowsContainer.classList.remove('hidden');
             productsPrevButton.classList.remove('hidden');
             productsNextButton.classList.remove('hidden');
            productsCarouselContainer.classList.remove('dragging');
            productsItemsToMove = productsItemsToShow;

            productsCarouselContainer.removeEventListener('mousedown', startDrag);
            productsCarouselContainer.removeEventListener('touchstart', startDrag);
            window.removeEventListener('mousemove', moveDrag);
            window.removeEventListener('touchmove', moveDrag);
            window.removeEventListener('mouseup', endDrag);
            window.removeEventListener('touchend', endDrag);
            window.removeEventListener('mouseleave', endDrag);

             productsNextButton.addEventListener('click', () => {
                if (productsIsTransitioning) return;
                    if (productsFirstVisibleItem >= productsTotalItems - productsItemsToShow - productsItemsToShow) {
                    productsCarouselTrack.style.transition = 'none';
                    productsFirstVisibleItem = productsItemsToShow - productsItemsToShow;
                    productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                    productsCarouselTrack.offsetHeight;
                }
                    moveToProductsSlide(productsFirstVisibleItem + productsItemsToMove);
                });
                 productsPrevButton.addEventListener('click', () => {
                    if (productsIsTransitioning) return;
                    if (productsFirstVisibleItem <= productsItemsToShow) {
                    productsCarouselTrack.style.transition = 'none';
                    productsFirstVisibleItem = productsTotalItems - productsItemsToShow;
                    productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                    productsCarouselTrack.offsetHeight;
                }
                moveToProductsSlide(productsFirstVisibleItem - productsItemsToMove);
            });

          } else {
             // Oculta setas e habilita arrasto
            productsArrowsContainer.classList.add('hidden');
             productsPrevButton.classList.add('hidden');
             productsNextButton.classList.add('hidden');
             productsItemsToMove = 1; //muda para 1 em 1 quando estiver em touchscreen

            productsNextButton.removeEventListener('click',()=>{});
            productsPrevButton.removeEventListener('click', ()=>{});



            productsCarouselContainer.addEventListener('mousedown', startDrag);
            productsCarouselContainer.addEventListener('touchstart', startDrag);
            window.addEventListener('mousemove', moveDrag);
            window.addEventListener('touchmove', moveDrag);
            window.addEventListener('mouseup', endDrag);
            window.addEventListener('touchend', endDrag);
            window.addEventListener('mouseleave', endDrag);
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
            let numImagesToMove = productsItemsToMove * Math.round((adjustedTargetIndex - productsFirstVisibleItem) / productsItemsToMove);
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

        // Adiciona um ouvinte de evento de clique a cada imagem do carrossel
        productsCarouselItems.forEach(item => {
            const img = item.querySelector('img');
            img.addEventListener('click', (e) => {
                if (hasCursor()) return; // Não faz nada se houver cursor

                e.preventDefault(); // Impede o comportamento padrão do clique (ampliar imagem)

                  // Move para o próximo slide
                if(!productsIsDragging){
                     if (productsIsTransitioning) return;
                    if (productsFirstVisibleItem >= productsTotalItems - productsItemsToShow - productsItemsToShow) {
                    productsCarouselTrack.style.transition = 'none';
                    productsFirstVisibleItem = productsItemsToShow - productsItemsToShow;
                    productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
                    productsCarouselTrack.offsetHeight;
                   }
                    moveToProductsSlide(productsFirstVisibleItem + productsItemsToMove);
                }
            });
        });


    // Inicializa o modo do carrossel e ouve mudanças na mídia para atualizar
    updateCarouselMode();
    window.matchMedia('(pointer: fine)').addEventListener('change', updateCarouselMode);

    productsCarouselTrack.addEventListener('transitionend', () => {
        checkProductsAndResetPosition();
    });
}

productsCarouselData.forEach(data => createProductsCarousel(data));