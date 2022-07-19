export default class Card {
  constructor({
    title,
    link,
    ownerId,
    cardId,
    myId,
    likes,
    cardSelector,
    handleAddLikeClick,
    handleRemoveLikeClick,
    handleDeleteClick,
    handleCardClick,
  }) {
    this._title = title;
    this._link = link;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._myId = myId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this.clickButtonDelete = this.clickButtonDelete.bind(this);
  }

  _getElement() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".photo-card").cloneNode(true);

    return cardElement;
  }

  // Вынес в отдельную функцию, так выглядит логичнее
  _showDeleteButton() {
    // Рендер корзины
    if (this._ownerId !== this._myId) {
      this._element.querySelector(".photo-card__delete-icon").remove();
    }
  }

  setLike() {
    this._like.classList.toggle("photo-card__like_active");
  }

  _handleLike() {
    if (!this._like.classList.contains("photo-card__like_active")) {
      this._handleAddLikeClick();
    } else {
      this._handleRemoveLikeClick();
    }
  }

  //отрисовка количества лайков
  showLikeCounter(likesArray) {
    this._likeCounter.textContent = likesArray;
  }

  _checkMyLike() {
    // Если в массиве есть наш айдишник делайм лайк активным
    if (this._likes.find((item) => this._myId === item._id)) {
      this._like.classList.add("photo-card__like_active");
    }
  }

  generate() {
    this._element = this._getElement();
    this._like = this._element.querySelector(".photo-card__like");
    this._likeCounter = this._element.querySelector(".photo-card__like-counter");

    this._setEventListeners();
    this._showDeleteButton();
    this.showLikeCounter(this._likes.length);
    this._checkMyLike();

    //отрисовка фото
    this._element.querySelector(".photo-card__image").src = this._link;
    // отрисовка названия
    this._element.querySelector(".photo-card__title").textContent = this._title;
    // добавление alt
    this._element.querySelector(".photo-card__image").alt = this._title;

    return this._element;
  }

  clickButtonDelete() {
    this._element.remove();
  }

  //вешаем слушатели
  _setEventListeners() {
    this._element.querySelector(".photo-card__image").addEventListener("click", this._handleCardClick);

    this._like.addEventListener("click", () => {
      this._handleLike();
    });
    this._element.querySelector(".photo-card__delete-icon").addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}
