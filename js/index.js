import { Task } from '../model/Task.js';

let listChecked = [];
let listUnchecked = [];

window.createNewTask = () => {
    if (!notifyStatusInput()) return;
    let id = Math.random() * 1000000000000000;
    let todoText = document.querySelector('#newTask').value;
    const todo = new Task(id, todoText);
    // listUnchecked.push(todo);
    listUnchecked = [...listUnchecked, todo];
    renderTask();
    renderTaskChecked();
    saveTask();
    resetInput();
};
// press Enter run 'createNewTask'
window.runScript = (e) => {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        createNewTask();
        return false;
    }
}
function renderTask() {
    let html = '';
    for (let key of listUnchecked) {
        let todoText = key.todoText;
        let id = key.id;
        html +=
            ` 
            <li>${todoText}
                <div class="ml-auto">
                    <i class="fa-regular fa-trash-can icon-trash icon"
                    onclick="deleteTask(${id})"
                    ></i>
                    <i class="fa-regular fa-circle-check icon-non-check icon"
                    onclick='checkTask(${id})'
                    ></i>
                </div>
            </li>
        `
    }
    document.getElementById("todo").innerHTML = html;
}
function renderTaskChecked() {
    let html = '';
    for (let key of listChecked) {
        let todoText = key.todoText;
        let id = key.id;
        html +=
            ` 
            <li>${todoText}
                <div class="ml-auto">
                    <i class="fa-regular fa-trash-can icon-trash icon"
                    onclick="deleteTaskChecked(${id})"
                    ></i>
                    <i class="fa-regular fa-circle-check icon-check icon"
                    onclick='unCheckTask(${id})'
                    ></i>
                </div>
            </li>
        `
    }
    document.getElementById("completed").innerHTML = html;
}
// Thêm task vào checkList và remove ra khỏi unCheckList
window.checkTask = (id) => {
    // Tìm task dựa vào id
    let checkTask = listUnchecked.find((item) => item.id === id);
    // Thêm task vào list checked 
    listChecked = [...listChecked, checkTask];
    // remove khỏi un check list
    removeTask(id, listUnchecked);
    renderTask();
    renderTaskChecked();
    saveTask()
}
// Thêm task vào unCheckList và remove ra khỏi checkList
window.unCheckTask = (id) => {
    let unCheckTask = listChecked.find((item) => item.id === id);
    listUnchecked = [...listUnchecked, unCheckTask];
    removeTask(id, listChecked);
    renderTask();
    renderTaskChecked();
}
window.removeTask = (id, array) => {
    let index = array.findIndex((item) => item.id === id);
    if (index == -1) return;
    array.splice(index, 1);
}
function resetInput() {
    document.querySelector('#newTask').value = "";
    document.querySelector('#newTask').focus();
}
window.deleteTask = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        };
        let index = listUnchecked.findIndex((item) => item.id === id);
        if (index == -1) return;
        listUnchecked.splice(index, 1);
        renderTask();
        renderTaskChecked();
        saveTask();
    })

}
window.deleteTaskChecked = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        };
        let index = listChecked.findIndex((item) => item.id === id);
        if (index == -1) return;
        listChecked.splice(index, 1);
        renderTask();
        renderTaskChecked();
        saveTask();
    })
   
}
/**
 *  Kiểm tra nhập ô input
 *  Từ cần nhập phải lớn hơn 4 kí tự
 */
function notifyStatusInput() {
    if (document.querySelector('#newTask').value.length > 4) {
        document.getElementById('spanError').style.color = '#00e200';
        document.getElementById('spanError').innerHTML = 'Nhập thành công';
        setTimeout(function () {
            document.getElementById('spanError').innerHTML = ''
        }, 800)
        return true;
    }
    else if (document.querySelector('#newTask').value.length >= 1) {
        document.getElementById('spanError').style.color = 'red';
        document.getElementById('spanError').innerHTML = 'Hãy nhập trên 4 kí tự';
        setTimeout(function () {
            document.getElementById('spanError').innerHTML = ''
        }, 800)
        return false;

    }
    else {
        document.getElementById('spanError').style.color = 'red';
        document.getElementById('spanError').innerHTML = 'Vui lòng nhập task';
        setTimeout(function () {
            document.getElementById('spanError').innerHTML = ''
        }, 800)
        return false;
    }
}
window.sortAtoZ = () => {
    listUnchecked = _.orderBy(listUnchecked, ["todoText", "id"], ['asc', 'desc']);
    renderTask();
}
window.sortZtoA = () => {
    listUnchecked = _.orderBy(listUnchecked, ["todoText", "id"], ['desc', 'asc']);
    renderTask();
}
// window.getListChecked = () => {
//     return localStorage.getItem('checkList') ? JSON.parse(localStorage.getItem('checkList')) : [];
// }
// window.getUncheckList = () => {
//     return localStorage.getItem('unCheckList') ? JSON.parse(localStorage.getItem('unCheckList')) : [];
// }
window.saveTask = () => {
    localStorage.setItem('checkList', JSON.stringify(listUnchecked));
    localStorage.setItem('unCheckList', JSON.stringify(listChecked));
}
window.onload = function () {
    listChecked = JSON.parse(localStorage.getItem('checkList')) || [];
    listUnchecked = JSON.parse(localStorage.getItem('unCheckList')) || [];
    renderTask();
    renderTaskChecked();
}
