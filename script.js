const taskBtn = document.getElementById("newTask");
const input =  document.getElementById("taskInput");
const taskList = document.getElementById("tasksList");
const taskCounter = document.getElementById("tasksLeft");
const storage = window.localStorage;

const updateTaskCount = () => {
    taskCounter.innerText = `tasks left: ${taskList.querySelectorAll("li:not(.done)").length}`;
};

const createTask = (content) => {
    const task=document.createElement("li");
    const taskText=content.trim();
    task.classList.add("task");
    if(storage.getItem(taskText) === "true") {
        taskList.classList.add("done");
    }else{
        taskList.classList.remove("done");
    }
    task.innerHTML = `<input type="checkbox" class="checkbox">
      <span class="task-content ${(storage.getItem(taskText) === "true") ? "txt-checked" : ""}">${content}</span>
     <button class="btn-del">X</button>`;
     taskList.appendChild(task);
    updateTaskCount();
    
    storage.setItem(taskText,false);
};

const renderInitial = () => {
    
    const tasks=Object.keys(storage);
    tasks.forEach((task) => {
        createTask(task);
    })
};

updateTaskCount();
renderInitial();

taskBtn.addEventListener("click", event => { //show input when lcick on new task
    taskBtn.classList.add("hide");
    input.toggleAttribute("hidden",false);
    
})



input.addEventListener("change", event => { //add tasks
    const taskContent=event.target.value;
    createTask(taskContent);
    event.target.value="";

    //nakraq
    taskBtn.classList.remove("hide");
    input.toggleAttribute("hidden",true);
})

taskList.addEventListener("change", event => { //checking an item
    const checkbox=event.target;
    const taskText=checkbox.parentElement.querySelector(".task-content");
    const txtContent=taskText.textContent.trim();
    
    taskText.classList.toggle("txt-checked",checkbox.checked);
    taskText.parentElement.classList.toggle("done",checkbox.checked);
    
    storage.setItem(txtContent, checkbox.checked);
    updateTaskCount();
});

taskList.addEventListener("click", event => { //delete an item
    if(event.target.classList.contains("btn-del")){
        const li=event.target.parentElement;
        const ul=li.parentElement;
        const taskTxt = li.querySelector("span").textContent.trim();
        ul.removeChild(li);
        storage.removeItem(taskTxt);
        updateTaskCount();
    }
    
});

//filtering:
const allBtn=document.getElementById("filterAll");
const activeBtn=document.getElementById("filterActive");
const completedBtn=document.getElementById("filterCompleted");

allBtn.addEventListener("click", event => { //show all
    const tasks=taskList.querySelectorAll("li");
    tasks.forEach((task)=> {
        task.classList.remove("hide");
    });
});

activeBtn.addEventListener("click", event => { //show active tasks

    const tasks=taskList.querySelectorAll("li");
    tasks.forEach((task)=> {
        task.classList.toggle("hide",task.classList.contains("done"));
    });
});

completedBtn.addEventListener("click", event => { //show completed tasks
    const tasks=taskList.querySelectorAll("li");
    tasks.forEach((task)=> {
        task.classList.toggle("hide",!(task.classList.contains("done")));
    });
});