const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const result = document.querySelector('#result');
const btnSubmit = document.querySelector('#form input[type="submit"]');

let dataBase = [];
let editing = false;

const objSubmit = {
    name: '',
    lastName: '',
    email: '',
    message: ''
}

document.addEventListener('DOMContentLoaded', () => {
    addEventListener();
    dataBase = JSON.parse(localStorage.getItem('dataBase')) || [];
    printHTML();
});

function addEventListener() {
    form.addEventListener('submit', validateForm)
    nameInput.addEventListener('change', fillObject)
    lastNameInput.addEventListener('change', fillObject)
    emailInput.addEventListener('change', fillObject)
    messageInput.addEventListener('change', fillObject)
}

function fillObject(e) {
    objSubmit[e.target.name] = e.target.value.trim();
}

function printAlert(message, type) {
    const exist = document.querySelector('.alert');
    if(!exist) {
        const alert = document.createElement('DIV');
        alert.classList.add('alert');
        if(type) {
            alert.classList.add('error');
        } else {
            alert.classList.add('success');
        }
        alert.textContent = message
        form.insertBefore(alert, btnSubmit);
        setTimeout(() => {
            alert.remove();
        }, 2500);
    }
}

function syncStorage() {
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
}

function fillDataBase(object) {
    dataBase = [...dataBase, object]
}

function clearHTML() {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function deleteClient(id) {
    const confirmation = confirm('¿Are you sure?');
    if(confirmation) {
        const clientsDeleted = dataBase.filter( client => client.id !== id);
        dataBase = [...clientsDeleted]
        printHTML();
    }
}

// llenar los inputs con la información del cliente
function fillInputedit(client) {
    const { name, lastName, email, message, id } = client;
    const confirmation = confirm('¿Edit Client?');
    if(confirmation) {
        editing = true;
        btnSubmit.value = 'Edit Client';

        nameInput.value = name;
        lastNameInput.value = lastName;
        emailInput.value = email;
        messageInput.value = message;

        objSubmit.name = name;
        objSubmit.lastName = lastName;
        objSubmit.email = email;
        objSubmit.message = message;
        objSubmit.id = id;
    }
}

function editClient(object) {
    dataBase = dataBase.map( client => client.id === object.id ? object : client);
}

function printHTML() {
    clearHTML();
    dataBase.forEach( client => {
        const { name, lastName, email, message, id } = client;
        
        const divClients = document.createElement('DIV');
        divClients.classList.add('div-clients');

        const nameClient = document.createElement('P');
        nameClient.textContent = 'Name: ';
        nameClient.classList.add('fw-bold')

        const nameClientSpan = document.createElement('SPAN');
        nameClientSpan.textContent = name;
        nameClientSpan.classList.add('fw-normal');
        nameClient.appendChild(nameClientSpan);

        const lastNameClient = document.createElement('P');
        lastNameClient.textContent = 'Last Name: ';
        lastNameClient.classList.add('fw-bold')

        const lastNameClientSpan = document.createElement('SPAN');
        lastNameClientSpan.textContent = lastName;
        lastNameClientSpan.classList.add('fw-normal');
        lastNameClient.appendChild(lastNameClientSpan);

        const emailClient = document.createElement('P');
        emailClient.textContent = 'E-mail: ';
        emailClient.classList.add('fw-bold')

        const emailClientSpan = document.createElement('SPAN');
        emailClientSpan.textContent = email;
        emailClientSpan.classList.add('fw-normal');
        emailClient.appendChild(emailClientSpan);

        const messageClient = document.createElement('P');
        messageClient.textContent = 'Message: ';
        messageClient.classList.add('fw-bold')

        const messageClientSpan = document.createElement('SPAN');
        messageClientSpan.textContent = message;
        messageClientSpan.classList.add('fw-normal');
        messageClient.appendChild(messageClientSpan);

        const btnDelete = document.createElement('P');
        btnDelete.classList.add('svg-delete');
        btnDelete.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        `;
        btnDelete.onclick = () => deleteClient(id)

        const btnEdit = document.createElement('P');
        btnEdit.classList.add('svg-delete');
        btnEdit.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        `;
        btnEdit.onclick = () => fillInputedit(client)

        const divButtons = document.createElement('DIV');
        divButtons.classList.add('buttons');
        divButtons.appendChild(btnDelete)
        divButtons.appendChild(btnEdit)

        divClients.appendChild(nameClient);
        divClients.appendChild(lastNameClient);
        divClients.appendChild(emailClient);
        divClients.appendChild(messageClient);
        divClients.appendChild(divButtons);

        result.appendChild(divClients);
    })
    syncStorage();
    if(dataBase.length) {
        result.classList.add('div-result');
    } else {
        result.classList.remove('div-result');
    }
}

function resetObject() {
    objSubmit.name = '';
    objSubmit.lastName = '';
    objSubmit.email = '';
    objSubmit.message = '';
}

function validateForm(e) {
    e.preventDefault();

    if(Object.values(objSubmit).includes('')) {
        printAlert('All fields are required.', 'error')
        return;
    }
    if(messageInput.value.length > 600) {
        printAlert('Message too long', 'error')
        return;
    }

    if(editing) {
        editClient({...objSubmit})
        printAlert('Edited successfully!')
        btnSubmit.value = 'Submit';
        editing = false;
    } else {
        objSubmit.id = Date.now();
        fillDataBase({...objSubmit})
        printAlert('Message sent successfully!')
    }
    printHTML()
    resetObject();
    form.reset();
}
