// import Ipu from '../json/Ipu.json';
///DOM
const form = document.getElementById('form'),
    root = document.querySelector('.root') ,
    addButton = document.querySelector('.form_addBtn'),
    table = document.querySelector('.root_table'),
    nameInput = document.getElementById('full_name'),
    addressInput = document.getElementById('address'),
    phoneInput = document.getElementById('phone');
const cancelBtn = document.getElementById('cancel');
const saveBtn = document.getElementById('save');
//end DOM
const apiUrl = './json/Ipu.json';
const isData = localStorage.getItem('data');

let currentRowIndex = null;
let currentItem = {};
let items = [];
let isNewObject = false;
let id = 5;


if (isData){
     items = JSON.parse(localStorage.getItem('data'));
    createTable();
}else if(!isData){
    loadData();
     items = JSON.parse(localStorage.getItem('data'));
    createTable();
}

function loadData (){
    fetch(apiUrl)
        .then((response) => {
        return response.json();
    })
        .then((data) =>{
            items = data;
            localStorage.setItem('data', JSON.stringify(items));
        })
}

function createTable() {
    const table = document.createElement('table');
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
    items.forEach((item) =>{
        const trEl = document.createElement('tr');
        table.appendChild(trEl);
        drawTableRow(item,table, trEl, ()=>{});
    });
}

function drawTableRow(item,table, trEl, callback){

    trEl.innerHTML =`
        <tr>
            <td>${item.full_name}</td>
            <td>${item.address}</td>
            <td>${item.phone}</td>
            <td><button class="change"  id="changeBtn">Изменить</button></td>
            <td><button  class = "delete" id="delBtn">Удалить</button></td>
        </tr>
        `;
    callback();
    const delBtn = trEl.querySelector('.delete');
    const changeBtn = trEl.querySelector('.change');

    delBtn.addEventListener('click', () =>{
        items.splice(trEl.rowIndex - 1, 1);
        localStorage.setItem('data', JSON.stringify(items));
        table.removeChild(trEl);
    });

    changeBtn.addEventListener('click', ()=>{
        isNewObject = false;
        form.style.display = 'block';
        currentRowIndex = trEl.rowIndex;
        currentItem = item;
        showForm(item);
    })
}

addButton.addEventListener('click', ()=>{
    isNewObject = true;
    form.style.display = 'block';
});

saveBtn.addEventListener('click', ()=>{
    if(isNewObject){
        let item = {
            id: ++id,
            full_name : nameInput.value,
            address: addressInput.value,
            phone: phoneInput.value
        };
        items.push(item);
        localStorage.setItem('data', JSON.stringify(items));
        createTable()
    }else{
        console.log(isNewObject);
        updateRow(currentRowIndex, currentItem);
    }
});

cancelBtn.addEventListener('click', ()=>{
    form.style.display = 'none';
});

function updateRow(index, item) {
    console.log('updateRow',isNewObject);
    item.full_name = nameInput.value;
    item.address = addressInput.value;
    item.phone = phoneInput.value;

    updateItem(item);

    table.rows[index].innerHTML = '';
    drawTableRow(item, table.rows[index],()=>{
        console.log('изменен');
    })
}

function showForm(item) {
    form.style.display = 'block';
    nameInput.value = item.full_name;
    addressInput.value = item.address;
    phoneInput.value = item.phone;
}

function updateItem(item) {
    console.log('updateItem',isNewObject);
    const index = items.findIndex(el => el.id === item.id);
    items[index] = item;
    localStorage.setItem('data', JSON.stringify(items));
}









