const input    = document.querySelector("#task-input")
const addBtn   = document.querySelector("#add-btn")
const taskList = document.querySelector("#task-list")
const tabs     = document.querySelectorAll(".tab")

let tasks = []

//BUTTON CLICK 
addBtn.addEventListener("click", function() {
    addTask()
})

//ENTER KEY
input.addEventListener("keypress", function(e) {   // ✅ fixed typo
    if (e.key === "Enter") {
        addTask()
    }
})

//  ADD TASK FUNCTION
function addTask() {
    const taskText = input.value.trim()

    if (taskText === "") {
        alert("Please type a task first!")
        return
    }

    const newTask = {
        text: taskText,
        completed: false
    }
    tasks.push(newTask)

    input.value = ""

    renderTasks()
    updateTabCounts()
}

//RENDER TASKS 
function renderTasks() {
    taskList.innerHTML = ""

    tasks.forEach(function(task, index) {
        const li = document.createElement("li")
        li.classList.add("task-item")

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox"
            ${task.completed ? "checked" : ""}>
            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
            <button class="delete-btn" data-index="${index} ">Delete</button>
        `

        // grab checkbox inside this li
        const checkbox = li.querySelector(".task-checkbox")

        // update array when checkbox is clicked
        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked
            renderTasks()
            updateTabCounts()
        })

        taskList.appendChild(li)   // moved outside checkbox listener
    })                             // closes forEach
}                                  // closes renderTasks

// ── UPDATE TAB COUNTS ──────────────────────────────────
function updateTabCounts() {
    const totalTasks     = tasks.length
    const completedTasks = tasks.filter(task => task.completed === true).length
    const activeTasks    = tasks.filter(task => task.completed === false).length

    document.querySelector("[data-filter='all']").textContent       = `All (${totalTasks})`
    document.querySelector("[data-filter='active']").textContent    = `Active (${activeTasks})`
    document.querySelector("[data-filter='completed']").textContent = `Completed (${completedTasks})`
}

