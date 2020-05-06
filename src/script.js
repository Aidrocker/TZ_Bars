import {Http, createElement} from './http.js';

const tableEl = document.querySelector('.table');
const addButton = document.querySelector('.addBtn');
const inputFullName =  document.getElementById('add_full_name');
const inputAddress = document.getElementById('add_address');
const inputPhoneNumber = document.getElementById('phoneNumber');

let arr = [];
let page = 1;


async function loadData() {
    try{
        const http = new Http('./json/Ipu.json');
        const response = await http.getAll();
        const institutions = await response.json();

        institutions.forEach((institution) => {
            arr.push(institution);
            localStorage.setItem('todo',JSON.stringify(institutions));
            console.log(arr);
        });
    }
    catch (e) {
    }
    displayMessage();
}

addButton.addEventListener('click', ()=>{
    let newInstitution = {
        full_name: inputFullName.value,
        address: inputAddress.value,
        phone: inputPhoneNumber.value
    };
    const element  = createElement(newInstitution);
    tableEl.appendChild(element);
    localStorage.setItem('todo', JSON.stringify(newInstitution));
    arr.push(element);
    displayMessage();


});


function displayMessage() {
    arr.forEach((item)=>{
        const element = createElement(item);
        tableEl.appendChild(element);
    })
}
loadData();

