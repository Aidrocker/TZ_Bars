///DOM
const form = document.getElementById("form"),
  root = document.querySelector(".root"),
  addButton = document.querySelector("#addBtn"),
  table = document.querySelector(".root_table"),
  nameInput = document.getElementById("full_name"),
  addressInput = document.getElementById("address"),
  phoneInput = document.getElementById("phone"),
  cancelBtn = document.getElementById("cancel"),
  saveBtn = document.getElementById("save");

const apiUrl = "../data/Ipu.json";
const isData = localStorage.getItem("data");

let currentRowIndex = null;
let currentItem = {};
let items = [];
let isNewObject = false;
let id = 5;


if (isData) {
  items = JSON.parse(localStorage.getItem("data"));
  createTable();
} else if (!isData) {
  loadData();
  items = JSON.parse(localStorage.getItem("data"));
  createTable();
}

function loadData() {
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      items = data;
      localStorage.setItem("data", JSON.stringify(items));
    });
}

function createTable() {
  const table = document.createElement("table");
  root.appendChild(table);
  table.innerHTML = `
        <thead>
            <th>Название</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th></th>
            <th></th>
        </thead>
    `;
  items.forEach((item) => {
    const trEl = document.createElement("tr");
    table.appendChild(trEl);
    drawTableRow(item, table, trEl, () => {});
  });
}

function drawTableRow(item, table, trEl, callback) {
  trEl.innerHTML = `
        <tr>
            <td>${item.full_name}</td>
            <td>${item.address}</td>
            <td>${item.phone}</td>
            <td><button class="change"  id="changeBtn"><img src="../public/img/change.jpg" alt=""></button></td>
            <td><button  class = "delete" id="delBtn"><img src="../public/img/trash.jpg" alt=""></button></td>
        </tr>
        `;
  callback();
  const delBtn = trEl.querySelector(".delete");
  const changeBtn = trEl.querySelector(".change");

  delBtn.addEventListener("click", () => {
    items.splice(trEl.rowIndex - 1, 1);
    localStorage.setItem("data", JSON.stringify(items));
    table.removeChild(trEl);
  });

  changeBtn.addEventListener("click", () => {
    isNewObject = false;
    form.style.display = "block";
    currentRowIndex = trEl.rowIndex;
    currentItem = item;
    showForm(item);
  });
}

addButton.addEventListener("click", () => {
  isNewObject = true;
  form.style.display = "block";
});

saveBtn.addEventListener("click", (event) => {
  if (isNewObject) {
    //create item
    let item = {
      id: ++id,
      full_name: nameInput.value,
      address: addressInput.value,
      phone: phoneInput.value,
    };

    //add new item to array
    items.push(item);

    //add updated array to localStorage
    localStorage.setItem("data", JSON.stringify(items));

    //render table
    createTable();

  } else if(!isNewObject){

    //update old item
    updateRow(currentRowIndex, currentItem);

  }
});

cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
});

function updateRow(indexRow, item) {
  console.log(indexRow);
  //take old information from old item
  item.full_name = nameInput.value;
  item.address = addressInput.value;
  item.phone = phoneInput.value;
  //

  //update old item in array
  console.log("updateItem", isNewObject);
  const index = items.findIndex((el) => el.id -1 === item.id);
  items[index] = item;
  localStorage.setItem("data", JSON.stringify(items));

  //render updated array
  console.log("create updated table", isNewObject);
  // table.rows[indexRow].innerHTML = '';
  drawTableRow(item, table.rows[indexRow], () => {
    console.log("изменен");
  });
}

function showForm(item) {
  form.style.display = "block";
  nameInput.value = item.full_name;
  addressInput.value = item.address;
  phoneInput.value = item.phone;
}


