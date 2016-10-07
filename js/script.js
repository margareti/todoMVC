class TodoList {
  constructor (args) {
  	this.todos = args['todos'];
  	this.node = args['node'];
  	this.onTodoStateChanged = args['onTodoStateChanged'];
  	this.onTodoRemoved = args['onTodoRemoved'];
  	this.onTodoAdd = args['onTodoAdd'];


    this.onchange = new Event('onchange', {bubbles: true});
    this.onadd = new Event('onadd', {bubbles: true});
    this.ondelete = new Event('ondelete', {bubbles: true});

    this.node.addEventListener('onchange', this.render);
    this.node.addEventListener('onadd', () => {
      this.render();
    });
    this.node.addEventListener('ondelete', this.render);
  }

	render() {
    this.node.innerHTML = '';
    const obj = this;

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

      //remove event listener
      remove.addEventListener('click', function() {
        obj.onTodoRemoved(current);
        obj.render();
      })

      //state change event listener
      input.addEventListener('click', function() {
        obj.onTodoStateChanged(current);
        obj.render();
      })
      if (this.todos[current].done) {
        input.checked = true;
      }

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

    //add new event listener
    newInput.addEventListener('keyup', function(e) {
      if (e.keyCode === 13) {
        const text = this.value;
        console.log(text)
        obj.onTodoAdd(text);
        obj.render();
      }
    })
	}
}

const todos = {
  1: {done: false, text: 'Решить все задания 4 модуля' },
  2: {done: false, text: 'Заплатить за 5 модуль' },
  3: {done: false, text: 'Победить лень' },
  4: {done: false, text: 'Захватить мир' }
};

//document.registerElement('x-todos', ToDoList);




const todoList = new TodoList({
  todos,
  node: document.querySelector('.todos'),
  onTodoStateChanged: function (id) {
      this.todos[id].done = !this.todos[id].done;
  },
  onTodoRemoved: function (id) {

    delete this.todos[id];
  },
  onTodoAdd: function (text) {
      this.todos[Math.random().toString(16).substr(2)] = { done: false, text }
  }
})
console.log(todoList)
todoList.render()





