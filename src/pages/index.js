import "./index.css"; // добавьте импорт главного файла стилей

import {
  userInfo,
  postsContainer,
  formPost,
  openButtonProfile,
  newPostButton,
  formName,
  nameInput,
  jobInput,
  popupImageZoom,
  formAvatar,
  userAvatarButton,
  apiConfig,
} from "../utils/data.js";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Сard.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { validationConfig } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

let myId;
let cardList;
const api = new Api(apiConfig);
const profileInfo = new UserInfo(userInfo);
const popupWithImage = new PopupWithImage(popupImageZoom);
const editProfileValidation = new FormValidator(validationConfig, formName);
const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
const newPostValidation = new FormValidator(validationConfig, formPost);

const createCard = (item) => {
  const card = new Card({
    title: item.name,
    link: item.link,
    ownerId: item.owner._id,
    cardId: item._id,
    myId: myId,
    likes: item.likes,
    cardSelector: "#post-template",
    handleAddLikeClick: () => {
      api
        .addLike(item._id)
        .then((data) => {
          card.setLike();
          card.showLikeCounter(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLikeClick: () => {
      api
        .removeLike(item._id)
        .then((data) => {
          card.setLike();
          card.showLikeCounter(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteClick: () => {
      api
        .removeCard(item._id)
        .then((dataFromServer) => {
          card.clickButtonDelete();
          console.log(`Внимание! ${dataFromServer.message}`);
        })
        .catch((err) => {
          console.log(`Что-то не так! Ошибка при удалении карточки: ${err}`);
        });
    },
    handleCardClick: () => popupWithImage.open(item.link, item.name),
  });
  return card;
};

//promise all для подтягивания данных на страницу
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

const changeUserInfo = new PopupWithForm({
  popupSelector: document.querySelector(".popup_type_name"),
  handleFormSubmit: (inputValue) => {
    changeUserInfo.renderLoading("Сохранение...");
    api
      .editProfile({ name: inputValue.nameInput, about: inputValue.professionInput })
      .then((data) => {
        profileInfo.setUserInfo({ name: data.name, about: data.about });

        console.log(`Профиль успешно обновлен! Имя пользователя: ${data.name}, профессия: ${data.about}`);
        changeUserInfo.close();
      })
      .catch((err) => {
        console.log(`Что-то не так! Ошибка при изменении данных пользователя: ${err}`);
      })
      .finally(() => {
        changeUserInfo.renderLoading("Сохранить");
      });
  },
});

//экземпляр класса для попапа изменения аватара
const changeUserAvatar = new PopupWithForm({
  popupSelector: document.querySelector(".popup_type_avatar"),
  handleFormSubmit: (inputValue) => {
    changeUserAvatar.renderLoading("Сохранение...");
    api
      .editUserAvatar({ avatar: inputValue.avatarInput })
      .then((data) => {
        profileInfo.setUserInfo({ avatar: data.avatar });

        console.log(`Аватар успешно обновлен! Ссылка на аватар: ${data.avatar}`);
        changeUserAvatar.close();
      })
      .catch((err) => {
        console.log(`Что-то не так! Ошибка при попытке изменения аватара: ${err}`);
      })
      .finally(() => {
        changeUserAvatar.renderLoading("Сохранить");
      });
  },
});

//экземпляр класса для попапа добавления новой карточки
const addNewCard = new PopupWithForm({
  popupSelector: document.querySelector(".popup_type_post"),
  handleFormSubmit: (inputValue) => {
    addNewCard.renderLoading("Сохранение...");
    api
      .addCard({ name: inputValue.placeTitle, link: inputValue.placeLink })
      .then((data) => {
        const card = createCard(data);
        const cardElement = card.generate();
        cardList.addItem(cardElement);
        console.log(`Пост добавлен! Место: ${data.name}, ссылка на фото места: ${data.link}`);
        addNewCard.close();
      })
      .catch((err) => {
        console.log(`Что-то не так! Ошибка при добавлении карточки: ${err}`);
      })
      .finally(() => {
        addNewCard.renderLoading("Сохранить");
      });
  },
});

function handleProfileForm() {
  const userObj = profileInfo.getUserInfo();
  nameInput.value = userObj.name;
  jobInput.value = userObj.about;
  editProfileValidation.hideError();
  editProfileValidation.disableButton();
  changeUserInfo.open();
}

//функция для открытия попапа добавления новой карточки
function handlePostForm() {
  newPostValidation.hideError();
  newPostValidation.disableButton();
  addNewCard.open();
}

//функция для открытия попапа изменения аватара
function handleAvatarForm() {
  editAvatarValidation.hideError();
  editAvatarValidation.disableButton();
  changeUserAvatar.open();
}

addNewCard.setEventListeners();
newPostButton.addEventListener("click", handlePostForm);
changeUserInfo.setEventListeners();
openButtonProfile.addEventListener("click", handleProfileForm);
popupWithImage.setEventListeners();
changeUserAvatar.setEventListeners();
userAvatarButton.addEventListener("click", handleAvatarForm);

newPostValidation.enableValidation();
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();
