export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
  }

  open() {
    this._popupSelector.classList.toggle("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOverlay);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleClickOverlay);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.target.closest(".popup__container")) {
      return;
    }
    this.close();
  }

  setEventListeners() {
    this._popupSelector.querySelector(".popup__close-button").addEventListener("click", () => this.close());
  }
}
