import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //тут дб метод класса апи
    this._formElement = this._popupSelector.querySelector(".form");
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._element.querySelectorAll(".form__input");

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
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
