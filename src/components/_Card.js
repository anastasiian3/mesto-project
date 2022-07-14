class Card {
  constructor({ name, link }, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    //передать функции и айдишник
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".photo-card")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    //листенеры
    //this._setEventListeners();

    /*     this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__info').textContent = this._description; */
    //отрисовка тайтла
    //отрисовка картинки
    //отрисовка альта

    return this._element;
  }
  //лайки карточки
  _handleChangeLikeCard() {}
  //удаление карточки
  _handleRemoveCard() {}
  //клик для зума карточки
  _handleClickCard() {}
  //вешаем слушатели
  _setEventListeners() {
    /*     this._element.addEventListener('click', () => {
  //нужно будет описывать этот метод в попапах
  //заменить на зум
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      //закрытие и по клику на оверлей и по esc
      this._handleClosePopup();
    }); 

    // удаление
    // лайк
    
    */
  }
}
