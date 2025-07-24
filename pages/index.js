import FormValidation from "../Components/FormValidation.js";
import Todo from "../Components/Todo.js";
import { initialTodos, validationConfig } from "../Utils/Constants.js";
import Section from "../Components/Section.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import TodoCounter from "../Components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCompleted(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal(item) {
  todoCounter.updateTotal(item);
}
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

const addToDoPopupForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmitForm: (values) => {
    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    addTodoPopup.classList.remove("popup_visible");
    newValidationForm.resetValidation();
    todoCounter.updateTotal(true);
  },
});

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCompleted, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addToDoPopupForm.open();
});
addToDoPopupForm.setEventListener();

const newValidationForm = new FormValidation(validationConfig, addTodoForm);
section.renderItems();
todoCounter.initialCounter();
newValidationForm.enableValidation();
