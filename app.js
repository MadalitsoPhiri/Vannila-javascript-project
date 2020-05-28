//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


const addTodo = event=>{

  
  if(todoInput.value.length === 0){

    //submit form and let the input field respond
    
      }
  
  
  else{
    //prevent form from submiting
  event.preventDefault();
  console.log("ToDo Added");
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STORAGE
  savelocal(todoInput.value);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
 //CHECK TRASH BUTTON
 const trashButton = document.createElement("button");
 trashButton.innerHTML = '<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);
 //APPEND TO LIST
 todoList.appendChild(todoDiv);
 //Clear input value
 todoInput.value = "";
  }
};

const deleteCheck = event=>{
  const item = event.target;
 console.log(item)
 if(item.classList[0] === 'trash-btn'){
   const todoDiv = item.parentElement;
   todoDiv.classList.add('Fall');
   removeLocalTodos(todoDiv);   
   todoDiv.addEventListener('transitionend', function(){
  
    todoDiv.remove();
      
   });   
 }
 if(item.classList[0] === 'complete-btn'){
    const completed = item.parentElement;
    completed.classList.toggle("completed");
 }
}

function filterTodo(event){

  const todos = todoList.childNodes;
  todos.forEach(element => {
    switch(event.target.value){
      case 'all':
        element.style.display = 'flex'
        break;
      case 'completed':
        if(element.classList.contains('completed')){
          element.style.display = 'flex' 
        }else{
          element.style.display = 'none'
        }
        break;
      case 'incomplete': 
        if(!element.classList.contains('completed')){
          element.style.display = 'flex' 
        }else{
          element.style.display = 'none'
        }
        break;
    }
    
  });

}

function savelocal(todo){
  //Check if i already have local todo
  let todos;
  if(localStorage.getItem('todos')=== null){
     todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
  console.log()
  let todos;
  if(localStorage.getItem('todos')=== null){
     todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){
  event.preventDefault();
  console.log("ToDo Added");
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
 //CHECK TRASH BUTTON
 const trashButton = document.createElement("button");
 trashButton.innerHTML = '<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);
 //APPEND TO LIST
 todoList.appendChild(todoDiv);
 //Clear input value
});

}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')=== null){
     todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  let delItemindex = todos.indexOf(todo.children[0].innerText)
  todos.splice(delItemindex,1)
  localStorage.setItem('todos',JSON.stringify(todos))
}

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
document.addEventListener('DOMContentLoaded',getTodos)
