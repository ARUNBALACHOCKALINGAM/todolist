const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const all=document.getElementsByClassName('all');
const active=document.getElementsByClassName('active');
const finished=document.getElementsByClassName('complete');
const clear=document.getElementsByClassName('clear');

todoButton.addEventListener('click',addTodo);


todoList.addEventListener('click',deleteCheck);

const container=document.querySelector('.container');
const toggle=document.querySelector('.toggle');
toggle.addEventListener('click',changeModes);
var count=0;

function changeModes(){
    document.body.classList.toggle('dark');
    
}
function addTodo(event){
   
    event.preventDefault();
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    var itemsleft=document.getElementById('itemsleft');
    const completedButton=document.createElement("INPUT");
    completedButton.setAttribute("type","checkbox");
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const newToDO= document.createElement('li');
    newToDO.innerText=todoInput.value;
    newToDO.classList.add('todo-item');
    todoDiv.appendChild(newToDO);
    const crossButton=document.createElement('button');
    crossButton.classList.add("cross-btn");
    
    todoDiv.appendChild(crossButton);
    todoList.appendChild(todoDiv);
    count++;
    itemsleft.innerHTML=count;
    todoInput.value="";
    if(Array.prototype.indexOf.call(todoList.childNodes,todoDiv)==0){
            todoDiv.style.borderRadius = "10px 10px 0px 0px";
    }
}








function deleteCheck(e){
    const item= e.target;
    var itemsleft=document.getElementById('itemsleft');
    if(item.classList[0]==='complete-btn')
    {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        
        if(todo.classList.contains('completed')){
            count--;
            itemsleft.innerHTML=count;

        }else{
            count++;
            itemsleft.innerHTML=count;
        }
     }
     
     if(item.classList[0]==='cross-btn')
    {
        const todo=item.parentElement;
        todo.remove();
        if(!todo.classList.contains('completed')){
            count--;
            itemsleft.innerHTML=count;

        }
      
     }
}



function displayAll(){

    const todos=todoList.childNodes;
    

    todos.forEach(function(todo){
            todo.style.display='flex'
    })
   
}

function displayCompleted(){
  const todos=todoList.childNodes;


  todos.forEach(function(todo){
      if(todo.classList.contains('completed')){
          todo.style.display='flex';

          
      }else{
        todo.style.display='none';
      }
  })
}

function displayUncompleted(){
    const todos=todoList.childNodes;
  
  
    todos.forEach(function(todo){
        if(!todo.classList.contains('completed')){
            todo.style.display='flex';
  
        }else{
          todo.style.display='none';
     
        }
     
    })

    
  }

  function Clear(){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.classList.contains('completed')){
              todo.remove();
        }
    })
}

  function savelocalStore(todo){
      let todos;
      if(localStorage.getItem("todos")===null){
          todos=[];
      }else{
          todos=JSON.parse(localStorage.getItem("todos"));
      }

      todos.push(todo);
      localStorage.setItem("todos",JSON.stringify(todos));
  }



