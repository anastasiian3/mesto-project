import "../pages/index.css"; // добавьте импорт главного файла стилей

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
  enableValidation();
  popup.classList.toggle("popup_opened");
};

// функция для закрытия попапов
const popupClosed = function (popup) {
  popup.classList.remove("popup_opened");
  /*document.removeEventListener("keydown", keyEscHandler);*/
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
    checkInputValidity(profileForm, inputProfile);
  });
};

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", profileOpened);
closeProfileButton.addEventListener("click", () => popupClosed(popupProfile));

//кнопка добавления и закрытия окна нового поста
newPostButton.addEventListener("click", () => popupOpened(popupPost));
closeNewPostButton.addEventListener("click", () => popupClosed(popupPost));

//переменные для картинок
const kamchatka = new URL("../images/kamchatka_pic.jpg", import.meta.url);
const ruza = new URL("../images/ruza_pic.jpg", import.meta.url);
const karelia = new URL("../images/karelia_pic.jpg", import.meta.url);
const peterhof = new URL("../images/peterhof_pic.jpg", import.meta.url);
const chelyaboblast = new URL("../images/chelyab_pic.jpg", import.meta.url);
const baikal = new URL("../images/baikal_pic.jpg", import.meta.url);

const initialCards = [
  // меняем исходные пути на переменные
  { name: "Камчатка", link: kamchatka },
  { name: "Руза", link: ruza },
  { name: "Карелия", link: karelia },
  { name: "Петергоф", link: peterhof },
  { name: "Челябинская область", link: chelyaboblast },
  { name: "Озеро Байкал", link: baikal },
];

// карточки из "коробки"
/*const initialCards = [
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
];*/

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
const nameInput = document.querySelector("#name-input");
const jobInfo = document.querySelector(".user-profile__description");
const jobInput = document.querySelector("#profession-input");
function editProfileInfo(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  enableValidation();
  popupClosed(popupProfile);
}

formName.addEventListener("submit", editProfileInfo);

//закрытие попапов Esc
function keyEscHandler(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");
  }
}
document.addEventListener("keydown", keyEscHandler);

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

// валидация форм
// функция, показывающая ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

// функция, прячущая ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// функция, проверяющая валидность элемента ввода
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button-submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inactiveButtonClass: ".form__button-submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);

/*enableValidation();*/

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button-submit_inactive");
    /*buttonElement.classList.add(validationConfig.inactiveButtonClass);*/
  } else {
    buttonElement.classList.remove("form__button-submit_inactive");
    /*buttonElement.classList.remove(validationConfig.inactiveButtonClass);*/
  }
}
