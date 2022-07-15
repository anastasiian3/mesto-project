export default class UserInfo {
  constructor(name, job, avatar, userId) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
    this._userId = userId;
  }

  getUserInfo() {

  }

  setUserInfo() {
    nameInfo.textContent = this._name;
    jobInfo.textContent = this._about;
    userAvatar.src = this._avatar;
    userId = this._userId;
  }
}

// const setUserInfo = (user) => {
//   //получение данных пользователя
//   nameInfo.textContent = user.name;
//   jobInfo.textContent = user.about;
//   userAvatar.src = user.avatar;
//   userId = user._id;
// };

