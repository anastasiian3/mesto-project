import "../pages/index.css"; // добавьте импорт главного файла стилей

import { openPopup, closePopup } from "./components/modal.js";

import {
  createCard,
  updateLikeState,
  clickButtonDelete,
} from "./components/card.js";

import {
  disableButton,
  enableValidation,
  hideError,
} from "./components/validate.js";

import {
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
  popupImage,
  popupImageTitle,
  popupImageZoom,
  inputPlaceTitle,
  inputPlaceLink,
  userAvatar,
  avatarInput,
  popupAvatar,
  closeAvatarButton,
  formAvatar,
  userAvatarButton,
  buttonAvatarPopup,
  buttonPostPopup,
  buttonNamePopup,
} from "./components/data.js";

import {
  addCard,
  getUserInfo,
  editProfile,
  editUserAvatar,
  getAllInfo,
  changeLikeStatus,
  removeCard,
} from "./components/api.js";

import { renderLoading } from "./components/utils.js";

let userId;

getAllInfo().then(([cards, user]) => {
  //получение данных пользователя
  nameInfo.textContent = user.name;
  jobInfo.textContent = user.about;
  userAvatar.src = user.avatar;
  userId = user._id;

  // получение карточек с сервера
  cards.reverse().forEach((data) => {
    renderCard(data, postsContainer, userId);
  });
});

const handleChangeLikeStatus = (cardElement, cardId, isLiked) => {
  changeLikeStatus(cardId, isLiked)
    .then((dataFromServer) =>
      updateLikeState(cardElement, dataFromServer.likes, userId)
    )
    .catch((err) => {
      console.log(
        `Что-то не так! Ошибка при обновлении лайков на карточке: ${err}`
      );
    });
};

const handleDeleteCard = (cardElement, cardId) => {
  removeCard(cardId)
    .then((dataFromServer) => {
      clickButtonDelete(cardElement);
      console.log(`Внимание! ${dataFromServer.message}`);
    })
    .catch((err) => {
      console.log(`Что-то не так! Ошибка при удалении карточки: ${err}`);
    });
};

//функция для заполнения попапа профиля данными
const openProfile = function () {
  hideError();
  getUserInfo()
    .then((dataFromServer) => {
      nameInput.value = dataFromServer.name;
      jobInput.value = dataFromServer.about;
      disableButton(buttonNamePopup, validationConfig);
      openPopup(popupProfile);
    })
    .catch((err) => {
      console.log(
        `Что-то не так! Ошибка при открытии попапа редактирования данных пользователя: ${err}`
      );
    });
};

//открытие попапа для изменения аватара
const openAvatarPopup = function () {
  hideError();
  getUserInfo()
    .then((dataFromServer) => {
      avatarInput.value = dataFromServer.avatar;
      openPopup(popupAvatar);
      disableButton(buttonAvatarPopup, validationConfig);
    })
    .catch((err) => {
      console.log(
        `Что-то не так! Ошибка при открытии попапа изменения аватара: ${err}`
      );
    });
};

// функция для редактирования информации в профиле
function handleProfileChanges(e) {
  e.preventDefault();
  renderLoading(buttonNamePopup, true);
  editProfile({ name: nameInput.value, about: jobInput.value })
    .then((dataFromServer) => {
      nameInfo.textContent = nameInput.value;
      jobInfo.textContent = jobInput.value;
      console.log(
        `Профиль успешно обновлен! Имя пользователя: ${dataFromServer.name}, профессия: ${dataFromServer.about}`
      );
    })
    .then(() => {
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(
        `Что-то не так! Ошибка при изменении данных пользователя: ${err}`
      );
    })
    .finally(() => {
      renderLoading(buttonNamePopup, false);
    });
}

// функция для изменения аватара
function changeUserAvatar(e) {
  e.preventDefault();
  renderLoading(buttonAvatarPopup, true);
  editUserAvatar({ avatar: avatarInput.value })
    .then((dataFromServer) => {
      userAvatar.src = avatarInput.value;
      console.log(
        `Аватар успешно обновлен! Ссылка на аватар: ${dataFromServer.avatar}`
      );
    })
    .then(() => {
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(
        `Что-то не так! Ошибка при попытке изменения аватара: ${err}`
      );
    })
    .finally(() => {
      renderLoading(buttonAvatarPopup, false);
    });
}

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", openProfile);
closeProfileButton.addEventListener("click", () => closePopup(popupProfile));

//открытие и закрытие попапа аватара
userAvatarButton.addEventListener("click", openAvatarPopup);
closeAvatarButton.addEventListener("click", () => closePopup(popupAvatar));

//кнопка добавления и закрытия окна нового поста
newPostButton.addEventListener("click", () => openPopup(popupPost));
closeNewPostButton.addEventListener("click", () => closePopup(popupPost));

// закрытие попапа с картинкой
closeImageButton.addEventListener("click", () => closePopup(popupImageZoom));

// отправка новых карточек через форму
const addNewCards = function (evt) {
  evt.preventDefault();
  renderLoading(buttonPostPopup, true);

  addCard({ name: inputPlaceTitle.value, link: inputPlaceLink.value })
    .then((dataFromServer) => {
      renderCard(dataFromServer, postsContainer, userId);
      console.log(
        `Пост добавлен! Место: ${dataFromServer.name}, ссылка на фото места: ${dataFromServer.link}`
      );
      formPost.reset();
      disableButton(buttonPostPopup, validationConfig);
      closePopup(popupPost);
    })
    .catch((err) => {
      console.log(`Что-то не так! Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(buttonPostPopup, false);
    });
};

//функция для добавления карточек на страницу
const renderCard = function (data, container, userId) {
  const card = createCard(
    data,
    userId,
    handleChangeLikeStatus,
    handleDeleteCard
  );
  container.prepend(card);
};

// слушатель событий формы
formPost.addEventListener("submit", addNewCards);
formName.addEventListener("submit", handleProfileChanges);
formAvatar.addEventListener("submit", changeUserAvatar);

// функция для клика на картинку
const clickImage = function (data) {
  popupImage.src = data.link;
  popupImageTitle.textContent = data.name;
  popupImage.alt = data.name;
  openPopup(popupImageZoom);
};

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

export { clickImage };
