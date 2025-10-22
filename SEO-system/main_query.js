document.addEventListener('DOMContentLoaded', function () {
  const headerNav = document.querySelector('.header_nav');
  const moreServicesBtn = document.querySelector('.more-services');

  if (moreServicesBtn) {
    moreServicesBtn.addEventListener('click', function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события
      headerNav.classList.toggle('expanded');

      // Меняем текст кнопки
      if (headerNav.classList.contains('expanded')) {
        this.textContent = 'Назад';
      } else {
        this.textContent = 'Больше услуг';
      }
    });
  }

  // Закрываем меню при клике вне его области
  document.addEventListener('click', function (event) {
    if (!headerNav.contains(event.target)) {
      headerNav.classList.remove('expanded');
      // Возвращаем исходный текст кнопки
      if (moreServicesBtn) {
        moreServicesBtn.textContent = 'Больше услуг';
      }
    }
  });
});




// media390
