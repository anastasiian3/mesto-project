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
  //отрисовка количества лайков
  _showLikeCounter() {
    // Находим счетчик лайков
    this._likeCounter = this._element.querySelector(".photo-card__like-counter");
    // Записываем в него количество всех лайков
    this._likeCounter.textContent = this._likes.length;

  }

  _checkMyLike() {
    // Если в массиве есть наш айдишник делайм лайк активным
    if (this._likes.find((item) => this._myId === item._id)) {
      this._element.querySelector(".photo-card__like")
        .classList.add("photo-card__like_active");
    }
  }

  generate() {
    this._element = this._getElement();

    this._setEventListeners();
    this._showDeleteButton();
    this._showLikeCounter();
    this._checkMyLike();

    //отрисовка фото
    this._element.querySelector(".photo-card__image").src = this._link;
    // отрисовка названия
    this._element.querySelector(".photo-card__title").textContent = this._title;
    // добавление alt
    this._element.querySelector(".photo-card__image").alt = this._title;

    return this._element;
  }
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

  // updateLikeState() {
  //   this._likeButton = this._element.querySelector(".photo-card__like");
  //   console.log(this._likeButton);
  //   const likeCounter = cardElement.querySelector(".photo-card__like-counter");
  //   likeCounter.textContent = likesArray.length;

  // if (this._checkLikes()) {
  //   this._likeButton.classList.add("photo-card__like_active");
  // } else {
  //   this._likeButton.classList.remove("photo-card__like_active");
  // }
  // }

  clickButtonDelete() {
    this._element.remove();
  }

  //вешаем слушатели
  _setEventListeners() {
    this._element.querySelector(".photo-card__image").addEventListener("click", this._handleCardClick);
    this._element.querySelector(".photo-card__like").addEventListener("click", () => {
      this._handleLikeClick(this.updateLikeState);
    });
    this._element.querySelector(".photo-card__delete-icon").addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}

// function handleToggleLike(evt, cardId, likesNumber, card) {
//   likesNumber.textContent = card.likes.length;
//   if (!evt.target.classList.contains("photo-card__like_active")) {
//     addLike(cardId)
//       .then((data) => {
//         evt.target.classList.toggle("photo-card__like_active");
//         likesNumber.textContent = data.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     removeLike(cardId)
//       .then((data) => {
//         evt.target.classList.toggle("photo-card__like_active");
//         likesNumber.textContent = data.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
