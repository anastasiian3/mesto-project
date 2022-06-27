import "../pages/index.css"; // добавьте импорт главного файла стилей

import { openPopup, closePopup } from "./components/modal.js";

import { renderCard } from "./components/card.js";

import { disableButton, enableValidation } from "./components/validate.js";

import {
  initialCards,
  postsContainer,
  formPost,
  popupPost,
  popupProfile,
  openButtonProfile,
  newPostButton,
  closeProfileButton,
  closeNewPostButton,
  closeImageButton,
  formName,
  nameInfo,
  nameInput,
  jobInfo,
  jobInput,
} from "./components/data.js";

//функция для заполнения попапа профиля данными
const openProfile = function () {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  openPopup(popupProfile);
};

// функция для редактирования информации в профиле
function editProfileInfo(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupProfile);
}

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", openProfile);
closeProfileButton.addEventListener("click", () => closePopup(popupProfile));

//кнопка добавления и закрытия окна нового поста
newPostButton.addEventListener("click", () => openPopup(popupPost));
closeNewPostButton.addEventListener("click", () => closePopup(popupPost));

// закрытие попапа с картинкой
closeImageButton.addEventListener("click", () => closePopup(popupImageZoom));

// отправка новых карточек через форму
const addNewCards = function (evt) {
  evt.preventDefault();
  const inputPlaceTitle = popupPost.querySelector("#place-title");
  const inputPlaceLink = popupPost.querySelector("#place-link");
  const buttonElement = popupPost.querySelector(".form__button-submit-post");
  const item = {
    link: inputPlaceLink.value,
    name: inputPlaceTitle.value,
  };

  formPost.reset();
  renderCard(item, postsContainer);
  disableButton(buttonElement, validationConfig);
  closePopup(popupPost);
};

// слушатель событий формы
formPost.addEventListener("submit", addNewCards);
formName.addEventListener("submit", editProfileInfo);

// рендер карточек из "коробки"
initialCards.forEach(function (item) {
  renderCard(item, postsContainer);
});

// валидация форм
export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inactiveButtonClass: "form__button-submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);
