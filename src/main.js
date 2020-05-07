const form = document.getElementById('form');
const root = document.getElementById('root');
const addButton = document.querySelector('.form_addBtn');
const apiUrl = './json/Ipu.json';
const table = document.createElement('table');

let items = [];
let currentRowIndex = null;
let currentItem = {};
let isNew = false;


function getData(success) {
    const data = localStorage.getItem('data');

    if(data === null){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}`);
        xhr.addEventListener('load', () =>{
            items = JSON.parse(xhr.responseText);
            success(items);
        });
        xhr.send();
    }
    items = JSON.parse(data);
    success(items);
}

function addItem(full_name, address, phone, callback) {
    const temp_arr = [...items];
    temp_arr.sort((a, b) => b.id - a.id);
    const id = Number(temp_arr[0].id) + 1;

    const item = {id:String(id), full_name, address, phone};
    items.push(item);
    saveItems();
    callback(item);
}

function deleteItem(index) {
    items.splice(index, 1);
    saveItems();
}

function upDateItem(item) {
    const index = items.findIndex(el => el.id === item.id);
    items[index]  = item;
    saveItems()
}

function saveItems() {
    localStorage.setItem('data', JSON.stringify(items));
}


function init() {
    root.appendChild(table);

    form.elements.cancel.addEventListener('click', (e) =>{
        console.log(form.elements);
        e.preventDefault();
        form.style.display = 'none';
        form.full_name.value =
            form.phone.value = '';
        currentRowIndex = null;
        currentItem = {};
    });

    form.elements.enter.addEventListener('click', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        isNew ? addNewItem() : upDateRow(currentRowIndex, currentItem);
    });

    addButton.addEventListener('click', () =>{
        isNew = true;
        showForm({
            full_name: '',
            address: '',
            phone: ''
        });
    });

    onloadData();
}

function onloadData() {
    getData(items =>{
        showTable(items);
    })
}


function showTable(items) {

    table.innerHTML = `
        <thead>
            <th>Название</th>
            <th>Адресс</th>
            <th>Телефон</th>
            <th></th>
            <th></th>
        </thead>
    `;
    items.map(item => {
        const tRow = document.createElement('tr');
        table.appendChild(tRow);
        drawTableRow(item, tRow, () => {})
    })
}

function drawTableRow(item, tRow, callback) {
    const {full_name,address, phone} = item;

    tRow.innerHtml = `
        <td>${full_name}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td><button id="upButton"><img src="../img/change.jpg" alt="Change" height="20px"></button></td>
        <td><button id="delButton"><img src="../img/trash.jpg" alt="Trash" height="20px"></button></td>
       
    `;
    callback();

    const upButton = tRow.getElementById('upButton');
    const delButton = tRow.getElementById('delButton');

    upButton.addEventListener('click', () =>{
        isNew = false;
        currentRowIndex = tRow.rowIndex;
        currentItem = item;
        showForm(item);
    });

    delButton.addEventListener('click', ()=>{
        form.style.display = 'none';
        const choice  = confirm('Удалить обькт?');
        if(choice){
            deleteItem(tRow.rowIndex);
            table.removeChild(tRow)
        }
    })
}

function showForm(item) {
    form.style.display = 'block';

    form.elements.full_name.value = item.full_name;
    form.elements.address.value = item.address;
    form.elements.phone.value = item.phone;
}


function addNewItem() {
    addItem(
        form.full_name.value,
        form.address.value,
        form.phone.value,
        item =>{
            const tRow = document.createElement('tr');
            table.appendChild(tRow);
            drawTableRow(item, tRow, () =>{
                alert('Обьект добавлен!')
            });
        }
    )
}

function upDateRow(index, item) {
    item.full_name = form.elements.full_name.value;
    item.address = form.elements.address.value;
    item.phone = form.elements.phone.value;


    upDateItem(item);

    table.rows[index].innerHTML = '';
    drawTableRow(item,table.rows[index], ()=>{
        alert('Обьект обновлен!')
    })
}


init();