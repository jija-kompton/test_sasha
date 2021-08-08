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
      todolist = document.querySelector('.todo_main'),
      saveEdit = document.querySelector('.btn__modaledit-save');

todolist.addEventListener('click', checkTask);
    
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
    else{document.querySelector('.todo_main').innerHTML += `
    <li class="todo_items" data-part="root">
        <div class="text-space">
            <p class="js-data-pare-text todo_items">${document.querySelector('.adder-task').value}</p>
            <p class="js-data-pare-date todo_items">${document.querySelector('.adder-date').value}</p>
            <p class="js-data-pare-time todo_items">${document.querySelector('.adder-date-time').value}</p>
        </div>
        <div class="btn-space">
            <button class="btn btn-del"></button>
            <button class="btn btn-edit"></button>
            <button class="btn btn-finish"></button>
        </div>
    </li>`;
    
    document.querySelector('.adder-task').value = "";
    document.querySelector('.adder-date').value = "";
    document.querySelector('.adder-date-time').value = "";

    const modal = event.target.closest(`.${CLASS_LIST.MODAL_ACTIVE}`);

    modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    }
})

function checkTask(e){
    const item = e.target;
    if(item.classList[1] === "btn-del"){
        const currentTask = item.parentElement.parentElement;
        currentTask.remove();
    }

    if(item.classList[1] === "btn-finish"){
        const currentTask = item.parentElement.parentElement.childNodes[1];
        console.log(currentTask);
        if(currentTask.classList[0] === "text-space") currentTask.classList.toggle("text-space-finish")
    }

    if(item.classList[1] === "btn-edit"){

        const currentTask = item.closest('[data-part="root"]');
        let textTask = currentTask.querySelector('.js-data-pare-text'),
            dateTask = currentTask.querySelector('.js-data-pare-date'),
            timeTask = currentTask.querySelector('.js-data-pare-time');

        event.preventDefault();
        const modal = document.querySelector('.modaledit');
        modal.classList.add(CLASS_LIST.MODALEDIT_ACTIVE);

        let inputText = modal.querySelector('.adder-task'),
            inputDate = modal.querySelector('.adder-date'),
            InputTime =modal.querySelector('.adder-date-time');

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
    }
}