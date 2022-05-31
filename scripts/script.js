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
};

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", profileOpened);
closeProfileButton.addEventListener("click", () => popupClosed(popupProfile));

//кнопка добавления и закрытия окна нового поста
newPostButton.addEventListener("click", () => popupOpened(popupPost));
closeNewPostButton.addEventListener("click", () => popupClosed(popupPost));

// карточки из "коробки"
const initialCards = [
  {
    name: "Камчатка",
    link: "images/kamchatka_pic.jpg",
  },
  {
    name: "Руза",
    link: "images/ruza_pic.jpg",
  },
  {
    name: "Карелия",
    link: "images/karelia_pic.jpg",
  },
  {
    name: "Петергоф",
    link: "images/peterhof_pic.jpg",
  },
  {
    name: "Челябинская область",
    link: "images/chelyab_pic.jpg",
  },
  {
    name: "Озеро Байкал",
    link: "images/baikal_pic.jpg",
  },
];

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

// закрытие попапа с картинкой
closeImageButton.addEventListener("click", () => popupClosed(popupImageZoom));

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
const buttonAddPost = popupPost.querySelector(".form__button-submit-post");
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
// рендер карточек из "коробки"
initialCards.forEach(function (item) {
  renderCard(item, postsContainer);
});

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
// слушатель событий формы
formPost.addEventListener("submit", addNewCards);

//изменение формы
const formName = document.querySelector("#form-name-change");
const nameInfo = document.querySelector(".user-profile__name");
const nameInput = document.querySelector("#user-name");
const jobInfo = document.querySelector(".user-profile__description");
const jobInput = document.querySelector("#user-profession");
function editProfileInfo(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  popupClosed(popupProfile);
}

formName.addEventListener("submit", editProfileInfo);
