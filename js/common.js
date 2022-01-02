//bugermenu
const menuBar = document.querySelector('.burger-menu');
const menuBox = document.querySelector('.menubox');
const visible = () => {
    menuBar.classList.toggle('active');
    menuBox.classList.toggle('active');
}
menuBar.addEventListener('click', visible)