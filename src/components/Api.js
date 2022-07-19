export default class Api {
  constructor({ url, headers }) {
    // тело конструктора
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(responce) {
    return responce.ok ? responce.json() : Promise.reject(responce);
  }

  //методы работы с API

  //загрузка всех карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //получение информации о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAllInfo() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  //редактирование информации о пользователе
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  //добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  //удаление карточки
  removeCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //изменение аватара
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // метод удаления лайка
  removeLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
