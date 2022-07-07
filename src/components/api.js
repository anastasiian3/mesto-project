const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
};

const onResponce = (responce) => {
  return responce.ok ? responce.json() : Promise.reject(responce);
};

//загрузка всех карточек с сервера
function getCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then(onResponce);
}

//получение информации о пользователе
function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  }).then(onResponce);
}

function getAllInfo() {
  return Promise.all([getCards(), getUserInfo()]);
}

//редактирование информации о пользователе
function editProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponce);
}

//добавление новой карточки
function addCard(data) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponce);
}

//удаление карточки
function removeCard(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponce);
}

//изменение аватара
function editUserAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponce);
}

// изменение состояния лайка
function changeLikeStatus(dataId, isLiked) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(onResponce);
}

export {
  getCards,
  addCard,
  removeCard,
  getUserInfo,
  editProfile,
  editUserAvatar,
  getAllInfo,
  changeLikeStatus,
};
