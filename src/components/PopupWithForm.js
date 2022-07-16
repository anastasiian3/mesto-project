import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm; //тут дб метод класса апи
    this._inputList = Array.from(this._popupSelector.querySelectorAll(".form__input"));
    this._formElement = this._popupSelector.querySelector(".form");
  }

  _getInputValues() {
    //собирает данные всех полей формы
    this._inputValues = [];
    //перебрать все инпуты и внести в массив значений
    this._inputList.forEach((inpit) => {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      //? что еще?
    });
    //добавить обработчик сабмита формы
  }

  close() {
    super.close();
    //форма должна сбрасываться
    this._formElement.reset();
  }
}
