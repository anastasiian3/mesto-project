// кнопка открытия редактирования профиля
const profile = document.querySelector(".user-profile");
const openButtonProfile = profile.querySelector(
  ".user-profile__name-change-button"
);
const popup = document.querySelector(".popup");

function openProfile() {
  popup.classList.add("popup_opened");
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

openButtonProfile.addEventListener("click", openProfile);
// кнопка закрытия редактирования профиля
const closeNameButton = popup.querySelector(".popup__close-button");
function closeProfile() {
  popup.classList.remove("popup_opened");
}
closeNameButton.addEventListener("click", closeProfile);

// кнопка открытия добавления нового поста
const popupPost = document.querySelector(".popup-post");
const newPostButton = profile.querySelector(".user-profile__add-button");
const closeNewPostButton = popupPost.querySelector(".popup-post__close-button");
function newPost() {
  popupPost.classList.add("popup-post_opened");
}
newPostButton.addEventListener("click", newPost);
// кнопка закрытия добавления нового поста
function closeNewPost() {
  popupPost.classList.remove("popup-post_opened");
}
closeNewPostButton.addEventListener("click", closeNewPost);

// карточки из "коробки"
const initialCards = [
  {
    name: "Камчатка",
    link: "images/kamchatka_pic.jpg",
  },
  {
    name: "Петергоф",
    link: "images/peterhof_pic.jpg",
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
    name: "Челябинская область",
    link: "images/chelyab_pic.jpg",
  },
  {
    name: "Озеро Байкал",
    link: "images/baikal_pic.jpg",
  },
];

//попап с картинкой
const popupImageZoom = document.querySelector(".popup-picture");
const popupImage = popupImageZoom.querySelector(".popup-picture__pic");
const popupImageTitle = popupImageZoom.querySelector(
  ".popup-picture__pic-title"
);

// открытие попапа с картинкой
const openPopupImage = function () {
  popupImageZoom.classList.add("popup-picture_opened");
};
// закрытие попапа с картинкой
const closePopupImage = function () {
  popupImageZoom.classList.remove("popup-picture_opened");
};
const closeImageButton = document.querySelector(".popup-picture__close-button");
closeImageButton.addEventListener("click", closePopupImage);

// функция для клика на картинку
const clickImage = function (data) {
  popupImage.src = data.link;
  popupImageTitle.textContent = data.name;
  openPopupImage();
};

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
formPost.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const item = {
    link: inputPlaceLink.value,
    name: inputPlaceTitle.value,
  };
  console.log(item);
  inputPlaceTitle.value = "";
  inputPlaceLink.value = "";
  closeNewPost();
  renderCard(item, postsContainer);
});

const post = document.querySelector(".photo-card");

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
  closeProfile();
}

formName.addEventListener("submit", editProfileInfo);
