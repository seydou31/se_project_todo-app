export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1; // Add 1 when increment is true
    } else {
      this._completed -= 1; // Subtract 1 when increment is false
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total += 1; // Add 1 when increment is true
    } else {
      this._total -= 1; // Subtract 1 when increment is false
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }

}

