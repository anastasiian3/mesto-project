// функция удаления карточки
const clickButtonDelete = function (element) {
  element.remove();
  element = null;
};
//функция проверки того, лайкнута ли карточка
const isLiked = (likesArray, userId) => {
  return Boolean(
    likesArray.find((likeObj) => {
      return likeObj._id === userId;
    })
  );
};
//функция обновления состояния лайка
const updateLikeState = (cardElement, likesArray, userId) => {
  const likeButton = cardElement.querySelector(".photo-card__like");
  const likeCounter = cardElement.querySelector(".photo-card__like-counter");
  likeCounter.textContent = likesArray.length;

  if (isLiked(likesArray, userId)) {
    likeButton.classList.add("photo-card__like_active");
  } else {
    likeButton.classList.remove("photo-card__like_active");
  }
};

//функция для создания новой карточки
const createCard = function (
  data,
  userId,
  handleChangeLikeStatus,
  handleDeleteCard,
  clickImage,
  postTemplate
) {
  const cardElement = postTemplate.content
    .cloneNode(true)
    .querySelector(".photo-card");
  const cardImage = cardElement.querySelector(".photo-card__image");
  const cardTitle = cardElement.querySelector(".photo-card__title");
  const resetButton = cardElement.querySelector(".photo-card__delete-icon");
  const likeButton = cardElement.querySelector(".photo-card__like");

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  updateLikeState(cardElement, data.likes, userId);
  //удаление иконки удаления, если карточка чужая
  if (data.owner._id !== userId) {
    resetButton.remove();
  }
  //удаление карточки
  resetButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  //слушатель события клика по лайку
  likeButton.addEventListener("click", () => {
    handleChangeLikeStatus(
      cardElement,
      data._id,
      likeButton.classList.contains("photo-card__like_active")
    );
  });

  //попап с картинкой
  cardImage.addEventListener("click", () => clickImage(data));

  return cardElement;
};

export { createCard, isLiked, updateLikeState, clickButtonDelete };
