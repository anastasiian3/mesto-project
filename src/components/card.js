export default class Card {
  constructor({
    title,
    link,
    ownerId,
    cardId,
    myId,
    likes,
    cardSelector,
    handleLikeClick,
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
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".photo-card").cloneNode(true);

    return cardElement;
  }
  // убрал юзерид
  generate() {
    this._element = this._getElement();

    this._setEventListeners();

    //отрисовка фото
    this._element.querySelector(".photo-card__image").src = this._link;
    // отрисовка названия
    this._element.querySelector(".photo-card__title").textContent = this._title;
    // добавление alt
    this._element.querySelector(".photo-card__image").alt = this._title;

    // Описать логику корзины 
    if (this._ownerId !== this._myId) {
      this._element.querySelector(".photo-card__delete-icon").remove();
    }

    //отрисовка количества лайков
    this._likeCounter = this._element.querySelector(".photo-card__like-counter");
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }
  // при загрузке айдишник пользователя виден, потом почему-то выдает undefined
  // какие слушатели вешать, какой порядок?
  // сама функция лайка и связи с сервером на главной
  //
  // _checkLikes(ownerId) {
  //   return Boolean(
  //     this._likes.find((likeObj) => {
  //       // console.log(ownerId);
  //       // console.log(likeObj);
  //       return likeObj.cardId === ownerId;
  //     })
  //   );
  // }

  // updateLikeState(ownerId) {
  //   // this._likeButton = this._element.querySelector(".photo-card__like");
  //   console.log(this._likeButton);
  //   // const likeCounter = cardElement.querySelector(".photo-card__like-counter");
  //   // likeCounter.textContent = likesArray.length;

  //   if (this._checkLikes()) {
  //     this._likeButton.classList.add("photo-card__like_active");
  //   } else {
  //     this._likeButton.classList.remove("photo-card__like_active");
  //   }
  // }

  //вешаем слушатели
  _setEventListeners() {
    this._element.querySelector(".photo-card__image").addEventListener("click", this._handleCardClick);
    this._element.querySelector(".photo-card__like").addEventListener("click", this._handleLikeClick);
    this._element.querySelector(".photo-card__delete-icon").addEventListener("click", this._handleDeleteClick);
  }
}
