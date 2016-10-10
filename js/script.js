class TodoList {
  constructor (args) {
  	this.todos = args['todos'];
  	this.node = args['node'];
  	this.onTodoStateChanged = args['onTodoStateChanged'];
  	this.onTodoRemoved = args['onTodoRemoved'];
  	this.onTodoAdd = args['onTodoAdd'];
    this.render();

    const obj = this;
    this.onchange = new Event('onchange', {bubbles: true});
    this.onadd = new Event('onadd', {bubbles: true});
    this.ondelete = new Event('ondelete', {bubbles: true});


    this.node.addEventListener('onchange', () => {
      this.render();
    });
    this.node.addEventListener('onadd', () => {
      this.render();
    });
    this.node.addEventListener('ondelete', () => {
      this.render();
    });


    this.node.addEventListener('keyup', function(e) {
      const addNew = this.querySelector('input[type="text"]');
      if (e.keyCode === 13) {
        obj.onTodoAdd(addNew.value);
        obj.node.dispatchEvent(obj.onadd);
      }
    })

    this.node.addEventListener('click', function(e) {
      let relevantId;
      if (e.target.classList.contains('todos__remove')) {
        relevantId = e.target.parentElement.dataset.id;
        obj.onTodoRemoved(relevantId);
        obj.node.dispatchEvent(obj.ondelete);
      } else if (e.target.nodeName === 'LABEL') {
        relevantId = e.target.parentElement.dataset.id;
        obj.onTodoStateChanged(relevantId);
        obj.node.dispatchEvent(obj.onchange);
      }
    })

  }

	render() {
    this.node.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'todos';
    title.classList.add('todos__title');

    const ul = document.createElement('ul');
    const total = Object.keys(this.todos);
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'погладить кота';
    newInput.classList.add('todos_new');

    for (let el in total) {
      const current = total[el];
      const li = document.createElement('li');
      li.dataset.id = current;

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = current;

      const label = document.createElement('label');
      label.htmlFor = current;

      const remove = document.createElement('span');
      remove.textContent = '✖';
      remove.classList.add('todos__remove');

      li.appendChild(input);
      li.appendChild(label);
      label.textContent = this.todos[current].text;
      li.appendChild(remove);
      li.dataset.done = this.todos[current].done;
      ul.appendChild(li);
    }

    this.node.appendChild(title);
    this.node.appendChild(newInput);
    this.node.appendChild(ul);
	}
}


const todos = {
    1: {done: false, text: 'Решить все задания 4 модуля' },
    2: {done: false, text: 'Заплатить за 5 модуль' },
    3: {done: false, text: 'Победить лень' },
    4: {done: false, text: 'Захватить мир' }
};

const todoList = new TodoList({
    todos,
    node: document.querySelector('.todos'),
    onTodoStateChanged: function (id) {
        this.todos = {
            ...this.todos,
            [id]: { ...this.todos[id], done: !this.todos[id].done }
        };
    },
    onTodoRemoved: function (id) {
        const newTodos = { ...this.todos };
        delete newTodos[id];
        this.todos = newTodos;
    },
    onTodoAdd: function (text) {
        this.todos = {
            ...this.todos,
            [Math.random().toString(16).substr(2)]: { done: false, text }
        };
    }
});



