import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //тут дб метод класса апи
    //this._inputList = Array.from(this._popupSelector.querySelectorAll(".form__input"));
    this._formElement = this._popupSelector.querySelector(".form");
  }
  //нужно?
  // _getElement() {
  // 	const formElement = document
  //     .querySelector(this._selector)
  //     .content
  //     .querySelector('.form')
  //     .cloneNode(true);

  //   return formElement;
  // }

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

  _setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
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
  //нужно ли?
  // generate() {
  //   this._element = this._getElement();
  //   this._setEventListeners();

  // 	return this._element;
  // }
}
