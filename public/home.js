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
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-3", "mt-1");
    checkbox.onclick = updateTaskCount;
    var label = document.createElement("label");
    label.innerHTML = taskText;
    label.classList.add("flex-grow", "break-words");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("bg-red-600", "text-white", "px-2", "py-1", "rounded-md", "ml-2", "hover:bg-red-700");
    deleteButton.onclick = function () {
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
function updateTaskCount() {
    var tasks = document.querySelectorAll("#task-list li");
    var completedTasks = document.querySelectorAll("#task-list input[type='checkbox']:checked");
    var completedCount = document.getElementById("completed-count");
    var incompleteCount = document.getElementById("incomplete-count");
    completedCount.innerHTML = completedTasks.length.toString();
    incompleteCount.innerHTML = (tasks.length - completedTasks.length).toString();
}
