class Api {
  constructor(url, headers) {
    // тело конструктора
    this._url = url;
    this._headers = headers;
  }

  _onResponce(responce) {
    return responce.ok ? responce.json() : Promise.reject(responce);
  }

  //методы работы с API

  //загрузка всех карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(onResponce);
  }

  //получение информации о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(onResponce);
  }

  // getAllInfo() {
  //   return Promise.all([getCards(), getUser()]);
  // }

  //редактирование информации о пользователе
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  //добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  //удаление карточки
  removeCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponce);
  }

  //изменение аватара
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  // изменение состояния лайка
  changeLikeStatus(dataId, isLiked) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(onResponce);
  }
}

// ! Перенести в индекс
const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "48267a8c-35ef-4976-8b19-19133ce8e68c",
    "Content-Type": "application/json",
  },
});
