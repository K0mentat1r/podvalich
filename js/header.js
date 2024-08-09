let userScreenWidth = document.documentElement.clientWidth;
let headers = document.querySelectorAll('header')
let mrgnRight = 20;
if (userScreenWidth < 717){
    mrgnRight = 10;
}
for(i=0;i<headers.length;i++){
    headers[i].style.width= userScreenWidth - mrgnRight + "px";
    headers[i].style.width-="2vw";
}