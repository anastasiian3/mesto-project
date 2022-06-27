import { clickImage } from "./modal.js";

import { postTemplate } from "./data.js";

// функция удаления карточки
const clickButtonDelete = function (element) {
  element.remove();
};

// функция лайка для карточек
const clickLikeButton = function (evt) {
  evt.target.classList.toggle("photo-card__like_active");
};

//функция для создания новой карточки
const createCard = function (data) {
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

  //удаление карточек
  resetButton.addEventListener("click", () => clickButtonDelete(cardElement));
  //лайк карточки
  likeButton.addEventListener("click", clickLikeButton);
  //попап с картинкой
  cardImage.addEventListener("click", () => clickImage(data));

  return cardElement;
};

//функция для добавления карточек на страницу
const renderCard = function (data, container) {
  const card = createCard(data);
  container.prepend(card);
};

export { renderCard };
