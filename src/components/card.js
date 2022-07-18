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

    if (
      this._likes.find((item) => {
        return this._myId === item._id;
      })
    ) {
      this._element.querySelector(".photo-card__like").classList.add("photo-card__like_active");
    }

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

  // Работает только со стрелочной функцией
  // Видимо дело в области видимости стрелочной функции
  // Я думал что  this._element можно передовать по методам без препятствий

  // clickButtonDelete = () => {
  //   this._element.remove();
  //   console.log("Клик удаления");
  // };

  clickButtonDelete() {
    this._element.remove();
  }

  //вешаем слушатели
  _setEventListeners() {
    this._element.querySelector(".photo-card__image").addEventListener("click", this._handleCardClick);
    this._element.querySelector(".photo-card__like").addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._element.querySelector(".photo-card__delete-icon").addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}

// const likesNumber = cardElement.querySelector(".element__heart-counter");
// const likeButton = cardElement.querySelector(".element__heart");
// likesNumber.textContent = card.likes.length;
// Проверка активного лайка
// if (
//   card.likes.find((item) => {
//     return userId === item._id;
//   })
// ) {
//   likeButton.classList.add("element__heart_active");
// }

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
