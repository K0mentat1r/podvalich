let userScreenWidth = document.documentElement.clientWidth;
let headers = document.querySelectorAll('header')
let mrgnRight = 5;
if (window.innerWidth - document.documentElement.clientWidth == 0){
    mrgnRight = 0;
}
console.log("разница м/д шириной окна и шириной документа = "+ (window.innerWidth - document.documentElement.clientWidth) + ". Если 0, значит overflow-y не видно (которая на пк)");
for(i=0;i<headers.length;i++){
    headers[i].style.width= userScreenWidth - mrgnRight + "px";
    headers[i].style.width-="2vw";
}