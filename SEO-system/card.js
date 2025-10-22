let activeCard = null;
let activeCardId = null;

function toggleCard(card, cardId) {
  // Если кликнули на уже активную карточку - деактивируем её
  if (card === activeCard) {
    card.classList.remove('active');
    activeCard = null;
    activeCardId = null;
    return;
  }

  // Деактивируем предыдущую активную карточку
  if (activeCard) {
    activeCard.classList.remove('active');
  }

  // Активируем новую карточку
  card.classList.add('active');
  activeCard = card;
  activeCardId = cardId;
}

// Изначально активируем первую маленькую карточку
// document.addEventListener('DOMContentLoaded', function () {
//   const firstSmallCard = document.querySelector('.card-small');
//   if (firstSmallCard) {
//     firstSmallCard.classList.add('active');
//     activeCard = firstSmallCard;
//     activeCardId = 1;
//   }
// });



document.addEventListener('DOMContentLoaded', function () {
  // Получаем все карточки
  const allCards = document.querySelectorAll('.advantages_banefits_card_inner');

  // Добавляем обработчики событий для всех карточек
  allCards.forEach(card => {
    card.addEventListener('click', function () {
      const targetClass = this.getAttribute('data-target');

      if (targetClass) {
        // Запускаем анимацию вращения для текущей карточки
        this.style.transform = 'rotateY(0deg)';
        this.style.opacity = '0';

        // После завершения анимации скрываем текущую карточку и показываем целевую
        setTimeout(() => {
          this.style.display = 'none';

          // Находим и показываем целевую карточку
          const targetCard = document.querySelector(`.${targetClass}`);
          if (targetCard) {
            targetCard.style.transform = 'rotateY(-180deg)';
            targetCard.style.opacity = '0';
            targetCard.style.display = 'block';
            // Запускаем анимацию появления для целевой карточки
            setTimeout(() => {
              targetCard.style.transform = 'rotateY(0deg)';
              targetCard.style.opacity = '1';
            }, 50);
          }
        }, 300);
      }
    });
  });
});




