# blanchard
Адаптивная Pixel Perfect верстка лендинга. Итоговый проект курса "Веб-верстка. Базовый уровень". Верстка без фреймворка, с использованием библиотек.  
## Шапка сайта.  
Между элементами шапки установлены относительные отступы, рассчитываемые по формуле похожей на гиперболическую, что позволяет регулировать отступы до разрешения 1200 пикселей без дополнительных брейкпоинтов. Также при нажатии на ссылку вменю навигации был реализован плавный скролл до соответствующей секции сайта. В нижней части шапки реализованы выпадающие списки, при переполнении которых появляется кастомная полоса прокрутки.  
На разрешении ниже 1200 пикселей меню навигации и кнопка «войти» скрываются под управлением кнопки-бургера. В нижней части остаётся только форма поиска, которая также скрывается за кнопкой открытия формы поиска. Кнопки реализованы с помощью псевдоэлементов, которые анимируются при изменении состояния.  
## Hero-блок.  
Фон реализован как абсолютно позиционированный список изображений с анимацией. Анимация прописана на чистом CSS.  
## Галерея.  
Раскрывающийся список стилизован при помощи библиотеки choices. Слайдер, как и остальные слайдеры на сайте, реализован при помощи библиотеки swiper js. Каждый слайд в слайдере – это ссылка с изображением, при нажатии на которую открывается модальное окно с подробным описанием изображения.  
## Каталог.  
Табы и аккордеон реализованы с помощью библиотеки jQuery UI. При клике по ссылке на деятеля, отображается информация о нём, либо заглушка при отсутствии информации. На разрешении ниже 1000 пикселей, карточка с информацией перемещается под аккордеон и при клике по ссылке происходит плавный скролл до карточки, реализованный также через jQuery, как в меню навигации.  
## События.  
Здесь имеется заголовок, список событий и кнопка раскрывающая этот список полностью. При клике на кнопку показываются скрытые элементы и кнопка удаляется. На мобильной версии список становится слайдером.  
## Издания.  
Фильтр по категориям - это список кастомных чекбоксов, которые написаны при помощи псевдоэлементов. На мобильной версии список скрывается под спойлером и отображаются только отмеченные элементы. Это реализовано через скрипт на чистом JS. Слайдер на мобильной версии становится обычным списком.  
## Проекты.  
Реализованы кастомные всплывающие подсказки.  
## Контакты.  
Левый отступ блока с рамкой сделан с расчетом размера отступа. В правой части блока реализована Яндекс карта с кастомными кнопками зума. К форме подключена настраиваемая валидация и маска для номера телефона.
