function initMobileSlider() {
  if (window.innerWidth <= 390) {
    const sliderContainer = document.querySelector('.cards-slider-container');
    const cardsSlider = document.querySelector('.cards-slider');
    const cards = document.querySelectorAll('.card-small.mobile-card');
    const indicators = document.querySelectorAll('.cards-slider-indicator');

    if (sliderContainer && cardsSlider && indicators.length > 0) {
      let currentSlide = 0;
      const totalSlides = cards.length;
      const slideWidth = 230;

      // Для мобильных устройств автоматически показываем развернутый контент
      function initMobileCards() {
        cards.forEach(card => {
          const defaultContent = card.querySelector('.mobile-default-hidden');
          const extendedContent = card.querySelector('.mobile-default-visible');

          if (defaultContent) defaultContent.style.display = 'none';
          if (extendedContent) extendedContent.style.display = 'flex';
        });
      }

      function updateIndicators() {
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentSlide);
        });
      }

      function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
          currentSlide = slideIndex;
          updateSlider();
        }
      }

      function updateSlider() {
        const translateX = -currentSlide * slideWidth;
        cardsSlider.style.transform = `translateX(${translateX}px)`;
        updateIndicators();
      }

      // Инициализация мобильных карточек
      initMobileCards();

      // Остальной код слайдера (индикаторы, свайпы) остается без изменений
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(index);
        });
      });

      // Свайпы для мобильных устройств
      let startX = 0;
      let isSwiping = false;

      sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        cardsSlider.style.transition = 'none';
      });

      sliderContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 10) {
          e.preventDefault();
        }
      });

      sliderContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return;

        cardsSlider.style.transition = 'transform 0.4s ease';

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0 && currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
          } else if (diff < 0 && currentSlide > 0) {
            currentSlide--;
            updateSlider();
          }
        }

        isSwiping = false;
      });

      // Убираем обработчик клика по карточке для мобильных устройств
      // cards.forEach(card => {
      //   card.removeEventListener('click', toggleCard);
      // });

      // Инициализация
      updateSlider();
    }
  } else {
    // На больших экранах возвращаем обычное поведение
    const mobileCards = document.querySelectorAll('.card-small.mobile-card');
    mobileCards.forEach(card => {
      const defaultContent = card.querySelector('.mobile-default-hidden');
      const extendedContent = card.querySelector('.mobile-default-visible');

      if (defaultContent) defaultContent.style.display = 'flex';
      if (extendedContent) extendedContent.style.display = 'none';
      card.style.pointerEvents = 'auto';
    });
  }
}
// Инициализация при загрузке и изменении размера
document.addEventListener('DOMContentLoaded', initMobileSlider);
window.addEventListener('resize', initMobileSlider);



// Слайдер для advantages на мобильных устройствах
function initAdvantagesSlider() {
  const advantagesSlider = document.querySelector('.advantages_banefits_card');
  const indicators = document.querySelectorAll('.advantages_slider_indicator');

  // Если мы не на мобильном устройстве или элементы не найдены - выходим
  if (!advantagesSlider || indicators.length === 0) {
    return;
  }

  let currentSlide = 0;
  const totalSlides = 3; // У нас 3 карточки-слайда
  const slideWidth = 362; // 100% на слайд

  function updateSlider() {
    // Перемещаем слайдер
    const translateX = -currentSlide * slideWidth;
    advantagesSlider.style.transform = `translateX(${translateX}px)`;

    // Обновляем пагинацию
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      currentSlide = slideIndex;
      updateSlider();
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  // Добавляем обработчики для пагинации
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(index);
    });
  });

  // Свайпы для мобильных устройств
  let startX = 0;
  let isSwiping = false;

  advantagesSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  advantagesSlider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Блокируем вертикальную прокрутку во время горизонтального свайпа
    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  });

  advantagesSlider.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Свайп влево - следующий слайд
        nextSlide();
      } else {
        // Свайп вправо - предыдущий слайд
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      }
    }

    isSwiping = false;
  });

  updateSlider();
}

// Слайдер для services
function initServicesSlider() {
  const servicesSlider = document.querySelector('.services_cards_inner');
  const indicators = document.querySelectorAll('.services_slider_indicator');



  // Если элементы не найдены - выходим
  if (!servicesSlider || indicators.length === 0) {
    return;
  }

  let currentSlide = 0;
  const totalSlides = 3;
  const slideWidth = 334; // 100% на слайд

  function updateSlider() {
    const translateX = -currentSlide * slideWidth;
    servicesSlider.style.transform = `translateX(${translateX}px)`;

    // Обновляем пагинацию
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      currentSlide = slideIndex;
      updateSlider();
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  }

  // Добавляем обработчики для пагинации
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function (e) {
      e.preventDefault();
      goToSlide(index);
    });
  });

  // Свайпы для мобильных устройств
  let startX = 0;
  let isSwiping = false;

  servicesSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    servicesSlider.style.transition = 'none';
  });

  servicesSlider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Блокируем вертикальную прокрутку
    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  });

  servicesSlider.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    servicesSlider.style.transition = 'transform 0.4s ease';

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        nextSlide();
      } else if (diff < 0 && currentSlide > 0) {
        prevSlide();
      }
    }

    isSwiping = false;
  });

  // Инициализация
  updateSlider();
}
// Улучшенная инициализация
// Улучшенная инициализация
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - initializing sliders');
  initMobileSlider();
  initAdvantagesSlider();
  initServicesSlider(); // ← Добавьте эту строку
});

window.addEventListener('resize', function () {
  console.log('Resize event - reinitializing sliders');
  initMobileSlider();
  initAdvantagesSlider();
  initServicesSlider(); // ← Добавьте эту строку
});

// Также инициализируем когда страница полностью загружена
window.addEventListener('load', function () {
  console.log('Page loaded - final slider initialization');
  initAdvantagesSlider();
  initServicesSlider(); // ← Добавьте эту строку
});