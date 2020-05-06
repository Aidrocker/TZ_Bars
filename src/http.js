export class Http {
    constructor(url) {
        this.url = url;
    }

    getAll(){
        return fetch(this.url)
    }
}

export  function createElement(element) {
    const {full_name, address, phone} = element;
    const divEl = document.createElement('div');
    divEl.className = 'table_row';

    divEl.innerHTML = `
            <div class = "table_cell">${full_name}</div>
            <div class = "table_cell">${address}</div>
            <div class = "table_cell">${phone}</div>
            <button class="remove">Remove</button>
            `;

    return divEl;
}