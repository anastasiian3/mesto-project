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

    //отрисовка фото
    this._element.querySelector(".photo-card__image").src = this._link;
    // отрисовка названия
    this._element.querySelector(".photo-card__title").textContent = this._name;
    // добавление alt
    this._element.querySelector(".photo-card__image").alt = this._name;

    // const likeCounter = cardElement.querySelector(".photo-card__like-counter");
    likeCounter.textContent = likesArray.length;

    return this._element;
  }

  //лайки карточки
  _handleChangeLikeCard() {}

  //удаление карточки
  _handleRemoveCard() {
    this._element.remove();
  }

  //клик для зума карточки
  _handleClickCard() {
    this._element.querySelector(".popup__image").src = this._link;
    this._element.querySelector(".popup__image-title").textContent = this._name;
    this._element.querySelector(".popup__image").alt = this._name;
    //openPopup(popupImageZoom);
  }

  //вешаем слушатели
  _setEventListeners() {
    this._element
      .querySelector(".photo-card__image")
      .addEventListener("click", () => {
        this._handleClickCard();
      });

    this._element
      .querySelector(".photo-card__delete-icon")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });

    this._element
      .querySelector(".photo-card__like")
      .addEventListener("click", () => {
        this._handleChangeLikeCard();
      });

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
