const socket = io("http://localhost:5000");
const tasksDiv = document.getElementById("tasks");
const projectId = localStorage.getItem("projectId");

if (!projectId) {
  alert("No project selected");
  window.location.href = "dashboard.html";
}

function loadUsers() {
  fetch("http://localhost:5000/api/users")
    .then(res => res.json())
    .then(users => {
      assignee.innerHTML = "";
      users.forEach(u => {
        assignee.innerHTML += `<option value="${u._id}">${u.name}</option>`;
      });
    });
}

function createTask() {
  fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      project: projectId,
      assignedTo: assignee.value
    })
  }).then(() => {
    title.value = "";
  });
}

function loadTasks() {
  fetch(`http://localhost:5000/api/tasks?project=${projectId}`)
    .then(res => res.json())
    .then(tasks => {
      tasksDiv.innerHTML = "";

      tasks.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h4>${t.title}</h4>
          <p><strong>Assigned:</strong> ${t.assignedTo ? t.assignedTo.name : "None"}</p>

          <input placeholder="Add comment" id="c${t._id}">
          <button onclick="addComment('${t._id}')">Comment</button>

          <div>
            ${(t.comments || []).map(c =>
              `<div class="comment">${c.text}</div>`
            ).join("")}
          </div>
        `;

        tasksDiv.appendChild(card);
      });
    });
}

function addComment(taskId) {
  const text = document.getElementById("c" + taskId).value;

  fetch(`http://localhost:5000/api/tasks/${taskId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      user: localStorage.getItem("userId"),
      task: taskId
    })
  });
}

socket.on("taskCreated", loadTasks);
socket.on("commentAdded", loadTasks);

loadUsers();
loadTasks();
