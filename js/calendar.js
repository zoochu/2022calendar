let currentTitle = document.getElementById('current-year-month');
let calendarBody = document.getElementById('calendar-body');
const btnToday = document.getElementById('btn-today');
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = first;
let pageYear;
if (first.getFullYear() % 4 === 0) {
    pageYear = leapYear;
} else {
    pageYear = notLeapYear;
}





const mainTodayDay = document.querySelector('#main-day');
const mainTodayDate = document.querySelector('#main-date');

function showMain() {
    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
}




function showCalendar() {
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    let monthCnt = 100;
    let cnt = 1;
    for (let i = 0; i < 6; i++) {
        const $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                const $td = document.createElement('td');
                $tr.appendChild($td);
            } else {
                const $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
        
    }
    showMain();
}
showCalendar();


function showThisMonth() {
    let today = new Date();
    let first = new Date(today.getFullYear(), today.getMonth(), 1);
    currentTitle.innerHTML = monthList[today.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + today.getFullYear();
    let monthCnt = 100;
    let cnt = 1;
    for (let i = 0; i < 6; i++) {
        const $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                const $td = document.createElement('td');
                $tr.appendChild($td);
            } else {
                const $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
    }
    showMain();
}


function removeCalendar() {
    let catchTr = 100;
    for (let i = 100; i < 106; i++) {
        const $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}






function prev() {
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function (e) {
        e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();
    });

    if (pageFirst.getMonth() === 1) {
        pageFirst = new Date(first.getFullYear() - 1, 12, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    removeCalendar();
    showCalendar();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

function next() {
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function (e) {
        e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();
    });


    if (pageFirst.getMonth() === 12) {
        pageFirst = new Date(first.getFullYear() + 1, 1, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
        first = pageFirst;
    }


    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();

    removeCalendar();
    showCalendar();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}




let clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
const tdGroup = [];

function clickStart(e) {
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click', changeToday);
    }
}
clickStart();


function changeToday(e) {
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
        if (tdGroup[i].classList.contains('active')) {
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    reshowingList();
}




function goToday() {
    removeCalendar();

    let btnToday = new Date();
    today = new Date(btnToday.getFullYear(), btnToday.getMonth(), btnToday.getDate());
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();

    showThisMonth();

    let clickedToday = document.getElementById(today.getDate());
    clickedToday.classList.add('active');

    clickStart();
    reshowingList();


    pageFirst = new Date(today.getFullYear(), today.getMonth(), 1, 1);
    first = pageFirst;
}
btnToday.addEventListener("click", goToday)
