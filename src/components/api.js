// Здесь был Коля)
export default class Api {
  constructor({ url, headers }) {
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
    }).then(this._onResponce);
  }

  //получение информации о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._onResponce);
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
    }).then(this._onResponce);
  }

  //добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onResponce);
  }

  //удаление карточки
  removeCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._onResponce);
  }

  //изменение аватара
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onResponce);
  }

  // изменение состояния лайка
  changeLikeStatus(dataId, isLiked) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._onResponce);
  }
}
