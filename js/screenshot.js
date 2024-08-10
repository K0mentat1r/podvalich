let imgWidth = 1200; //ширина картинок
let imgBorderWidth = 10; //ширина border'а у картинок
let imgMargin = 20; //отступ у картинок (по бокам, чтобы не занимали всю страницу)
let imgMarginleft = 3; //марджин слева, чтобы центрировать картинки
let userWidth = document.documentElement.clientWidth; //ширина окна браузера у пользователя (с вычитом overflow-y)

//адаптация
if (userWidth < imgWidth) {
    imgWidth = userWidth - (imgBorderWidth * 2) - imgMargin; //если устройство уже 1200px, высчитываем ширину картинки
}
if (userWidth < 800){
    imgBorderWidth = 5;
    imgMarginleft = 8;
}
if (userWidth < 561){
    imgBorderWidth = 0;
    imgMarginleft = 13;
    imgMargin = 0;
}

document.getElementById("screenshots").style.marginLeft = imgMarginleft + "px";

console.log("ширина окна пользователя = "+window.innerHeight);

let width = imgWidth + (imgBorderWidth * 2); //вычисляем длину картинки с учетом border'а с двух сторон картинки
let count = 1;// видимое количество изображений

let list = document.getElementById("need");
let listElems = document.getElementsByClassName("screensh-container");
let closingOthers = document.getElementById("closingOthers");
let btns = document.getElementsByClassName("img-btn");
let mainHeader = document.getElementById("main-header");

document.documentElement.style.setProperty('--img-width', imgWidth + "px"); //ставим ширину картинки
document.documentElement.style.setProperty('--img-border-width', imgBorderWidth + "px"); //ставим ширину border'а для картинки
// let numOfBtn = 0;

let position = 0; // положение ленты прокрутки

closingOthers.style.height = window.innerHeight + "px";
closingOthers.style.display = "none";

function setBtnPos(){ //ставит кнопки для прокрутки в нужное положение
    let image = document.getElementsByClassName("screenshot");
    let btnMargin = 20;
    let btnMarginTopForMobile = 30;
    
    leftBtn.style.left = leftBtn.offsetWidth + imgMarginleft - btnMargin/2+"px";
    rightBtn.style.left = image[0].offsetWidth - rightBtn.offsetWidth - btnMargin + imgMarginleft +"px";

    if (userWidth >= 561){
        leftBtn.style.top = image[0].offsetHeight/2 + "px";
        rightBtn.style.top = image[0].offsetHeight/2 + "px";
    }
    else{
        leftBtn.style.top = image[0].offsetHeight + btnMarginTopForMobile  + "px";
        rightBtn.style.bottom = -btnMarginTopForMobile + 6  + "px";
    }
}

function slideRight(){ // сдвиг вправо
    position -= width * count;
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
}
function slideLeft(){ // сдвиг влево
    position += width * count;
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
}
    btns[0].addEventListener("click",() => onFocus());
    btns[1].addEventListener("click",() => onFocus());

    function onFocus(){
        closingOthers.style.display = "block";
        
        setTimeout(() => closingOthers.style.backgroundColor = "rgba(0,0,0,.50)", 0.01 * 1000); //нужна задержка, иначе появится резко
        mainHeader.style.opacity = "50%";
        // numOfBtn = num;
    }
    function offFocus(){
        closingOthers.style.backgroundColor = "rgba(0,0,0,0)"; 
        setTimeout(() => closingOthers.style.display = "none", 0.2 * 1000);
        mainHeader.style.opacity = "100%";
    }

let usingKeys = false;

setBtnPos();

btns[0].addEventListener("click", ()=> {onFocus();slideLeft()});
btns[1].addEventListener("click", ()=> {onFocus();slideRight()});

document.addEventListener("keydown", function(event){ //управление клавиатурой
    if (event.key == "ArrowLeft"){
        usingKeys = true;
        onFocus();
        slideLeft();
    }
    if (event.key == "ArrowRight"){
        usingKeys = true;
        onFocus();
        slideRight();
    }
    if (event.key == "Escape" || event.key == "Backspace"){
        offFocus();
        usingKeys = false;
    }
});

function unUsingKeys(){ //функция, чтобы не писать одно и тоже два раза
    if (usingKeys){
        usingKeys = false;
        offFocus();
    }
}

document.addEventListener("mousemove",unUsingKeys); //если  использовали стрелочки для переключения и подвигали мышкой - выключаем затемнение
document.addEventListener("scroll",unUsingKeys); //если  использовали стрелочки для переключения и прокрутили страницу (вниз или вверх) - выключаем затемнение

closingOthers.addEventListener("mouseenter", function(){ //если перелистывали картинки кнопками (на картинке), то при выходе за скрин выключаем затемение
    if(!usingKeys){
        offFocus();
    }
});