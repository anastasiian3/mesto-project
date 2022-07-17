import "./index.css"; // добавьте импорт главного файла стилей

import {
  userInfo,
  postsContainer,
  formPost,
  popupPost,
  popupProfile,
  openButtonProfile,
  newPostButton,
  formName,
  nameInfo,
  nameInput,
  jobInfo,
  jobInput,
  popupImageZoom,
  inputPlaceTitle,
  inputPlaceLink,
  userAvatar,
  avatarInput,
  popupAvatar,
  formAvatar,
  userAvatarButton,
  buttonAvatarPopup,
  buttonPostPopup,
  buttonNamePopup,
} from "../utils/data.js";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { renderLoading } from "../utils/utils.js";
import { validationConfig } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// экземпляр класса апи
const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
});

let myId;

let cardList;

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
//экземпляр класса UserInfo
const profileInfo = new UserInfo(userInfo);

api.getAllInfo().then(([cards, userData]) => {
  //функция для получения данных пользователя
  profileInfo.setUserInfo(userData);
  myId = userData._id;

  cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      },
    },
    postsContainer
  );
  cardList.renderItems();
});

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

// открытие попапа редактирования профиля
const profilePopup = new Popup(popupProfile);
profilePopup.setEventListeners();

function handleProfileForm() {
  //заполнение формы профиля данными со страницы
  const userObj = profileInfo.getUserInfo();
  nameInput.value = userObj.name;
  jobInput.value = userObj.about;
  const editProfileValidation = new FormValidator(validationConfig, formName);
  editProfileValidation.enableValidation();
  editProfileValidation.hideError();
  profilePopup.open();
}

openButtonProfile.addEventListener("click", handleProfileForm);

// открытие попапа редактирования аватара
const avatarPopup = new Popup(popupAvatar);
avatarPopup.setEventListeners();

function handleAvatarForm() {
  // создание валидации для формы изменения аватара
  const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
  editAvatarValidation.enableValidation();
  editAvatarValidation.hideError();
  editAvatarValidation.disableButton();
  avatarPopup.open();
}

newPostButton.addEventListener("click", handlePostForm);

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

userAvatarButton.addEventListener("click", handleAvatarForm);

// открытие попапа добавления поста
// const postPopup = new Popup(popupPost);
// addNewCard.setEventListeners();

const newPostValidation = new FormValidator(validationConfig, formPost);
function handlePostForm() {
  // создание валидации для формы нового поста
  newPostValidation.enableValidation();
  newPostValidation.hideError();
  newPostValidation.disableButton();
  addNewCard.open();
}

newPostButton.addEventListener("click", handlePostForm);

const addNewCard = new PopupWithForm({
  popupSelector: document.querySelector(".popup_type_post"),
  handleFormSubmit: (inputValue) => {
    //   renderLoading(buttonPostPopup, true);
    api
      .addCard({ name: inputValue.placeTitle, link: inputValue.placeLink })
      .then((data) => {
        const card = createCard(data);
        const cardElement = card.generate();
        cardList.addItem(cardElement);
        console.log(`Пост добавлен! Место: ${data.name}, ссылка на фото места: ${data.link}`);
        newPostValidation.disableButton();
        addNewCard.close();
      })
      .catch((err) => {
        console.log(`Что-то не так! Ошибка при добавлении карточки: ${err}`);
      })
      .finally(() => {
        //renderLoading(buttonPostPopup, false);
      });
  },
});

addNewCard.setEventListeners();

// слушатель событий формы
//formPost.addEventListener("submit", addNewCards);
formName.addEventListener("submit", handleProfileChanges);
formAvatar.addEventListener("submit", changeUserAvatar);
