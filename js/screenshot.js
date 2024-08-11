let imgWidth = 1280; //ширина картинок
let imgBorderWidth = 10; //ширина border'а у картинок
let imgMargin = 20; //отступ у картинок (по бокам, чтобы не занимали всю страницу)
let imgMarginleft = 3; //марджин слева, чтобы центрировать картинки
let userWidth = document.documentElement.clientWidth; //ширина окна браузера у пользователя (с вычитом overflow-y)

let mobileMod = false; //версия для телефона

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
    mobileMod = true;
}

document.getElementById("screenshots").style.marginLeft = imgMarginleft + "px";

console.log("ширина окна пользователя = "+window.innerHeight);

let width = imgWidth + (imgBorderWidth * 2) + 5; //вычисляем длину картинки с учетом border'а с двух сторон картинки (+5 чтобы картинки вставали ровно)
let count = 1;// видимое количество изображений

let list = document.getElementById("need");
let listElems = document.getElementsByClassName("screensh-container");

let closingOthers = document.getElementById("closingOthers");
let btns = document.getElementsByClassName("img-btn");

let author = document.getElementById("authorContainerForMobile");

let mainHeader = document.getElementById("main-header");

let authorName={ //что то типо БД
    ini_ga:{
        "text": "Ini_ga", //имя автора, которое будет отображаться
        "link": "img/player-heads/ini_ga.png", //ссылка на его голову (от скина)
        "screens_num": [0,1,2], //номера скринов, сделанных этим игроком
    },
    default:{
        "text": "noname",
        "link": "",
        "screens_num": [],
    }
};
let numOfScreenshot = 0;
let authorNameResult = { //уже полученные данные
    pl_text:null,
    hd_link:null,
};

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
        rightBtn.style.bottom = -btnMarginTopForMobile - btnMargin - (btnMargin/2)  + "px";
        author.style.bottom =  -btnMarginTopForMobile - btnMargin - (btnMargin/2)  + "px";
        author.style.left = (rightBtn.getBoundingClientRect().right - leftBtn.getBoundingClientRect().left) - image[0].offsetWidth/2 + "px";
    }
}

function checkScreenshotAuthor(numOfScreenshot){ //достаем из authorName инфу для скриншотов
    const NAME = "text";
    const LINK = "link";
    const SCREENS_NUM = "screens_num";

    // let text = null;
    // let link = null;
    // let screens_num = null;

    const getInfo = data => {
        for( let name in data ){
            let info = data[ name ];

            let text = info[ NAME ];
            let link = info[ LINK ];
            let screens_num = info[ SCREENS_NUM ];
            for(i=0;i < listElems.length;i++){
                if(screens_num[i] == numOfScreenshot){
                    authorNameResult = {
                        pl_text: text,
                        hd_link: link,
                    };
                    break;
                }
            }
        }
    }
    getInfo( authorName );
}
function setValues(){
    numOfScreenshot = -(position/width);
    checkScreenshotAuthor(numOfScreenshot);
    // console.log(authorNameResult);
    if(mobileMod){ //если экран меньше 561px
        document.getElementById("authorNameForMobile").innerHTML= authorNameResult.pl_text;
        document.getElementById("authorHeadForMobile").src = authorNameResult.hd_link;
    }
    else{
        document.getElementsByClassName("screen__author-name")[numOfScreenshot].innerHTML= authorNameResult.pl_text;
        document.getElementsByClassName("screen__author-head")[numOfScreenshot].src = authorNameResult.hd_link;
    }
}

function slideRight(){ // сдвиг вправо
    position -= width * count;
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
    setValues()
}
function slideLeft(){ // сдвиг влево
    position += width * count;
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
    setValues();
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
setValues();

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