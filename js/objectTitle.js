let posX; //позиция мыши по x
let posY; //позиция мыши по y

document.addEventListener("mousemove", function(mousePos){ //получаем позицию мыши
    posX = mousePos.clientX;
    posY = mousePos.clientY;
});

//запускается при каждом движении мыши
function followMouse(objectName, helpName){ //с элемента, у которого должна быть подсказка, получаем инфу об id элемента и div'а, который будет подсказкой
    let elem = document.getElementById(objectName);
    let elemHelp = document.getElementById(helpName);
    if (typeof elem.onmousemove !== "function"){  //если на элементе ещё нет евент листенера, то добавляем
        elem.onmousemove = function(){ //если курсор находится на элементе
            elemHelp.style.display = "flex";
            elemHelp.style.position = 'fixed';
            elemHelp.style.left = posX + 20 + 'px';
            elemHelp.style.top = posY -20 + 'px';
        }
        elem.onmouseleave = function(){ //если курсор находится вне элемента
            elemHelp.style.display = "none";
        }
    }
}