//переменные для работы card js
const postsContainer = ".photo-grid__elements";
const formPost = document.querySelector(".form_add-post");

// селекторы для различных попапов
const popupProfile = ".popup_type_name";
const popupPost = ".popup_type_post";
const popupImageZoom = ".popup_type_image";
const popupAvatar = ".popup_type_avatar";

// переменные для открытия попапа
const profile = document.querySelector(".user-profile");
const openButtonProfile = profile.querySelector(".user-profile__name-change-button");
const newPostButton = profile.querySelector(".user-profile__add-button");

// переменные для закрытия попапа
// const closeProfileButton = popupProfile.querySelector(".popup__close-button");
// const closeNewPostButton = popupPost.querySelector(".popup__close-button");
// const closeImageButton = document.querySelector(".popup__close-button_type_image");

//попап с картинкой
// const popupImage = popupImageZoom.querySelector(".popup__image");
// const popupImageTitle = popupImageZoom.querySelector(".popup__image-title");

//изменение формы
const formName = document.querySelector("#form-name-change");
const nameInfo = document.querySelector(".user-profile__name");
const nameInput = document.querySelector("#name-input");
const jobInfo = document.querySelector(".user-profile__description");
const jobInput = document.querySelector("#profession-input");

//отправка новых карточек через форму
// const inputPlaceTitle = popupPost.querySelector("#place-title");
// const inputPlaceLink = popupPost.querySelector("#place-link");

//кнопки в попапах
const buttonNamePopup = document.querySelector(".form__button-submit-name");
const buttonPostPopup = document.querySelector(".form__button-submit-post");
const buttonAvatarPopup = document.querySelector(".form__button-submit-avatar");

//переменные для изменения аватара
const formAvatar = document.querySelector("#form-avatar");
const userAvatar = document.querySelector(".user-profile__photo");
const userAvatarButton = document.querySelector(".user-profile__photo-button");
const avatarInput = document.querySelector("#avatar-input");
const closeAvatarButton = document.querySelector(".popup__close-button_type_avatar");

const userInfo = {
  nameSelector: ".user-profile__name",
  aboutSelector: ".user-profile__description",
  avatarSelector: ".user-profile__photo",
};

const apiConfig = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
};

export {
  userInfo,
  postsContainer,
  formPost,
  openButtonProfile,
  newPostButton,
  formName,
  nameInfo,
  nameInput,
  jobInfo,
  jobInput,
  popupImageZoom,
  popupPost,
  popupProfile,
  userAvatar,
  avatarInput,
  popupAvatar,
  closeAvatarButton,
  formAvatar,
  userAvatarButton,
  buttonAvatarPopup,
  buttonNamePopup,
  buttonPostPopup,
  apiConfig,
};
