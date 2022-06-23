import "../pages/index.css"; // добавьте импорт главного файла стилей

import {
  popupOpened,
  popupClosed,
  profileOpened,
  openButtonProfile,
  closeProfileButton,
  newPostButton,
  closeNewPostButton,
  closeImageButton,
  popupImageZoom,
  formName,
  editProfileInfo,
  popupProfile,
  popupPost,
  keyEscHandler,
} from "./components/modal.js";

import {
  formPost,
  initialCards,
  addNewCards,
  renderCard,
  postsContainer,
} from "./components/card.js";

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", profileOpened);
closeProfileButton.addEventListener("click", () => popupClosed(popupProfile));

//кнопка добавления и закрытия окна нового поста
newPostButton.addEventListener("click", () => popupOpened(popupPost));
closeNewPostButton.addEventListener("click", () => popupClosed(popupPost));

// закрытие попапа с картинкой
closeImageButton.addEventListener("click", () => popupClosed(popupImageZoom));

// слушатель событий формы
formPost.addEventListener("submit", addNewCards);
formName.addEventListener("submit", editProfileInfo);

// рендер карточек из "коробки"
initialCards.forEach(function (item) {
  renderCard(item, postsContainer);
});

document.addEventListener("keydown", keyEscHandler);

// валидация форм
import { enableValidation, checkInputValidity } from "./components/validate.js";
export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inactiveButtonClass: "form__button-submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);
