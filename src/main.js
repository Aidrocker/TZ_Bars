///DOM
const form = document.getElementById('form'),
    root = document.getElementById('root') ,
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


if(localStorage.getItem('data')){
    items = JSON.parse(localStorage.getItem('data'));
    createTable();
}else{
    loadata();
}

function loadata (){
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
    console.log(items);
    items.forEach((item) =>{
        const trEl = document.createElement('tr');
        const { id,full_name, address, phone} = item;
        const elem =
            `
        <tr>
            <td>${full_name}</td>
            <td>${address}</td>
            <td>${phone}</td>
            <td><button class="change" id="${id}">Изменить</button></td>
            <td><button class="delete" id="${id}">Удалить</button></td>
        </tr>
        `;
        trEl.innerHTML = elem;
        table.appendChild(trEl);

    });
    const changeBtn = document.getElementById('change');
    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener('click', (event)=>{
        console.log(items);
    });



}

addButton.addEventListener('click', ()=>{
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









