document.querySelector(".add").addEventListener("click", () => {
  const val = document.querySelector("#task").value.trim();
  if (!val) return;

  // ✅ Check: If delete all button is not available
  let delAllBtn = document.querySelector(".del-all");
  if (!delAllBtn) {
    delAllBtn = document.createElement("button");
    delAllBtn.textContent = "Delete All Tasks";
    delAllBtn.classList.add("del-all", "btn");
    document.querySelector(".sec-container").appendChild(delAllBtn);

    // delete button for all tasks
    delAllBtn.addEventListener("click", () => {
      document.querySelector("#todo").innerHTML = "";
      delAllBtn.remove();
    });
  }

  //Parent container
  const todo = document.querySelector("#todo");

  // Wrapper div :- tasktext + button
  const wrapper = document.createElement("div");
  wrapper.classList.add("task-wrapper");

  // Task text (p tag)
  const tasktext = document.createElement("p");
  tasktext.classList.add("task");

  // word trimming logic
  const words = val.split(/\s+/);
  const showlimit = 10;
  const needstrim = words.length > showlimit;

  tasktext.dataset.full = val;

  // Trimmed vs full text
  if (needstrim) {
    const firstten = words.slice(0, showlimit).join(" ");
    tasktext.textContent = firstten + " ...";
    tasktext.dataset.trimmed = firstten + " ...";
  } else {
    tasktext.textContent = val;
  }

  tasktext.classList.add("task");

  // Expand/Collapse on click , toggle
  tasktext.addEventListener("click", function () {
    if (this.textContent.endsWith(" ...")) {
      this.textContent = this.dataset.full;
    } else if (needstrim) {
      this.textContent = this.dataset.trimmed;
    }
  });

  function checkAndRemoveDeleteAll() {
    const allTasks = document.querySelector("#todo").children.length;
    const delAllBtn = document.querySelector(".del-all");
    if (allTasks === 0 && delAllBtn) {
      delAllBtn.remove();
    }
  }

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", () => {
    wrapper.remove(); // Remove that specific task item
    checkAndRemoveDeleteAll();
  });

  // Edit Button
  const edit = document.createElement("button");
  edit.textContent = "Edit";
  edit.classList.add("edit");

  // edit.addEventListener("click", () => {
  //   document.querySelector("#task").value = tasktext.dataset.full;
  //   wrapper.remove();
  // });

  let isEditing = false;

  edit.addEventListener("click", () => {
    if (!isEditing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = tasktext.dataset.full;
      input.classList.add("edit-input");

      wrapper.replaceChild(input, tasktext);
      edit.textContent = "Save";
      isEditing = true;

      edit.onclick = () => {
        const updatedVal = input.value.trim();
        if (!updatedVal) return;

        const updatedWords = updatedVal.split(/\s+/);
        const updatedTrimmed =
          updatedWords.length > showlimit
            ? updatedWords.slice(0, showlimit).join(" ") + " ..."
            : updatedVal;

        tasktext.textContent = updatedTrimmed;
        tasktext.dataset.full = updatedVal;
        tasktext.dataset.trimmed = updatedTrimmed;

        wrapper.replaceChild(tasktext, input);
        edit.textContent = "Edit";
        isEditing = false;
      };
    }
  });

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("complete-check");

  // On checking, apply line-through
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      tasktext.style.textDecoration = "line-through";
      tasktext.style.color = "gray";
    } else {
      tasktext.style.textDecoration = "none";
      tasktext.style.color = "black";
    }
  });

  // Add to wrapper before tasktext
  wrapper.prepend(checkbox);

  // task timestamp
  const timestamp = document.createElement("small");
  let div = new Date();
  timestamp.textContent = div.toLocaleString(); // show time and date
  timestamp.classList.add("timestamp");

  wrapper.appendChild(timestamp);

  // Assemble & add to DOM
  todo.appendChild(wrapper);
  wrapper.appendChild(tasktext);
  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(edit);

  document.querySelector("#task").value = "";
});

// cancel button used on input
document.querySelector(".cancel").addEventListener("click", function () {
  document.querySelector("#task").value = "";
});
