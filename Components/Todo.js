class Todo{
  constructor(data, selector){
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

    _setEventListeners(){
      this._todoElement.querySelector(".todo__delete-btn").addEventListener("click", () => {
    this._todoElement.remove();
     });

     this._todoElement.querySelector(".todo__completed").addEventListener("change", ()=>{
        this._data.completed = !this._data.completed;
     })
     
     
  }


  getView(){
     this._todoElement = this._templateElement.content
   .querySelector(".todo")
   .cloneNode(true);
  const todoNameEl = this._todoElement.querySelector(".todo__name");
  const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
  const todoLabel = this._todoElement.querySelector(".todo__label");
  const todoDate = this._todoElement.querySelector(".todo__date");
  const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
     const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
   this._todoElement.querySelector(".todo__date").textContent = `Due: ${dueDate.toLocaleString("en-US", {
       year: "numeric",
       month: "short",
       day: "numeric",
     })}`;
   }

    this._setEventListeners()
      return this._todoElement;
  }
  
}

export default  Todo;