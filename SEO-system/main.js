class NavigationManager {
  constructor() {
    this.menuItems = document.querySelectorAll('.header_list__inner, .header_nav__inner');
    this.burgerMenu = document.querySelector('.burger-menu');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    this.menuOverlay = document.querySelector('.menu-overlay');

    this.init();
  }

  init() {
    // Обработчики для десктопного меню
    this.menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.setActiveItem(item);
      });
    });

    // Инициализация бургер-меню
    this.initBurgerMenu();
  }

  // Инициализация бургер-меню
  initBurgerMenu() {
    if (this.burgerMenu) {
      this.burgerMenu.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Закрытие меню по клику на оверлей
      if (this.menuOverlay) {
        this.menuOverlay.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }

      // Обработка кликов по пунктам мобильного меню
      this.mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
          this.setActiveMobileItem(item);
          this.closeMobileMenu();
        });
      });
    }
  }
  // Добавьте этот код в класс NavigationManager после initBurgerMenu()

 // Инициализация мобильной навигации header_nav
initMobileNav() {
  const mobileNavTrigger = document.querySelector('.header_nav__inner_390px');
  const headerNav = document.querySelector('.header_nav');

  if (mobileNavTrigger && headerNav) {
    mobileNavTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMobileNav(headerNav);
    });

    // Закрытие по клику вне области
    document.addEventListener('click', (e) => {
      if (!headerNav.contains(e.target) && !mobileNavTrigger.contains(e.target)) {
        this.closeMobileNav(headerNav);
      }
    });

    // Закрытие по клику на пункты меню
    const navItems = headerNav.querySelectorAll('.header_nav__inner:not(.header_nav__inner_390px)');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        this.closeMobileNav(headerNav);
        // Здесь можно добавить логику выбора пункта меню
      });
    });
  }
}

// Переключение мобильной навигации
toggleMobileNav(headerNav) {
  headerNav.classList.toggle('mobile-nav-active');

  // Поворачиваем стрелку
  const arrow = document.querySelector('.header_nav__inner_390px img');
  if (arrow) {
    arrow.style.transform = headerNav.classList.contains('mobile-nav-active') 
      ? 'rotate(180deg)' 
      : 'rotate(0deg)';
  }
}

// Закрытие мобильной навигации
closeMobileNav(headerNav) {
  headerNav.classList.remove('mobile-nav-active');
  
  // Возвращаем стрелку в исходное положение
  const arrow = document.querySelector('.header_nav__inner_390px img');
  if (arrow) {
    arrow.style.transform = 'rotate(0deg)';
  }
}

  // Обновите метод init()
  init() {
    // Обработчики для десктопного меню
    this.menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.setActiveItem(item);
      });
    });

    // Инициализация бургер-меню
    this.initBurgerMenu();

    // Инициализация мобильной навигации
    this.initMobileNav();
  }

  // Переключение мобильного меню
  toggleMobileMenu() {
    if (this.burgerMenu) this.burgerMenu.classList.toggle('active');
    if (this.mobileMenu) this.mobileMenu.classList.toggle('active');
    if (this.menuOverlay) this.menuOverlay.classList.toggle('active');

    const isMenuActive = this.mobileMenu && this.mobileMenu.classList.contains('active');
    document.body.style.overflow = isMenuActive ? 'hidden' : '';
  }

  // Закрытие мобильного меню
  closeMobileMenu() {
    if (this.burgerMenu) this.burgerMenu.classList.remove('active');
    if (this.mobileMenu) this.mobileMenu.classList.remove('active');
    if (this.menuOverlay) this.menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Установка активного пункта в мобильном меню
  setActiveMobileItem(clickedItem) {
    this.mobileMenuItems.forEach(item => {
      item.classList.remove('active');
    });
    clickedItem.classList.add('active');

    // Сохраняем выбранный пункт
    const itemText = clickedItem.textContent;
    localStorage.setItem('activeMobileMenuItem', itemText);

    // Загрузка контента
    this.loadContent(itemText, 'mobile_menu');
  }

  setActiveItem(clickedItem) {
    // Определяем группу элементов (header_list или header_nav)
    const isHeaderList = clickedItem.classList.contains('header_list__inner');
    const groupSelector = isHeaderList ? '.header_list__inner' : '.header_nav__inner';

    // Убираем активный класс у всех пунктов в этой группе
    const groupItems = document.querySelectorAll(groupSelector);
    groupItems.forEach(item => {
      item.classList.remove('active');
    });

    // Добавляем активный класс к выбранному пункту
    clickedItem.classList.add('active');

    // Сохраняем активный пункт в localStorage с ключом для группы
    const itemText = clickedItem.textContent;
    const storageKey = isHeaderList ? 'activeNavItem_header_list' : 'activeNavItem_header_nav';
    localStorage.setItem(storageKey, itemText);

    // Здесь можно добавить логику загрузки контента
    this.loadContent(clickedItem.textContent, isHeaderList ? 'header_list' : 'header_nav');
  }

  loadContent(sectionName, groupType) {
    console.log(`Загружаем контент для: ${sectionName} из группы: ${groupType}`);
    // Здесь будет логика загрузки соответствующего контента
    // Например, AJAX запросы или переключение видимости блоков
  }

  // Восстановление активных пунктов при загрузке страницы
  restoreActiveItems() {
    // Восстанавливаем для header_list
    const savedHeaderListItem = localStorage.getItem('activeNavItem_header_list');
    if (savedHeaderListItem) {
      const headerListItems = document.querySelectorAll('.header_list__inner');
      headerListItems.forEach(item => {
        if (item.textContent === savedHeaderListItem) {
          item.classList.add('active');
        }
      });
    }

    // Восстанавливаем для header_nav
    const savedHeaderNavItem = localStorage.getItem('activeNavItem_header_nav');
    if (savedHeaderNavItem) {
      const headerNavItems = document.querySelectorAll('.header_nav__inner');
      headerNavItems.forEach(item => {
        if (item.textContent === savedHeaderNavItem) {
          item.classList.add('active');
        }
      });
    }
  
    // Восстанавливаем для мобильного меню
    const savedMobileItem = localStorage.getItem('activeMobileMenuItem');
    if (savedMobileItem && this.mobileMenuItems) {
      this.mobileMenuItems.forEach(item => {
        if (item.textContent === savedMobileItem) {
          item.classList.add('active');
        }
      });
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const navManager = new NavigationManager();
  navManager.restoreActiveItems();
});

// Дополнительные эффекты при наведении для обоих типов элементов
document.querySelectorAll('.header_list__inner, .header_nav__inner').forEach(item => {
  item.addEventListener('mouseenter', function () {
    if (!this.classList.contains('active')) {
      this.style.transform = 'translateX(0px)';
    }
  });

  item.addEventListener('mouseleave', function () {
    if (!this.classList.contains('active')) {
      this.style.transform = 'translateX(0)';
    }
  });
});
// В card.js или main.js добавьте проверку ширины экрана
function toggleCard(card, cardId) {
  // Если это мобильное устройство, не выполняем переключение
  if (window.innerWidth <= 390 && card.classList.contains('mobile-card')) {
    return;
  }

  // Остальная логика для десктопной версии
  if (card === activeCard) {
    card.classList.remove('active');
    activeCard = null;
    activeCardId = null;
    return;
  }

  if (activeCard) {
    activeCard.classList.remove('active');
  }

  card.classList.add('active');
  activeCard = card;
  activeCardId = cardId;
}