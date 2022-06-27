//переменные для картинок в существующих постах
const kamchatka = new URL("../images/kamchatka_pic.jpg", import.meta.url);
const ruza = new URL("../images/ruza_pic.jpg", import.meta.url);
const karelia = new URL("../images/karelia_pic.jpg", import.meta.url);
const peterhof = new URL("../images/peterhof_pic.jpg", import.meta.url);
const chelyaboblast = new URL("../images/chelyab_pic.jpg", import.meta.url);
const baikal = new URL("../images/baikal_pic.jpg", import.meta.url);

// переменная для существующих изначально карточек
const initialCards = [
  { name: "Камчатка", link: kamchatka },
  { name: "Руза", link: ruza },
  { name: "Карелия", link: karelia },
  { name: "Петергоф", link: peterhof },
  { name: "Челябинская область", link: chelyaboblast },
  { name: "Озеро Байкал", link: baikal },
];

//переменные для работы card js
const postsContainer = document.querySelector(".photo-grid__elements");
const formPost = document.querySelector(".form_add-post");
const postTemplate = document.querySelector("#post-template");

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

//попап с картинкой
const popupImage = popupImageZoom.querySelector(".popup__image");
const popupImageTitle = popupImageZoom.querySelector(".popup__image-title");

//изменение формы
const formName = document.querySelector("#form-name-change");
const nameInfo = document.querySelector(".user-profile__name");
const nameInput = document.querySelector("#name-input");
const jobInfo = document.querySelector(".user-profile__description");
const jobInput = document.querySelector("#profession-input");

export {
  initialCards,
  postsContainer,
  formPost,
  postTemplate,
  openButtonProfile,
  newPostButton,
  closeProfileButton,
  closeNewPostButton,
  closeImageButton,
  popupImage,
  popupImageTitle,
  formName,
  nameInfo,
  nameInput,
  jobInfo,
  jobInput,
  popupImageZoom,
  popupPost,
  popupProfile,
};
