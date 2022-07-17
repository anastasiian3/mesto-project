import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageTitle = this._popupSelector.querySelector(".popup__image-title");
    this._popupImage = this._popupSelector.querySelector(".popup__image");
  }

  open(link, name) {
    super.open();
    this._popupImage.src = link;
    this._popupImageTitle.textContent = name;
    this._popupImage.alt = name;
  }
}
