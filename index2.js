const allCount = document.getElementById('all-count')
const completeCount = document.getElementById('completed-count')
const activeCount = document.getElementById('active-count')
const addBtn = document.getElementById("add-btn");
const activeBtn = document.querySelector('.active-btn')
const completeBtn = document.querySelector('.complete-btn')
const allBtn = document.querySelector('.active')
const taskList = document.getElementById("task-list");
const input = document.getElementById("task-input");
const emptyState = document.getElementById("empty-state")

let tasks = []
const savedTasks = localStorage.getItem("tasks");

if(savedTasks){
    tasks = JSON.parse(savedTasks);
}

for (const task of tasks) {
    createTask(task);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount () {
    const totalTasks = taskList.children.length;
    const completedTasks = document.querySelectorAll('.completed').length;
    const activeTasks = totalTasks - completedTasks;
    allCount.textContent = `All (${totalTasks})`;
    completeCount.textContent = `Completed (${completedTasks})`
    activeCount.textContent = `Active (${activeTasks})`

    if(totalTasks == 0){
        emptyState.style.display = '';
    }else{
        emptyState.style.display = 'none';
    }
    
}

function setActiveTab(clickedTab) {
    const currentActive = document.querySelector('.tab.active');

    if (currentActive) {
        currentActive.classList.remove('active');
    }

    clickedTab.classList.add('active');
}

function createTask(task){
    if(task == ""){
        // alert("Please add something in the text box....")
        return
    }


    const li = document.createElement('li')
    li.classList.add('task-enter');
    li.textContent = task;

    li.innerHTML = `
        <input type='checkbox' class='check-btn'>
        <span class="task-text">${task.text}</span>       
        <button class='del-btn btn btn-outline-danger'>Delete</button>        
    `    

    const checkBtn = li.querySelector('.check-btn')
    const deleteBtn = li.querySelector('.del-btn')
    const taskTextElement = li.querySelector('.task-text');

    if(task.completed){
        checkBtn.checked = true;
        taskTextElement.classList.add("completed");
    }
    
   deleteBtn.addEventListener("click", ()=>{

    const index = tasks.indexOf(task);

    if(index !== -1){
        tasks.splice(index, 1);
        saveTasks();
    }

    li.remove();
    updateCount();

})

console.log(tasks);
    checkBtn.addEventListener('change', ()=>{
        task.completed = checkBtn.checked;

        saveTasks();


        if(checkBtn.checked){
           taskTextElement.classList.add("completed");
        }else{
            taskTextElement.classList.remove("completed");
        }

        updateCount();
    })


    taskList.appendChild(li)
    setTimeout(() => {
    li.classList.add('task-show');
}, 10);
    input.value=""

    updateCount();


}

addBtn.addEventListener("click", () =>{
        const taskText = input.value.trim();

    if(taskText === ""){
        alert("Please add something in the text box....");
        return;
    }


    const newTask = {
        text : taskText,
        completed : false
    }
    tasks.push(newTask);
    
    saveTasks();
    createTask(newTask);
   
})

activeCount.addEventListener("click", ()=>{

    setActiveTab(activeBtn);
    for (const task of taskList.children){
       
        const taskTextElement = task.querySelector('.task-text');

        if(taskTextElement.classList.contains("completed")){
            task.style.display = "none";
        }else{
            task.style.display = "";
        }
    }
})



allBtn.addEventListener("click", ()=>{

      setActiveTab(allBtn);
    for (const task of taskList.children){
         task.style.display = "";
    }
})

completeBtn.addEventListener("click", ()=>{
    setActiveTab(completeBtn);
    for (const task of taskList.children){
        const taskTextElement = task.querySelector('.task-text');

        if(taskTextElement.classList.contains("completed")){
            task.style.display = "";
        }else{
            task.style.display = "none";
        }

    }
})
