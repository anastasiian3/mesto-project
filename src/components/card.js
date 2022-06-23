export { formPost, initialCards, addNewCards, renderCard, postsContainer };

import { popupPost } from "./modal.js";
import { clickImage, popupClosed } from "./modal.js";

//переменные для картинок
const kamchatka = new URL("../../images/kamchatka_pic.jpg", import.meta.url);
const ruza = new URL("../../images/ruza_pic.jpg", import.meta.url);
const karelia = new URL("../../images/karelia_pic.jpg", import.meta.url);
const peterhof = new URL("../../images/peterhof_pic.jpg", import.meta.url);
const chelyaboblast = new URL("../../images/chelyab_pic.jpg", import.meta.url);
const baikal = new URL("../../images/baikal_pic.jpg", import.meta.url);

const initialCards = [
  // меняем исходные пути на переменные
  { name: "Камчатка", link: kamchatka },
  { name: "Руза", link: ruza },
  { name: "Карелия", link: karelia },
  { name: "Петергоф", link: peterhof },
  { name: "Челябинская область", link: chelyaboblast },
  { name: "Озеро Байкал", link: baikal },
];

// функция удаления карточки
const clickButtonDelete = function (element) {
  element.remove();
};

// функция лайка для карточек
const clickLikeButton = function (evt) {
  evt.target.classList.toggle("photo-card__like_active");
};

const postsContainer = document.querySelector(".photo-grid__elements");
const inputPlaceTitle = popupPost.querySelector("#place-title");
const inputPlaceLink = popupPost.querySelector("#place-link");
const formPost = document.querySelector(".form_add-post");
const postTemplate = document.querySelector("#post-template");

//создание нового поста
const createCard = function (data) {
  let cardElement = postTemplate.content
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
//добавление карточек
const renderCard = function (data, container) {
  const card = createCard(data);
  container.prepend(card);
};
/* // рендер карточек из "коробки"
initialCards.forEach(function (item) {
  renderCard(item, postsContainer);
}); */

// отправка новых карточек через форму
const addNewCards = function (evt) {
  evt.preventDefault();
  const item = {
    link: inputPlaceLink.value,
    name: inputPlaceTitle.value,
  };
  formPost.reset();
  popupClosed(popupPost);
  renderCard(item, postsContainer);
};
