import '../scss/main.scss';

const CLASS_LIST = {
    MODAL: 'modal',
    MODALEDIT: 'modaledit',
    MODALEDIT_ACTIVE: 'modaledit--active',
    MODAL_ACTIVE: 'modal--active',
    TRIGGER_OPEN: 'js-modal-open',
    TRIGGER_CLOSE: 'js-modal-close',
    TRIGGER_CLOSE_EDIT: 'js-modaledit-close'
};

const addButton = document.querySelector('.btn__modal-adds'),
      todolist = document.querySelector('.todos__list'),
      saveEdit = document.querySelector('.btn__modaledit-save'),
      removeButton = document.querySelectorAll('.js-delete-btn'),
      finishButton = document.querySelectorAll('.js-finish-btn'),
      editButton = document.querySelectorAll('.js-edit-btn');


const deletetest = (event) =>{
    const currentTask = event.target.closest('[data-part="root"]');
    currentTask.remove();
};

removeButton.forEach(button => button.addEventListener('click', deletetest));

const finishtest =  (event) =>{
    const currentTask = event.target.closest('[data-part="root"]');
    console.log(currentTask);
    currentTask.querySelector('.text-space').classList.toggle("text-space-finish")
};

const finishTask = finishButton.forEach(button => button.addEventListener('click', finishtest));

const edittest =  (event) => {

    const currentTask = event.target.closest('[data-part="root"]');
    let textTask = currentTask.querySelector('.js-data-pare-text'),
        dateTask = currentTask.querySelector('.js-data-pare-date'),
        timeTask = currentTask.querySelector('.js-data-pare-time');

    event.preventDefault();
    const modal = document.querySelector('.modaledit');
    modal.classList.add(CLASS_LIST.MODALEDIT_ACTIVE);

    let inputText = modal.querySelector('.adder-task'),
        inputDate = modal.querySelector('.adder-date'),
        InputTime = modal.querySelector('.adder-date-time');

    inputText.value = textTask.textContent;
    inputDate.value = dateTask.textContent;
    InputTime.value = timeTask.textContent;

    saveEdit.addEventListener('click', ()=>{
        
        if (inputText.value.length == 0 ||
            inputDate.value.length == 0 ||
            InputTime.value.length == 0) alert ('Заполните поля')
        else{
            textTask.innerHTML = inputText.value;
            dateTask.innerHTML = inputDate.value;
            timeTask.innerHTML = InputTime.value;

            modal.classList.remove(CLASS_LIST.MODALEDIT_ACTIVE);
        }

    });
};

const editTask = editButton.forEach(button => button.addEventListener('click', edittest));

document.addEventListener('click', (event) =>{

    if (
        event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
            event.preventDefault();

            const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
            const modal = document.querySelector('.modal');

            modal.classList.add(CLASS_LIST.MODAL_ACTIVE);
        }
        
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
        (event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE))
    ) {
        event.preventDefault();

        const modal = event.target.closest(`.${CLASS_LIST.MODAL_ACTIVE}`);

        modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);

        document.querySelector('.adder-task').value = "";
        document.querySelector('.adder-date').value = "";
        document.querySelector('.adder-date-time').value = "";
        
    }
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE_EDIT}`) ||
        (event.target.classList.contains(CLASS_LIST.MODALEDIT_ACTIVE))
    ) {
        event.preventDefault();

        const modal = event.target.closest(`.${CLASS_LIST.MODALEDIT_ACTIVE}`);

        modal.classList.remove(CLASS_LIST.MODALEDIT_ACTIVE);
        
    }
});

addButton.addEventListener ('click', ()=>{

    if (document.querySelector('.adder-task').value.length == 0 ||
        document.querySelector('.adder-date').value.length == 0 ||
        document.querySelector('.adder-date-time').value.length == 0) alert ('Заполните поля')
    else{
    
    const item = document.createElement('li');
    item.classList.add('todo__items');
    item.setAttribute("data-part", "root");
    item.insertAdjacentHTML('beforeend',`<div class="text-space">
    <p class="js-data-pare-text">${document.querySelector('.adder-task').value}</p>
    <p class="js-data-pare-date">${document.querySelector('.adder-date').value}</p>
    <p class="js-data-pare-time">${document.querySelector('.adder-date-time').value}</p>
    </div>
    <div class="btn-space">
    <button class="js-delete-btn btn btn-del"></button>
    <button class="js-edit-btn btn btn-edit"></button>
    <button class="js-finish-btn btn btn-finish"></button>
    </div>`)

    item.querySelector('.js-delete-btn').addEventListener('click', deletetest);
    item.querySelector('.js-finish-btn').addEventListener('click', finishtest);
    item.querySelector('.js-edit-btn').addEventListener('click', edittest);

    document.querySelector('ul').append(item);


    document.querySelector('.adder-task').value = "";
    document.querySelector('.adder-date').value = "";
    document.querySelector('.adder-date-time').value = "";

    const modal = event.target.closest(`.${CLASS_LIST.MODAL_ACTIVE}`);

    modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    }
});