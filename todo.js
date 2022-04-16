const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstcardbody =  document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){

    form.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondcardbody.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filtertodos);
    clearbutton.addEventListener("click",clearalltodos);
}

function clearalltodos(e){

    if(confirm("Would you like to delete all?")){
        //clear all todos from UI

        //todolist.innerHTML="";    //slow version

        while(todolist.firstElementChild != null){

            todolist.removeChild(todolist.firstElementChild);
        }
        
        localStorage.removeItem("todos");

    }



}

function filtertodos(e){

const filtervalue = e.target.value.toLowerCase();
const listitems = document.querySelectorAll(".list-group-item");

listitems.forEach(function(listitem){

    const text = listitem.textContent.toLowerCase();

    if (text.indexOf(filtervalue) === -1){

        listitem.setAttribute("style","display : none !important");

    }

    else{

        listitem.setAttribute("style","display : block" );
    }


});


    
}

function deletetodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deletetodofromstorage(e.target.parentElement.parentElement.textContent);

        showalert("success","Succesfully Deleted!");

    }

}

function deletetodofromstorage(deletetodo){

let todos = gettodosfromstorage();

todos.forEach(function(todo,index){

    if(todo === deletetodo){
            todos.splice(index,1);
    }
});

localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){

    let todos = gettodosfromstorage();

    todos.forEach(function(todo){

        addtodotoUI(todo);



    })


}

function addtodo(e){
    const newtodo = todoinput.value.trim();

    //console.log(newtodo);

    if(newtodo === "")
    {
        showalert("danger","Lütfen todo girin...");

    }
    else{
        addtodotoUI(newtodo);
        addtodotostorage(newtodo);
        showalert("success","Todo başarı ile eklendi");
    }

    //addtodotoUI(newtodo);

    e.preventDefault();
}


function gettodosfromstorage(){
 let todos;

if (localStorage.getItem("todos") === null){
    todos=[];
}

else{
    todos = JSON.parse(localStorage.getItem("todos"));
}

return todos;
}

function addtodotostorage(newtodo){

    let todos = gettodosfromstorage();

    todos.push(newtodo);

    localStorage.setItem("todos",JSON.stringify(todos));



}


function showalert(type,message)
{


const alert = document.createElement("div");

alert.className = `alert alert-${type}`;
alert.textContent = message;

firstcardbody.appendChild(alert);

setTimeout(function(){
alert.remove();
},2000);


}

 function addtodotoUI(newtodo){

     const listitem = document.createElement("li");
     const link = document.createElement("a");
     link.href = "#";
     link.className = "delete-item";
     link.innerHTML = "<i class = 'fa fa-remove'></i>";

     listitem.className = "list-group-item d-flex justify-content-between";

   listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(link);

     todolist.appendChild(listitem);

     todoinput.value="";
     
    console.log(listitem);

 }
