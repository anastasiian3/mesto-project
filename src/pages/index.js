import "./index.css"; // добавьте импорт главного файла стилей

import { openPopup, closePopup } from "../components/modal.js";

import {
  createCard,
  updateLikeState,
  clickButtonDelete,
} from "../components/old_card.js";

import {
  disableButton,
  enableValidation,
  hideError,
} from "../components/validate.js";

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
} from "../utils/data.js";

// import {
//   addCard,
//   editProfile,
//   editUserAvatar,
//   getAllInfo,
//   changeLikeStatus,
//   removeCard,
// } from "../components/api.js";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card";
import Popup from "../components/Popup";

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
});

// const defaultCardList = new Section({
//   data: items,
//   renderer: (item) => {
//     const card = new DefaultCard(item, '.default-card');
//     const cardElement = card.generate();
//     defaultCardList.setItem(cardElement);
//   }
// }, cardListSelector);

import { renderLoading } from "../utils/utils.js";

import { validationConfig } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

let userId;

// const setUserInfo = (user) => {
//   //получение данных пользователя
//   nameInfo.textContent = user.name;
//   jobInfo.textContent = user.about;
//   userAvatar.src = user.avatar;
//   userId = user._id;
// };

const profileInfo = new UserInfo({
  name: nameInfo,
  about: jobInfo,
  avatar: userAvatar,
});
console.log(profileInfo);

api.getAllInfo().then(([cards, userData]) => {
  //функция для получения данных пользователя
  profileInfo.setUserInfo(userData);
  userId = userData._id;

  // получение карточек с сервера
  // cards.reverse().forEach((data) => {
  //   renderCard(data, postsContainer, userId, clickImage);
  // });

  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card =
          userId === item.owner._id
            ? new Card(item, "#post-template-user")
            : new Card(item, "#post-template");
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      },
    },
    postsContainer
  );
  cardList.renderItems();
});

const fillInEditProfileFormInputs = () => {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

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
const profilePopup = new Popup(popupProfile);

// const openProfile = function () {
//   hideError();
//   fillInEditProfileFormInputs();
//   disableButton(buttonNamePopup, validationConfig);
//   openPopup(popupProfile);
// };

//открытие попапа для изменения аватара
const openAvatarPopup = function () {
  hideError();
  openPopup(popupAvatar);
  disableButton(buttonAvatarPopup, validationConfig);
};

// функция для редактирования информации в профиле
function handleProfileChanges(e) {
  e.preventDefault();
  renderLoading(buttonNamePopup, true);
  editProfile({ name: nameInput.value, about: jobInput.value })
    .then((dataFromServer) => {
      setUserInfo(dataFromServer);
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
      formAvatar.reset();
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
openButtonProfile.addEventListener("click", () => profilePopup.open());
closeProfileButton.addEventListener("click", () => profilePopup.close());

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
      renderCard(dataFromServer, postsContainer, userId, clickImage);
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

//переменная для темплейта карточки
const postTemplate = document.querySelector("#post-template");
//функция для добавления карточек на страницу
const renderCard = function (data, container, userId, clickImage) {
  const card = createCard(
    data,
    userId,
    handleChangeLikeStatus,
    handleDeleteCard,
    clickImage,
    postTemplate
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

enableValidation(validationConfig);
