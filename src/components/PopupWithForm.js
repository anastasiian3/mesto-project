import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm; //тут дб метод класса апи
  }

  _getInputValues() {
    //собирает данные всех полей формы
  }

  setEventListeners() {
    super.setEventListeners();
    //добавить обработчик сабмита формы
  }

  close() {
    super.close();
    //форма должна сбрасываться
    this._popupSelector.querySelector(".form").reset();
  }
}
