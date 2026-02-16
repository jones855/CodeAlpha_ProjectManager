const projectsDiv = document.getElementById("projects");

function createProject() {
  fetch("http://localhost:5000/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: projectName.value
    })
  })
  .then(res => res.json())
  .then(() => {
    projectName.value = "";
    loadProjects();
  });
}

function loadProjects() {
  fetch("http://localhost:5000/api/projects")
    .then(res => res.json())
    .then(data => {
      projectsDiv.innerHTML = "";

      data.forEach(p => {
        const div = document.createElement("div");
        div.className = "project";
        div.innerText = p.name;

        div.addEventListener("click", () => {
          localStorage.setItem("projectId", p._id);
          window.location.href = "board.html";
        });

        projectsDiv.appendChild(div);
      });
    });
}

loadProjects();
