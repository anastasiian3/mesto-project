export {
  popupOpened,
  popupClosed,
  profileOpened,
  openButtonProfile,
  closeProfileButton,
  newPostButton,
  closeNewPostButton,
  closeImageButton,
  popupImageZoom,
  clickImage,
  formName,
  editProfileInfo,
  popupProfile,
  popupPost,
  keyEscHandler,
};

import { checkInputValidity } from "./validate.js";
import { validationConfig } from "../index.js";

// переменные для различных попапов
const popupProfile = document.querySelector(".popup_type_name");
const popupPost = document.querySelector(".popup_type_post");
const popupImageZoom = document.querySelector(".popup_type_image");

// переменные для открытия попапа
const profile = document.querySelector(".user-profile");
const openButtonProfile = profile.querySelector(
  ".user-profile__name-change-button"
);
const newPostButton = profile.querySelector(".user-profile__add-button");

// переменные для закрытия попапа
const closeProfileButton = popupProfile.querySelector(".popup__close-button");
const closeNewPostButton = popupPost.querySelector(".popup__close-button");
const closeImageButton = document.querySelector(
  ".popup__close-button_type_image"
);

//функция для открытия попапов
const popupOpened = function (popup) {
  popup.classList.toggle("popup_opened");
};

// функция для закрытия попапов
const popupClosed = function (popup) {
  popup.classList.remove("popup_opened");
};

//заполнение попапа профиля данными
const profileOpened = function () {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  popupOpened(popupProfile);

  const profileForm = document.querySelector("#form-name-change");
  const inputsProfile = Array.from(
    document.querySelectorAll(".form__input-profile")
  );
  inputsProfile.forEach((inputProfile) => {
    checkInputValidity(profileForm, inputProfile, validationConfig);
  });
};

//попап с картинкой
const popupImage = popupImageZoom.querySelector(".popup__image");
const popupImageTitle = popupImageZoom.querySelector(".popup__image-title");

// функция для клика на картинку
const clickImage = function (data) {
  popupImage.src = data.link;
  popupImageTitle.textContent = data.name;
  popupImage.alt = data.name;
  popupOpened(popupImageZoom);
};

//изменение формы
const formName = document.querySelector("#form-name-change");
const nameInfo = document.querySelector(".user-profile__name");
const nameInput = document.querySelector("#name-input");
const jobInfo = document.querySelector(".user-profile__description");
const jobInput = document.querySelector("#profession-input");
function editProfileInfo(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  popupClosed(popupProfile);
}

function keyEscHandler(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");
  }
}

//закрытие попапов кликом на оверлей
const popups = document.querySelectorAll(".popup");
popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target.closest(".popup__container")) {
      return;
    }
    popupClosed(evt.target.closest(".popup"));
  });
});
