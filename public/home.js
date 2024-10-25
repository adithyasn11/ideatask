"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = document.getElementById('task')) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        var addButton = document.getElementById('add-btn');
        addButton.click();
    }
});
function addTask() {
    var taskInput = document.getElementById('task');
    var taskText = taskInput.value;
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }
    var ul = document.getElementById("task-list");
    var li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "mb-4", "text-lg", "border", "border-gray-300", "rounded-md", "p-2", "w-full", "text-left");
    var taskRow = document.createElement("div");
    taskRow.classList.add("flex", "w-full", "items-center");
    // Checkbox for task completion
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-3", "mt-1");
    checkbox.onclick = updateTaskCount;
    // Task label
    var label = document.createElement("label");
    label.innerHTML = taskText;
    label.classList.add("flex-grow", "break-words");
    // Delete button to remove the task
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("bg-red-600", "text-white", "px-2", "py-1", "rounded-md", "ml-2", "hover:bg-red-700");
    // Deleting the li element when delete button is clicked
    deleteButton.onclick = function () {
        ul.removeChild(li); // Correctly reference the li element
        updateTaskCount();
    };
    // Append the checkbox, label, and delete button to taskRow
    taskRow.appendChild(checkbox);
    taskRow.appendChild(label);
    taskRow.appendChild(deleteButton);
    // Append the taskRow to the li element
    li.appendChild(taskRow);
    // Add the li element to the ul (task list)
    ul.appendChild(li);
    // Clear the input field after adding the task
    taskInput.value = "";
    // Update the task count after adding a task
    updateTaskCount();
}
function updateTaskCount() {
    var tasks = document.querySelectorAll("#task-list li");
    var completedTasks = document.querySelectorAll("#task-list input[type='checkbox']:checked");
    var completedCount = document.getElementById("completed-count");
    var incompleteCount = document.getElementById("incomplete-count");
    // Update the counts for completed and incomplete tasks
    completedCount.innerHTML = completedTasks.length.toString();
    incompleteCount.innerHTML = (tasks.length - completedTasks.length).toString();
}
