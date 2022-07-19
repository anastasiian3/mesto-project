import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //тут дб метод класса апи
    this._formElement = this._popup.querySelector(".form");
    this._buttonSubmit = this._formElement.querySelector(".form__button-submit");
    this._inputList = this._formElement.querySelectorAll(".form__input");
    this._submitBtnText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    //форма должна сбрасываться
    this._formElement.reset();
  }
}
