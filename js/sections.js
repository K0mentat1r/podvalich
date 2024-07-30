const sub_section = document.getElementsByClassName("section-FAQ__sub-section");
const btnClose = document.getElementsByClassName("sub-section__open");
const sectionBody = document.getElementsByClassName("sub-section_answer");
const sectionHeader = document.getElementsByClassName("sub-section__header");
//переменные размеров
let categoryStyleInfo = {};
//переменные boolean
let IsGetCatHeight = false;
//счетчик
let headerNum = 0;
let catHeaderHeight = 62;
let maxCatHeaderHeight = 62;
let wasHeaderNum = 0;
let CatClosesFirstTime = true;

let checkSectionHeaderHeight = function(headerHeight){
    if (headerHeight > catHeaderHeight){
        maxCatHeaderHeight = headerHeight;
        return maxCatHeaderHeight;
    }
    else{
        return catHeaderHeight;
    }
}

function getCategoryHeight(){
    for (let i = 0; i < sub_section.length; i++){
        categoryStyleInfo[i + "_height"] = sub_section[i].offsetHeight - 20;
        categoryStyleInfo[i + "_headerHeight"] = checkSectionHeaderHeight(sectionHeader[i].offsetHeight);
        categoryStyleInfo[i + "_isOpen"] = false;
        sub_section[i].style.height = categoryStyleInfo[i + "_headerHeight"] + "px";
        sectionBody[i].style.display = "none";
        // sectionHeader[i].style.borderRadius = "15px";
    }
}
setTimeout(getCategoryHeight,300);
// getCategoryHeight();
function categoryAnim({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function categoryAnim(time) {
    // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
        draw(progress); // отрисовать её
        if (timeFraction < 1) {
            requestAnimationFrame(categoryAnim);
        }
    });
}
function makeEaseOut(timing) {
    return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
    }
}
function subAnim(timeFraction) {
    return Math.pow(timeFraction, 2);;
}
let EaseOut = makeEaseOut(subAnim);

function onAnimCat(numOfCategory){
    sectionBody[numOfCategory].style.display = "block";
    categoryAnim({
        duration: 1000,
        timing: EaseOut,
        draw: function(progress) {
            if (progress * categoryStyleInfo[numOfCategory + "_height"] > categoryStyleInfo[numOfCategory + "_headerHeight"]){
                sub_section[numOfCategory].style.height = progress * categoryStyleInfo[numOfCategory + "_height"] + "px";
            }
        }
    });
}

function onRevAnimCat(numOfCategory){
    categoryAnim({
        duration: 500,
        timing: subAnim,
        draw: function(progress) {
            sub_section[numOfCategory].style.height = categoryStyleInfo[numOfCategory + "_height"]  - progress * (categoryStyleInfo[numOfCategory + "_height"] - categoryStyleInfo[numOfCategory + "_headerHeight"]) + "px";
        }
    });
    sectionBody[numOfCategory].style.display = "none";
}
function animCategoryOpen(num){
    sectionBody[num].classList.remove("onRevAnimSubCat");
    btnClose[num].classList.remove("onRevAnimCloseCat")

    onAnimCat(num);
    sectionBody[num].classList.add("onAnimSubCat");
    btnClose[num].classList.add("onAnimCloseCat");
}
function animCategoryClose(num){
    sectionBody[num].classList.remove("onAnimSubCat");
    btnClose[num].classList.remove("onAnimCloseCat")

    onRevAnimCat(num);
    sectionBody[num].classList.add("onRevAnimSubCat");
    btnClose[num].classList.add("onRevAnimCloseCat")
}
function onAnimations(){
    if (categoryStyleInfo[headerNum + "_isOpen"] == false){
        animCategoryOpen(headerNum);
        categoryStyleInfo[headerNum + "_isOpen"] = true;
    }
    else{
        animCategoryClose(headerNum);
        categoryStyleInfo[headerNum + "_isOpen"] = false;
    }
} //возможно придется переделывать, как решим
function getHeaderNum(num){
    headerNum=num;
    onAnimations();
}
for (let j = 0; j < btnClose.length; j++){
    let a = j;
    btnClose[j].addEventListener("click", ()=>{
        getHeaderNum(a);
    });
}