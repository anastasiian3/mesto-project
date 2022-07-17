import "./index.css"; // добавьте импорт главного файла стилей

// import { openPopup, closePopup } from "../components/modal.js";

// import //createCard,
// // updateLikeState,
// //clickButtonDelete,
// "../components/old_card.js";

// import {
//   disableButton,
//   enableValidation,
//   hideError,
// } from "../components/validate.js";

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
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { renderLoading } from "../utils/utils.js";
import { validationConfig } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// создание валидации для формы пользователя
const editProfileValidation = new FormValidator(validationConfig, formName);
editProfileValidation.enableValidation();
editProfileValidation.hideError();

// экземпляр класса апи
const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
});
// Возможно стоит сменить название
let myId;

const profileInfo = new UserInfo({
  name: nameInfo,
  about: jobInfo,
  avatar: userAvatar,
});

const popupWithImage = new PopupWithImage(popupImageZoom);
popupWithImage.setEventListeners();

const createCard = (item) => {
  return new Card({
    title: item.name,
    link: item.link,
    ownerId: item.owner._id,
    cardId: item._id,
    myId: myId,
    likes: item.likes,
    cardSelector: "#post-template",
    handleLikeClick: () => {
      console.log("Лайк");
      console.log("owner: " + item.owner._id);
      console.log("itemID: " + item._id);
      console.log("MyID: " + myId);
    },
    handleDeleteClick: () => {
      console.log("Карточка удалена");

      // api
      //   .removeCard(cardId)
      //   .then((dataFromServer) => {
      //     //clickButtonDelete(cardElement);
      //     // const cardElement = document.querySelector(${#_id})
      //     handleDeleteCard(cardElement, _id);
      //     console.log(`Внимание! ${dataFromServer.message}`);
      //   })
      //   .catch((err) => {
      //     console.log(`Что-то не так! Ошибка при удалении карточки: ${err}`);
      //   });
    },
    handleCardClick: () => popupWithImage.open(item.link, item.name),
  });
};

api.getAllInfo().then(([cards, userData]) => {
  //функция для получения данных пользователя
  profileInfo.setUserInfo(userData);
  myId = userData._id;

  // const cardList = new Section(
  //   {
  //     items: cards,
  //     renderer: (item) => {
  //       const card =
  //         myId === item.owner._id
  //           ? createCard({ ...item }, "#post-template-user")
  //           : createCard({ ...item }, "#post-template");
  //       //console.log("item.owner._id: ", item.owner._id);
  //       //console.log(item);
  //       const cardElement = card.generate();
  //       cardList.addItem(cardElement);
  //     },
  //   },
  //   postsContainer
  // );

  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        //: createCard({ ...item }, "#post-template");
        //console.log("item.owner._id: ", item.owner._id);
        //console.log(item);
        const cardElement = card.generate(myId);
        cardList.addItem(cardElement);
      },
    },
    postsContainer
  );

  cardList.renderItems();
});
//заполнение формы профиля данными со страницы
const fillInEditProfileFormInputs = () => {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};
//изменение лайков и связь с сервером
const handleChangeLikeStatus = (cardElement, cardId, isLiked) => {
  changeLikeStatus(cardId, isLiked)
    .then((dataFromServer) => updateLikeState(cardElement, dataFromServer.likes, myId))
    .catch((err) => {
      console.log(`Что-то не так! Ошибка при обновлении лайков на карточке: ${err}`);
    });
};
//удаление элемента из дом
const clickButtonDelete = function (element) {
  element.remove();
  element = null;
};
//удаление, связь с сервером
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
profilePopup.setEventListeners();

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
      console.log(`Что-то не так! Ошибка при изменении данных пользователя: ${err}`);
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
      console.log(`Аватар успешно обновлен! Ссылка на аватар: ${dataFromServer.avatar}`);
    })
    .then(() => {
      formAvatar.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(`Что-то не так! Ошибка при попытке изменения аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(buttonAvatarPopup, false);
    });
}

// закрытие и открытие попапа редактирования профиля по кнопке
openButtonProfile.addEventListener("click", () => {
  profilePopup.open();
  // profileInfo.getUserInfo();
  // nameInput.value = profileInfo.name;
  // jobInput.value = jobInfo.textContent;
  fillInEditProfileFormInputs();
  editProfileValidation.hideError();
});
// closeProfileButton.addEventListener("click", () => profilePopup.close());

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
      renderCard(dataFromServer, postsContainer, myId, clickImage);
      console.log(`Пост добавлен! Место: ${dataFromServer.name}, ссылка на фото места: ${dataFromServer.link}`);
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
// const postTemplate = document.querySelector("#post-template");
//функция для добавления карточек на страницу
// const renderCard = function (data, container, myId, clickImage) {
//   const card = createCard(data, myId, handleChangeLikeStatus, handleDeleteCard, clickImage, postTemplate);
//   container.prepend(card);
// };

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

// enableValidation(validationConfig);
