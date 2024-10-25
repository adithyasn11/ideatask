document.getElementById('task')?.addEventListener('keyup', function (event: KeyboardEvent) {
    if (event.key === 'Enter') {
        const addButton = document.getElementById('add-btn') as HTMLButtonElement;
        addButton.click();
    }
});

function addTask(): void {
    const taskInput = document.getElementById('task') as HTMLInputElement;
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const ul = document.getElementById("task-list") as HTMLUListElement;

    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "mb-4", "text-lg", "border", "border-gray-300", "rounded-md", "p-2", "w-full", "text-left");

    const taskRow = document.createElement("div");
    taskRow.classList.add("flex", "w-full", "items-center");

   
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-3", "mt-1");
    checkbox.onclick = updateTaskCount;

    const label = document.createElement("label");
    label.innerHTML = taskText;
    label.classList.add("flex-grow", "break-words");

   
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("bg-red-600", "text-white", "px-2", "py-1", "rounded-md", "ml-2", "hover:bg-red-700");

    
    deleteButton.onclick = function (): void {
        ul.removeChild(li); 
        updateTaskCount();
    };

   
    taskRow.appendChild(checkbox);
    taskRow.appendChild(label);
    taskRow.appendChild(deleteButton);

   
    li.appendChild(taskRow);

    
    ul.appendChild(li);

   
    taskInput.value = "";

    
    updateTaskCount();
}

function updateTaskCount(): void {
    const tasks = document.querySelectorAll("#task-list li");
    const completedTasks = document.querySelectorAll("#task-list input[type='checkbox']:checked");

    const completedCount = document.getElementById("completed-count") as HTMLElement;
    const incompleteCount = document.getElementById("incomplete-count") as HTMLElement;

   
    completedCount.innerHTML = completedTasks.length.toString();
    incompleteCount.innerHTML = (tasks.length - completedTasks.length).toString();
}

export {};
