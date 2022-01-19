const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
const button = document.querySelector(".btn.btn-primary");

// HTML template for list.
const getArray = (element, index) => {
  displayHtml = `<li  class="list-group-item d-flex justify-content-between align-items-center">
  <span>${element}</span><i class="far fa-trash-alt delete" onclick="deleteTask(${index})"></i></li>`;
};

const getLocalStorage = () => {
  let getLocalStorage = localStorage.getItem("Saved Entries");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
};

// Read values from local storage on load & display them on the list.
window.onload = function () {
  const listArr = JSON.parse(localStorage.getItem("Saved Entries"));

  listArr.forEach((element, index) => {
    getArray(element, index);
    displayData(displayHtml);
  });
};

// View function - updating list.
const displayData = (displayHtml) => {
  list.innerHTML += displayHtml;
};

// Adding & checking if typed value meets all requirements.
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = addForm.add.value.trim().toLowerCase();

  if (userData.length) {
    addEntry(userData);
    addForm.reset();
  }
});

// Pushing entry to tthe local storage.
const addEntry = (userData) => {
  getLocalStorage();
  listArr.push(userData);
  localStorage.setItem("Saved Entries", JSON.stringify(listArr));
  displayEntries();
};

// Adding newly added task to the users screen.
function displayEntries() {
  getLocalStorage();
  listArr.forEach((element, index) => {
    getArray(element, index);
  });
  displayData(displayHtml);
}

// Deleting task from local storage.
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("Saved Entries");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("Saved Entries", JSON.stringify(listArr));
}

// Deleting / updating the list.
list.addEventListener("click", (e) => {
  // checking if the entry has a delete class / icon. if so only then the function will be fired.
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Search functionality
const filterTodos = (term) => {
  // Adding filtering class on search.
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  // Removing filtered class on search.
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

search.addEventListener("keypress", function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    e.preventDefault();
    return false;
  }
});
