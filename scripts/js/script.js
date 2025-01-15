document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav ul li a');

    // Adicionando o redirecionamento para o botão Sobre
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'scripts/html/about_us.html') {
            link.addEventListener('click', function(event) {
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
const productsCarouselData = [ // ideal serem sempre múltiplos de 3
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

     // Cria um elemento de sobreposição para o fundo escurecido
     const overlay = document.createElement('div');
     overlay.classList.add('overlay');
     document.body.appendChild(overlay);
 
     // Adiciona um ouvinte de evento de clique a cada imagem do carrossel
     productsCarouselItems.forEach(item => {
         const img = item.querySelector('img');
         img.addEventListener('click', () => {
             // Cria uma cópia da imagem clicada para exibição ampliada
             const expandedImg = document.createElement('img');
             expandedImg.src = img.src;
             expandedImg.classList.add('expanded-image');
 
             // Adiciona a imagem ampliada e o fundo ao corpo do documento
             document.body.appendChild(expandedImg);
             overlay.style.display = 'block';
 
             // Impede a rolagem do corpo da página
             document.body.classList.add('zoom-active');
 
             // Adiciona um ouvinte de evento de clique para fechar a imagem ampliada
             const closeExpandedImage = () => {
                 document.body.removeChild(expandedImg);
                 overlay.style.display = 'none';
                 document.body.classList.remove('zoom-active');
                 // Remove os ouvintes de evento quando a imagem é fechada
                 window.removeEventListener('wheel', closeExpandedImage);
                 window.removeEventListener('touchmove', closeExpandedImage);
                 window.removeEventListener('keydown', closeExpandedImageOnEsc);
             };
 
             // Fecha a imagem ampliada ao rolar
             window.addEventListener('wheel', closeExpandedImage);
             window.addEventListener('touchmove', closeExpandedImage);
 
             // Fecha a imagem ampliada ao pressionar Esc
             const closeExpandedImageOnEsc = (event) => {
                 if (event.key === 'Escape') {
                     closeExpandedImage();
                 }
             };
             window.addEventListener('keydown', closeExpandedImageOnEsc);
 
             expandedImg.addEventListener('click', closeExpandedImage);
             overlay.addEventListener('click', closeExpandedImage);
         });
     });

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

          } else {
             // Oculta setas e habilita arrasto
            productsArrowsContainer.classList.add('hidden');
             productsPrevButton.classList.add('hidden');
             productsNextButton.classList.add('hidden');

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

    // Inicializa o modo do carrossel e ouve mudanças na mídia para atualizar
    updateCarouselMode();
    window.matchMedia('(pointer: fine)').addEventListener('change', updateCarouselMode);

    productsCarouselTrack.addEventListener('transitionend', () => {
        checkProductsAndResetPosition();
    });
}

productsCarouselData.forEach(data => createProductsCarousel(data));