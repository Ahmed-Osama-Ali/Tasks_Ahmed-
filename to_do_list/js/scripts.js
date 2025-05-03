class TodoItem {
  constructor(id, text, done = false) {
    this.id = id;
    this.text = text;
    this.done = done;
  }
}

class TodoList {
  constructor(formSelector, inputSelector, listSelector) {
    this.$form  = $(formSelector);
    this.$input = $(inputSelector);
    this.$list  = $(listSelector);
    this.items  = [];

    this._load();
    this._render();

    this.$form.on('submit', e => {
      e.preventDefault();
      const text = this.$input.val().trim();
      if (text) {
        this._addItem(text);
        this.$input.val('');
      }
    });
  }

  _addItem(text) {
    const id = Date.now();
    this.items.push(new TodoItem(id, text));
    this._save();
    this._render();
  }

  _toggleItem(id) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.done = !item.done;
      this._save();
      this._render();
    }
  }

  _editItem(id) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      const newText = prompt('Edit task:', item.text);
      if (newText !== null && newText.trim()) {
        item.text = newText.trim();
        this._save();
        this._render();
      }
    }
  }

  _deleteItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this._save();
    this._render();
  }

  _save() {
    localStorage.setItem('todo-items', JSON.stringify(this.items));
  }

  _load() {
    const data = localStorage.getItem('todo-items');
    if (data) {
      this.items = JSON.parse(data);
    }
  }

  _render() {
    this.$list.empty();
    this.items.forEach(item => {
      const $li = $('<li>')
        .addClass('list-group-item')
        .toggleClass('done', item.done);

      const $text = $('<span>').text(item.text);
      const $buttons = $('<div>');

      const $doneBtn = $('<button>')
        .addClass('btn btn-sm btn-outline-success')
        .text(item.done ? 'Undo' : 'Done')
        .on('click', () => this._toggleItem(item.id));

      const $editBtn = $('<button>')
        .addClass('btn btn-sm btn-outline-primary')
        .text('Edit')
        .on('click', () => this._editItem(item.id));

      const $delBtn = $('<button>')
        .addClass('btn btn-sm btn-outline-danger')
        .text('Delete')
        .on('click', () => this._deleteItem(item.id));

      $buttons.append($doneBtn, $editBtn, $delBtn);
      $li.append($text, $buttons);
      this.$list.append($li);
    });
  }
}

$(document).ready(() => {
  new TodoList('#todo-form', '#todo-input', '#todo-list');
});
