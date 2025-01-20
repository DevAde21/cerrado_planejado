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

    const productsArrowsContainer = document.createElement('div');
    productsArrowsContainer.classList.add('products-arrows-container');

    // Criação dos botões de seta
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
    let touchStartX = 0;
    let touchStartY = 0;
    let hasMoved = false;

    // Adiciona um ouvinte de evento de clique a cada imagem do carrossel
    productsCarouselItems.forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            // Fechar qualquer imagem ampliada existente, independentemente do carrossel
            closeExpandedImage();

            // Exibe o overlay
            overlayZoom.style.display = 'block';

            // Cria uma nova imagem ampliada
            expandedImg = document.createElement('img');
            expandedImg.src = img.src;
            expandedImg.classList.add('expanded-image');
            expandedImg.style.zIndex = '10000'; // Posiciona a imagem acima do overlay

            // Adiciona a imagem ampliada ao corpo do documento
            document.body.appendChild(expandedImg);

            // Impede a rolagem do corpo da página e a interação com elementos abaixo
            document.body.classList.add('zoom-active');

            // Impede a interação com elementos atrás da imagem ampliada e do overlay
            overlayZoom.style.pointerEvents = 'auto';

            // Adiciona um ouvinte de evento de clique na imagem ampliada para fechar
            expandedImg.addEventListener('click', closeExpandedImage);
        });
    });

      function calculateProductsSlidePosition(index) {
       return -index * productsItemWidth;
    }
      function calculateProductsLoopIndex(index) {
       const baseIndex = index - productsItemsToShow;
         return (baseIndex % productsNumItems + productsNumItems) % productsNumItems + 1;
  }
  function moveToProductsSlide(index) {
    if (productsIsTransitioning) return;
  
    if (window.matchMedia('(pointer: fine)').matches) {
      // Para dispositivos com mouse
      if (index > productsNumItems - productsItemsToShow) {
        index = productsNumItems - productsItemsToShow;
      }
    } else {
      // Para dispositivos touchscreen
      // Aqui estava o erro: a condição estava limitando a rolagem para o penúltimo item (productsNumItems - 2)
      // O correto é limitar para o último item visível de acordo com productsItemsToShow
      if (index > productsNumItems - productsItemsToShow) {
        index = productsNumItems - productsItemsToShow;
      }
    }
  
    // Garante que não haja rolagem antes do primeiro item
    if (index < 0) {
      index = 0;
    }
  
    productsIsTransitioning = true;
    productsCarouselTrack.style.transition = 'transform .5s ease-in-out';
    productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(index)}px)`;
    productsFirstVisibleItem = index;
  
    setTimeout(() => {
      productsIsTransitioning = false;
    }, productsTransitionDuration);
  }
  

    function hasCursor() {
       return window.matchMedia('(pointer: fine)').matches;
   }

   function updateCarouselMode() {
    productsNextButton.addEventListener('click', () => {
        if (productsIsTransitioning) return;
        moveToProductsSlide(productsFirstVisibleItem + productsItemsToMove);
    });
    
    productsPrevButton.addEventListener('click', () => {
        if (productsIsTransitioning) return;
        moveToProductsSlide(productsFirstVisibleItem - productsItemsToMove);
    });

         if(!hasCursor()){

                productsItemsToMove = 1;

               productsCarouselContainer.addEventListener('touchstart', startDrag);
              productsCarouselContainer.addEventListener('touchmove', moveDrag);
               productsCarouselContainer.addEventListener('touchend', endDrag);
          }
         else {
            productsItemsToMove = productsItemsToShow;
                productsCarouselContainer.removeEventListener('touchstart', startDrag);
             productsCarouselContainer.removeEventListener('touchmove', moveDrag);
               productsCarouselContainer.removeEventListener('touchend', endDrag);

           }

  }
  function startDrag(e) {
    productsIsDragging = true;
    hasMoved = false; // Reinicia a flag de movimento
    touchStartX = e.touches[0].clientX; // Coordenada inicial do toque
    touchStartY = e.touches[0].clientY; // Coordenada inicial do toque vertical
    productsStartX = e.touches[0].pageX - productsCarouselTrack.offsetLeft; // Posição inicial horizontal
    productsCarouselContainer.classList.add('dragging');
    productsCarouselTrack.style.transition = 'none';
}

function moveDrag(e) {
    if (!productsIsDragging) return;

    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;

    // Detecta movimento significativo para diferenciar toque simples de arraste
    if (Math.abs(touchMoveX - touchStartX) > 10 || Math.abs(touchMoveY - touchStartY) > 10) {
        hasMoved = true;
        productsCurrentX = e.touches[0].pageX - productsCarouselTrack.offsetLeft;
        productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem) + (productsCurrentX - productsStartX)}px)`;
    }
}

function endDrag(e) {
    if (!productsIsDragging) return;
    productsIsDragging = false;
    productsCarouselContainer.classList.remove('dragging');

    if (hasMoved) {
        // Calcula a movimentação do arraste
        const diff = productsCurrentX - productsStartX - 75; // O valor subtraído serve para diminuir a sensibilidade da margem de arrasto

        if (Math.abs(diff) > productsThreshold) {
            const dragDistanceInItems = Math.round(diff / productsItemWidth);
            moveToProductsSlide(productsFirstVisibleItem - dragDistanceInItems);
        } else {
            productsCarouselTrack.style.transition = 'transform 0.2s ease-in-out';
            productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
        }
    } else {
        // Caso não tenha havido movimento, retorna à posição inicial
        productsCarouselTrack.style.transition = 'transform 0.2s ease-in-out';
        productsCarouselTrack.style.transform = `translateX(${calculateProductsSlidePosition(productsFirstVisibleItem)}px)`;
    }

    productsStartX = 0;
    productsCurrentX = 0;
}

   // Inicializa o modo do carrossel e ouve mudanças na mídia para atualizar
   updateCarouselMode();
    window.matchMedia('(pointer: fine)').addEventListener('change', updateCarouselMode);
   productsCarouselTrack.addEventListener('transitionend', () => {
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