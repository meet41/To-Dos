class App {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('Tasklist')) || [];
    console.log("Retrieve Tasks : ",this.tasks);
    this.name = "";
    this.desc = "";
    this.id = "";
      
    this.$Tasklist = document.querySelector("#Tasklist");
    this.$form = document.querySelector("#form");
    this.$Tasks = document.querySelector("#Tasklist");
    this.$delete = document.querySelector(".task-delete")
    this.$taskname = document.querySelector("#taskname");
    this.$taskdes = document.querySelector("#taskdes");
    this.$formBtn = document.querySelector("#form-buttons");
    this.$update = document.querySelector(".update");
    this.$updateTitle = document.querySelector(".update-title");
    this.$updateDesc = document.querySelector(".update-desc");
    this.$updateclosebtn = document.querySelector("#update-close-btn");
    this.$newtitle = document.querySelector(".task-title");

    this.saveTasks();
    this.render();
    this.addEventListeners();
  }
    // function to be perform
    addEventListeners() {
      document.body.addEventListener("click", event => {
        this.handleFormClick(event);
        this.selectTask(event);
        this.deleteTask(event);
        this.openModal(event);
      });
  
      this.$form.addEventListener("SUBMIT", event => {
        event.preventDefault();
        const name = this.$taskname.value;
        const desc = this.$taskdes.value;
        const hasTask = name || desc;
        if (hasTask) 
          // func to add task 
          this.addTask({ name, desc });
        
      });
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$formBtn.contains(event.target);
      const name = this.$taskname.value;
      const desc = this.$taskdes.value;
      const hasTask = name || desc;
  
      if(name && desc){
        if(isFormClicked){
          this.addTask({ name, desc });
          name = this.$taskname.value="";
          desc = this.$taskdes.value="";
        }
      }
    }
  
    closeForm() {
      this.$form.classList.remove("form-open");
      this.$taskname.style.display = "none";
      this.$taskdes.style.display = "none";
      this.$formButtons.style.display = "none";
      this.$taskname.value = "";
      this.$taskdes.value = "";
    }
    // Function to add task
    addTask({ name, desc }) {
      const newTask = {
        name,
        desc,
        id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1
      };
      this.tasks = [...this.tasks, newTask];
      this.render();
    }

    selectTask(event) {
      const $selectedTask = event.target.closest(".task");
      if (!$selectedTask) return;
      const [$taskname, $taskdes] = $selectedTask.children;
      this.name = $taskname.innerText;
      this.desc = $taskdes.innerText;
      this.id = $selectedTask.dataset.id;
    }
    // delete task from list
    deleteTask(event) {
      event.stopPropagation();
      if (!event.target.matches('.task-delete')) return;
      const id = event.target.dataset.id;
      this.tasks = this.tasks.filter(task => task.id !== Number(id));
      this.render();
    }
    // function use to save & display tasks
    render() {
      this.saveTasks();
      this.displayTasks();  
    }
    // saving task to localstorage
    saveTasks() {
      localStorage.setItem('Tasklist', JSON.stringify(this.tasks))  
    }
    // display tasklist
 displayTasks() {
  const hasTask = this.tasks.length > 0;
  this.$Tasklist.style.display = hasTask ? "flex" : "none";

  this.$Tasklist.innerHTML = this.tasks
    .map(
      task => `
      <div class="task-list">
        <div class="task-name">
        ${task.name}
        </div>
        <div class="task-desc">
        ${task.desc}
        <div class="tools">
        <i style="font-size: 15px;margin:4px;align-items: center;justify-content: center;display:flex;height:fit-content;" class="task-delete fas fa-trash-alt" data-id="${task.id}"></i>
        </div>
        </div>
      </div>
    `
    )
    .join("");
}
}

new App();
