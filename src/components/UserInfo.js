export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  }

  setUserInfo({ name, about, avatar, id }) {
    if (name) this._userName.textContent = name;
    if (about) this._userAbout.textContent = about;
    if (avatar) this._userAvatar.src = avatar;
    if (id) this._userId = id;
  }
}
