// кнопка открытия редактирования профиля
const profile = document.querySelector(".user-profile");
const openButtonProfile = profile.querySelector(
  ".user-profile__name-change-button"
);
const popup = document.querySelector(".popup");

function openProfile() {
  popup.classList.add("popup_opened");
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

// лайки для карточек
const likeButton = document.querySelectorAll(".photo-card__like");
likeButton.forEach((item) => {
  item.addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo-card__like_active");
  });
});

// карточки из "коробки"

const initialCards = [
  {
    name: "Озеро Байкал",
    link: "images/baikal_pic.jpg",
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
];

//добавление нового поста
const postsContainer = document.querySelector(".photo-grid__elements");
const inputPlaceTitle = popupPost.querySelector("#place-title");
const inputPlaceLink = popupPost.querySelector("#place-link");
const buttonAddPost = popupPost.querySelector(".form__button-submit-post");
const formPost = document.querySelector(".form_add-post");
const postTemplate = document.querySelector("#post-template");

const createCard = function (data) {
  let cardElement = postTemplate.content
    .cloneNode(true)
    .querySelector(".photo-card");
  const cardImage = cardElement.querySelector(".photo-card__image");
  const cardTitle = cardElement.querySelector(".photo-card__title");

  cardImage.src = data.link;
  cardTitle.textContent = data.name;

  /*const likeButton = cardElement.querySelector(".photo-card__like");
  likeButton.forEach((item) => {
    item.addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-card__like_active");
    });
  });*/

  return cardElement;
};

const renderCard = function (data, container) {
  const card = createCard(data);
  container.append(card);
};
initialCards.forEach(function (item) {
  renderCard(item, postsContainer);
});

formPost.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let placeTitle = inputPlaceTitle.value;
  let placeLink = inputPlaceLink.value;
  let post = postTemplate.content.cloneNode(true).querySelector(".photo-card");
  post.querySelector(".photo-card__title").textContent = placeTitle;
  post.querySelector(".photo-card__image").src = placeLink;
  postsContainer.prepend(post);
  inputPlaceTitle.value = "";
  inputPlaceLink.value = "";
  closeNewPost();
});

const post = document.querySelector(".photo-card");

console.dir(post);
/*post
  .querySelector(".photo-card__like")
  .addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo-card__like_active");
  });
*/

// удаление карточек
const resetButton = document.querySelectorAll(".photo-card__delete-icon");
resetButton.forEach((item) => {
  item.addEventListener("click", function () {
    post.remove();
  });
});
/*resetButton.addEventListener("click", function () {
  post.remove();
});*/
/*
// удаление карточки
const resetButton = document.querySelector(".photo-card__delete-icon");

/*resetButton.addEventListener("click", function () {
  const card = document.querySelector(".photo-card");

  for (let i = 0; i < card.length; i++) {
    card[i].remove();
  }
});*/
/*
resetButton.addEventListener("click", function () {
  const cardRemove = resetButton.closest(".photo-card");
  cardRemove.remove();
});*/

//попап с фотографиями
/*const photos = [...document.querySelectorAll(".photo-card__image")];
const popupPhoto = document.querySelector(".popup-picture");
const popupPictureTitle = document.querySelector(".popup-picture__pic");

let index = 0;

photos.forEach((item, i) => {
  item.addEventListener("click", () => {
    updatePhoto(i);
    popupPhoto.classList.toggle(".popup_opened");
  });
});*/

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

console.log(formName);
formName.addEventListener("submit", editProfileInfo);

//попап с картинкой
const popupImageZoom = document.querySelector(".popup-picture");
const popupImage = popupImageZoom.querySelector(".popup-picture__pic");
const popupImageTitle = popupImageZoom.querySelector(
  ".popup-picture__pic-title"
);
const openPopupPicture = function () {
  popupImageZoom.classList.add("popup_opened");
};

const clickImage = function (data) {
  popupImage.src = data.img;
  popupImageTitle.textContent = data.text;
  openPopupPicture();
};

const smallPhoto = document.querySelector(".photo-card__image");

smallPhoto.forEach((item) => {
  item.addEventListener("click", clickImage);
});
