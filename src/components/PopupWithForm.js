import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //тут дб метод класса апи
    this._formElement = this._popupSelector.querySelector(".form");
    this._buttonSubmit = this._formElement.querySelector(".form__button-submit");
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._formElement.querySelectorAll(".form__input");

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  renderLoading(buttonMessage) {
    this._buttonSubmit.textContent = buttonMessage;
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
