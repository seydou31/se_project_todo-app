class FormValidator{
    constructor(settings, formEl){
        this._settings = settings;
        this._formEl = formEl;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
   this._errorClass = settings.errorClass;
   this._inputErrorClass = settings.inputErrorClass;
   this._inactiveButtonClass = settings.inactiveButtonClass;
    }


    _showErrorInput(inputElement, errorMessage){
        const errorElementId = `#${inputElement.id}-error`;
  const errorElement = this._formEl.querySelector(errorElementId);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement){
         const errorElementId = `#${inputElement.id}-error`;
  const errorElement = this._formEl.querySelector(errorElementId);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
    }

    _checkInputValidity(inputElement){
         if (!inputElement.validity.valid) {
            this._showErrorInput(
             inputElement,
          inputElement.validationMessage,
       );
  } else {
     this._hideInputError(inputElement);
  }
    }

  _hasInvalidInput(inputList){
     return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }

  _toggleButtonState (inputList){
     if (this._hasInvalidInput(inputList)) {
      this._formEl.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
       this._formEl.querySelector(this._submitButtonSelector).disabled = true;
  } else {
       this._formEl.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
       this._formEl.querySelector(this._submitButtonSelector).disabled = false;
  }
  }

    _setEventListeners(){
        const inputList = Array.from(
    this._formEl.querySelectorAll(this._inputSelector),
  );

  this._toggleButtonState(inputList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
     this._toggleButtonState(inputList);
    });
  });
    }

  enableValidation(){

  this._formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners();
  }

  resetValidation(){
    this._formEl.querySelector(this._inputSelector).value = "";
     this._formEl.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
  }
}

export default FormValidator;