export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      //const openedPopup = document.querySelector(".popup_opened");
      this.close();
    }
  };

  open() {
    this._popupSelector.classList.toggle("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //   _handleClickOverlay() {
  //     popups.forEach((item) => {
  //       item.addEventListener("mousedown", (evt) => {
  //         if (evt.target.closest(".popup__container")) {
  //           return;
  //         }
  //         closePopup(evt.target.closest(".popup"));
  //       });
  //     });
  //   }
}

// // функция для закрытия попапов
// const closePopup = function (popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", keyEscHandler);
// };

// // функция закрытия попапа по клику на esc
// function keyEscHandler(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// //функция для закрытия попапов кликом на оверлей
// const popups = document.querySelectorAll(".popup");
// popups.forEach((item) => {
//   item.addEventListener("mousedown", (evt) => {
//     if (evt.target.closest(".popup__container")) {
//       return;
//     }
//     closePopup(evt.target.closest(".popup"));
//   });
// });
