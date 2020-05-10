
///DOM
const form = document.getElementById('form'),
    root = document.querySelector('.root') ,
    addButton = document.querySelector('.form_addBtn'),
    table = document.querySelector('.root_table'),
    nameInput = document.getElementById('full_name'),
    addressInput = document.getElementById('address'),
    phoneInput = document.getElementById('phone');
//end DOM

const apiUrl = './json/Ipu.json';
let items = [];
let isNew = false;
let id = 5;
const isData = localStorage.getItem('data');

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
        console.log('before',items);
        items.splice(trEl.rowIndex - 1, 1);

        console.log('after',items);

        localStorage.setItem('data', JSON.stringify(items));

        console.log('local',localStorage.getItem('data', JSON.stringify('items')));
        table.removeChild(trEl);
    });
}

addButton.addEventListener('click', ()=>{
    isNew = true;
    form.style.display = 'block';
    const cancelBtn = document.getElementById('cancel');
    const saveBtn = document.getElementById('save');

    saveBtn.addEventListener('click', ()=>{
        let item = {
            id: ++id,
            full_name : nameInput.value,
            address: addressInput.value,
            phone: phoneInput.value
        };
        items.push(item);
        localStorage.setItem('data', JSON.stringify(items));
        createTable();
    });

    cancelBtn.addEventListener('click', ()=>{
        form.style.display = 'none';

    })
});









