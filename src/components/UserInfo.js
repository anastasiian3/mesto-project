export default class UserInfo {
  constructor({ name, about, avatar, userId }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      // avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}

// const setUserInfo = ({ userName, userDescription, userAvatar }) => {
//   if (userName) profileTitle.textContent = userName;
//   if (userDescription) profileDescription.textContent = userDescription;
//   if (userAvatar) profileAvatar.src = userAvatar;
// })`;
// };

// const setUserInfo = (user) => {
//   //получение данных пользователя
//   nameInfo.textContent = user.name;
//   jobInfo.textContent = user.about;
//   userAvatar.src = user.avatar;
//   userId = user._id;
// };

// const fillInEditProfileFormInputs = () => {
//   nameInput.value = nameInfo.textContent;
//   jobInput.value = jobInfo.textContent;
// };;