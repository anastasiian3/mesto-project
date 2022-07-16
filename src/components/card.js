export default class Card {
  constructor({ name, link, _id, likes, userId, handleClickLike, handleClickDeleteCard, handleclickImage }, selector) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._selector = selector;
    //this._userId = userId;
    this._handleClickLike = handleClickLike;
    this._handleClickDeleteCard = handleClickDeleteCard;
    this._handleclickImage = handleclickImage;
    // есть подозрение, что через элемент тут не найти, потому что он объявлен только внизу
    this._likeButton = this._element.querySelector(".photo-card__like");
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector(".photo-card").cloneNode(true);

    return cardElement;
  }

  generate(userId) {
    this._element = this._getElement();

    this._setEventListeners();
    this._checkLikes(userId);
    this.updateLikeState(userId);
    //console.log(userId);
    //отрисовка фото
    this._element.querySelector(".photo-card__image").src = this._link;
    // отрисовка названия
    this._element.querySelector(".photo-card__title").textContent = this._name;
    // добавление alt
    this._element.querySelector(".photo-card__image").alt = this._name;

    //const likeCounter = cardElement.querySelector(".photo-card__like-counter");
    this._likeCounter = this._element.querySelector(".photo-card__like-counter");
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }
  // при загрузке айдишник пользователя виден, потом почему-то выдает undefined
  // какие слушатели вешать, какой порядок?
  // сама функция лайка и связи с сервером на главной
  //
  _checkLikes(userId) {
    return Boolean(
      this._likes.find((likeObj) => {
        // console.log(userId);
        // console.log(likeObj);
        return likeObj._id === userId;
      })
    );
  }

  // updateLikeState(userId) {
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
  _setEventListeners(userId) {
    this._element.querySelector(".photo-card__image").addEventListener("click", () => {
      //this._handleclickImage();
      this._checkLikes();
      this.updateLikeState();
      console.log(userId);
    });

    this._element.querySelector(".photo-card__like").addEventListener("click", () => {
      this._handleClickLike();
    });

    if (this._selector === "#post-template-user") {
      this._element.querySelector(".photo-card__delete-icon").addEventListener("click", () => {
        this._handleClickDeleteCard();
      });
    } else {
    }
  }
}
