export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputElement = inputElement;
    this._errorMessage = errorMessage;
  }
}

// _showInputError (formElement, inputElement, errorMessage, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// // функция, прячущая ошибку
// _hideInputError (formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = "";
// };

// // функция, проверяющая валидность элемента ввода
// _checkInputValidity = (formElement, inputElement, config) {
//   if (!inputElement.validity.valid) {
//     _showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       config
//     );
//   } else {
//     _hideInputError(formElement, inputElement, config);
//   }
// };

// _setEventListeners = (formElement, config) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, config);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// };

// enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   });
// };

// _hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// _toggleButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = "disabled";
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// _disableButton(buttonElement, config) {
//   buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.disabled = "disabled";
// }

// function hideError() {
//   const errorTextList = document.querySelectorAll(".form__input-error");
//   errorTextList.forEach((error) => {
//     error.textContent = "";
//   });

//   const inputList = document.querySelectorAll(".form__input");
//   inputList.forEach((inputElement) => {
//     inputElement.classList.remove("form__input_type_error");
//   });
// }
