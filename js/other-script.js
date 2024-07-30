let userWinPos = 0;

const openMenu = document.getElementsByClassName("burger-menu");
const elemMain = document.querySelector("main");
const windowHeight = document.documentElement.offsetHeight;
const secondHeader = document.getElementById("second-header");
const menu = document.getElementById("menu");
const menuContainer = document.getElementById("menuContainer");
const burger = document.getElementsByClassName("in-burger");

let IsSecHeader = false;
let wasIsSecHeader = false;
let stopScrolling = false; //остановить прокрутку?

let elemMainHeight = elemMain.clientHeight;
let elemMainTop = windowHeight - elemMainHeight;

let userInf = navigator.userAgent;
let MaybePC = false;
var IsPC = true;
let menuOpen = false;
let numOfBurger = 1;
let wasNumOfBurger = 1;

if (window.innerWidth / window.innerHeight > 0.8){
    MaybePC = true;
    console.log("Возможно, пользователь зашел с пк");
    if ((userInf.includes("Win") || userInf.includes("Linux")) && !userInf.includes("Android") || userInf.includes("Macbook")){
        IsPC = true;
        console.log("Пользователь зашел с пк");
    }
    else{
        MaybePC = false;
        IsPC = false;
        console.log("Пользователь зашел с мобильного устройства");
    }
}
else{
    IsPC = false;
    console.log("Пользователь зашел с мобильного устройства");
}
let repeats = 0; //for functions under this

function offPopUp(){
    stopScrolling=false;
    menuBody.classList.remove("onPop-up");
    menuBody.classList.add("offPop-up");
    openMenu[numOfBurger].classList.remove("animBurgerCont");
    openMenu[numOfBurger].classList.add("revAnimBurgerCont");
    burger[numOfBurger].classList.remove("animBurger");
    burger[numOfBurger].classList.add("revAnimBurger");
    setTimeout(()=>{menu.style.display="none";},250);
    repeats=0;
}
function onPopUp(){
    repeats++;
    stopScrolling = true;
    menuBody.classList.remove("offPop-up");
    menuBody.classList.add("onPop-up");
    menu.style.display="block";
    openMenu[numOfBurger].classList.add("animBurgerCont");
    openMenu[numOfBurger].classList.remove("revAnimBurgerCont");
    burger[numOfBurger].classList.add("animBurger");
    burger[numOfBurger].classList.remove("revAnimBurger");
}

function MenuController(num){
    numOfBurger =num;
    if (numOfBurger != wasNumOfBurger){
        repeats=0;
    }
    else{
        if (repeats == 0){
            onPopUp();
        }
        else if (repeats == 1){
            offPopUp()
        }
    }
    wasNumOfBurger = numOfBurger;
}

function isHeader2Visible() {
    let paddingTop = 100; //прибавляется к результату (высчитывается где начало <main>)
    // проверка, где второй хидер
    return (
        userWinPos <= elemMainTop + paddingTop
    );
}

function checkVisibleMainHeader(){
    // Проверяем его видимость
    if (!isHeader2Visible()) { //не видно пользователю основной хидер  
        IsSecHeader = false;
        secondHeader.style.display="flex";

    } else { //видно
        IsSecHeader = true;
        secondHeader.style.display="none";
    }
    wasIsSecHeader = IsSecHeader;
}

openMenu[0].addEventListener("click", () => MenuController(0));
openMenu[1].addEventListener("click", () => MenuController(1));

checkVisibleMainHeader();
let wasUserWinPos = 0; //нужно, чтобы если открылось вспл. окно запомнить последнюю позицию по y
window.onscroll = function(){
    userWinPos = window.scrollY; 
    if (!stopScrolling){
        wasUserWinPos = userWinPos;
        // smoothScroll();
    }
    else{
        window.scrollTo(0, wasUserWinPos); //блокируем прокрутку, если открыто вспл. окно
    }
    checkVisibleMainHeader();
};