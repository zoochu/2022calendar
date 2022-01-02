const inputForm = document.querySelector('.input-form')
const inputBox = document.getElementById('input-box');
const inputDate = document.getElementById('input-data'); 
const inputList = document.getElementById('input-list'); 

inputForm.addEventListener('submit', addSchedule)
inputDate.addEventListener('click', addSchedule);


const delText = '<i class="fas fa-times"></i>';
const amendText = '<i class="fas fa-edit"></i>';


let keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
let schedules = [];  
let thisSchedule = 0;



const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const amendInput = modal.querySelector(".amend-box");
const amendBtn = modal.querySelector("button");
const amendForm = document.getElementById("amend-form");







// 다시보여주기

function reshowingList() {
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    if( schedules === undefined){
        inputList.textContent = '';
        schedules[keyValue] = [];
        const $lis = document.querySelectorAll('#input-list > li');
        $lis.forEach( (e) => e.remove() );
    }else if ( schedules.length === 0) {
        inputList.textContent = "";
        const $lis = document.querySelectorAll('#input-list > li');
        $lis.forEach( (e) => e.remove() );
    }
    else {
        const $lis = document.querySelectorAll('#input-list > li');
        $lis.forEach( (e) => e.remove() );

        const newSchedule = schedules.filter( (schedule) => schedule.date == keyValue)
        for (let i = 0; i < newSchedule.length; i++) {
                const $li = document.createElement('li');
                $li.id = newSchedule[i].id;
                const $span = document.createElement('span');
                $span.textContent = '-' + newSchedule[i].text;

                const $btn_delete = document.createElement('i');
                const $btn_amend = document.createElement('i');

                
                $btn_delete.setAttribute('class', 'fas fa-times');
                $btn_delete.classList.add('del-data');

                $btn_amend.setAttribute('class', 'fas fa-edit');
                $btn_amend.classList.add('btn-amend-data')
                
                $li.appendChild($span);
                $li.appendChild($btn_amend);
                $li.appendChild($btn_delete);

                inputList.appendChild($li);
                inputBox.value = '';      
                $btn_delete.addEventListener('click', deleteSchedule);
                $btn_amend.addEventListener('click', openModal);
        }
    }
} 





// 수정 amend
let amendId = 0

const openModal = (e) => {
    modal.classList.remove('hidden');
    console.log(schedules)
    amendId = e.target.parentElement.parentElement.id

    console.log(amendId)
    for(let i = 0; i < schedules.length; i++){
        if(schedules[i].id == amendId){
            amendInput.value = schedules[i].text
        }
    }

}




//프린트 todo
function paintSchedule(newSchedule){
        const $li = document.createElement('li');
        $li.id = newSchedule.id;
        const $span = document.createElement('span');
        $span.textContent = '-' + newSchedule.text;

        const $btn_delete = document.createElement('i');
        const $btn_amend = document.createElement('i');

        
        $btn_delete.innerHTML = delText;
        $btn_delete.classList.add('del-data');

        $btn_amend.innerHTML = amendText;
        $btn_amend.classList.add('btn-amend-data')
        
        $li.appendChild($span);
        $li.appendChild($btn_amend);
        $li.appendChild($btn_delete);

        inputList.appendChild($li);
        inputBox.value = '';      
        $btn_delete.addEventListener('click', deleteSchedule);
        $btn_amend.addEventListener('click', openModal);
}

let timeCode=0;

function addSchedule(e) {
    e.preventDefault();
    timeCode = Date.now();
    const newSchedule = inputBox.value
    inputBox.value = '';
    const newScheduleObj = {
        text: newSchedule,
        id: timeCode,
        date: keyValue,
    }
    schedules.push(newScheduleObj);
    paintSchedule(newScheduleObj)
    saveSchedule();
}





const saveSchedules = localStorage.getItem('schedule')

if(saveSchedules !== null ){
    const parsedSchedules = JSON.parse(saveSchedules);
    schedules = parsedSchedules
    parsedSchedules.forEach(paintSchedule)
}







// 저장 save
function saveSchedule(){
    localStorage.setItem('schedule', JSON.stringify(schedules) )
}

// 삭제 delete
function deleteSchedule(e){
    thisSchedule = e.target.parentElement;
    console.log(thisSchedule)
    thisSchedule.remove();
    const result = schedules.filter((schedule) => schedule.id !== Number(thisSchedule.id))    
    schedules = result
    saveSchedule();
}



const closeModal = (e) => {
    modal.classList.add("hidden")
}

overlay.addEventListener("click", closeModal)
amendForm.addEventListener("submit", amendSchedule)
amendBtn.addEventListener("click", amendSchedule)




function amendSchedule(e){
    e.preventDefault();
    closeModal()

    for(let i =0; i < schedules.length; i++){
        if(schedules[i].id == amendId){
            schedules[i].text = amendInput.value
            schedules.map( (schedule) => schedules[i].id === amendId ? `${schedules[i].text}` : schedule)
            console.log(schedules)
            reshowingList()
            saveSchedule()
        }
    }
}   


reshowingList();
