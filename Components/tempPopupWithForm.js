import Popup from "./Popup.js";
import {v4 as uuidv4} from "https://jspm.dev/uuid";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleSubmitForm}){
        super({popupSelector});
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popupElement.querySelector(".popup__form")
    }

    _getInputValues(){
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._values = {}
        this._inputList.forEach((inputElement) => {
              this._name = inputElement.name;
              this._value = inputElement.value;
              this._values[this._name] = this._value;
        })
              this._values.id = uuidv4();
       return this._values;
    }

    setEventListener(){

         super.setEventListener();
         this._popupForm.addEventListener("submit", (evt) => {
               evt.preventDefault();
              this._handleSubmitForm(this._getInputValues());
         })
      


    }
}