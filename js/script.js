class TodoList {
  constructor (todos, node, change, rem, add) {
  	this.todos = todos;
  	this.node = node;
  	this.onTodoStateChanged = change;
  	this.onTodoStateChanged = rem;
  	this.onTodoAdd = add;
  }
	init() {
		const shadowRoot = this.attachShadow({ mode: 'closed' });
	}
	render() {
 		const htmlMarkup = '';
 		console.log(this)
	}
  // createCallback(){
	 //  console.log(this);
	 //  console.log('ready')
  // }
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
    node: document.querySelector('todos'),
    onTodoStateChanged: function (id) {
        // this.todos = {
        //     Array.from(this.todos)],
        //     [id]: { Array.from(this.todos)[id], done: !this.todos[id].done }
        // };
    },
    onTodoRemoved: function (id) {
        // const newTodos = { Array.from(this.todos) };
        // delete newTodos[id];
        // this.todos = newTodos;
    },
    onTodoAdd: function (text) {
        // this.todos = {
        //     ...this.todos,
        //     [Math.random().toString(16).substr(2)]: { done: false, text }
        // };
    }
});

console.log(todoList)