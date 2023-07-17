window.addEventListener('load', main, false);
function main()  {

var canvas = document.getElementById('game'); // переменная для канваса, да доступа к нему по айди, у нас айди 'гейм'
var ctx = canvas.getContext('2d');// отрисовка змейки будет в 2 д




var x1 = -1;// это переменные несуществующих координат которые понадобятся нам для решения бага, когда змейка умирает если быстро нажимать кнопки
var  y1 = -1;

var v = 4;// скорость, которая потом будет увеличиваться каждые 5 очков на 2

var tileCount = 20; // количестыо клеток по х и у
 var tileSize = canvas.width / tileCount -2 // размер клетки, для змейки и яблока

var headX = 10;// для координаты головы змейки
var headY = 10;// тоже

var snakeParts = [];
var tailLength = 0;

var appleX = 5;// то же самое для яблока
var appleY = 5;

var xV = 0;// скорость по х
var yV = 0;// скорость по у

var score = 0;// наши очки, кажддый раз будет увеличиваться на 1

  class  SnakePart{ // класс снейк парт, нужен нам для того чтобы получать доступ к координате части хвоста, которая будет прибавляться к телу змейки при поедании яблока, каждый раз
    constructor(x, y) {
        this.x =x;// координаты по х и у
        this.y =y;
       }
}

// главная функция
      function snakegame () { // это функция для игры змейки, которая вкдючает в себя все осатльные функции
position();// определяет позицию головы змеи

var result = GameOver();// функция конца игры
    if (result){ // если резалт тру, то мы проиграли, а резалт это функция гемовер, функция гемовер тру если в ней тру переменная лост, увидишь потом внизу
    return;
}
clearScreen(); // очистка экрана

applesFive(); // уыеличение скорости на 2, когад значение съеденных яблок кратно 5


 
stolknovenie(); // когда змейка съела яблоко
drawApple();// позиция яблока
drawSnake();// хвост змеи

scorePlus(); // вводим в канвас значение очков

setTimeout(snakegame, 1000 / v); // функция сет тайм аут вызывает функцию один раз чрез заданый промежуьток времени, у нас в этот промежуток времени входит скорость, которая будет меняться

}


function GameOver() { //функция конца игры
      var lost = false; // сначала лост это фолс, то есть еще не проигрвли

    if(headX < 0) { //если мы врезались в левый борт канваса
        lost = true; // теперь лост тру и мы проиграли
    }

    else if (headX >=tileCount) { // если мы врезались в правую грань канваса
        lost = true;
    }

    else if (headY < 0) { // если мы врезались в верхюю грань канваса
        lost = true;
    }

        else if (headY >=tileCount) { //если мы врезалисб в нижний борт канваса
        lost = true;
    }
// теперь если мы врезались сами в себя
for   ( let i = 0; i< snakeParts.length; i++){ // пробешаемся по массиву снейкпартс
    var part = snakeParts[i]; // переменная парт это итый элемент массива
       if ( part.x === headX && part.y === headY ) { // если координаты какогото элемента хвоста змейки равны координате головы, то мы проиграли
        lost = true;
        break;
       
    }
}





    if (lost) { // то что будет отрисовываться на экране канваса если мы проиграли
        
        ctx.fillStyle = '#E6BB99'; // закрашивем фон
        ctx.fillRect(0,0,canvas.width, canvas.height)

        ctx.fillStyle = 'white'; // пишем белым цветом



        ctx.font = 'bold 40px serif';
        ctx.fillText("Ты проиграл 🥺 ", canvas.width/ 6.5, canvas.height/ 1.7); // текст
        ctx.fillText("Твой счет:" + score, canvas.width/ 5, canvas.height/ 2 ); // пишем твои очки
        

    }

    return lost;
}


function scorePlus() { // функция отображения очков на экране во время игры
    ctx.fillStyle = 'white';

    ctx.font = 'bold 20px serif';
         ctx.fillText("Счет:" + score, canvas.width - 80, 20); // все тоже самое как выше
}


function clearScreen() { // функция для стирания с экрана, все та же как выше
    // канвас
ctx.fillStyle = '#E6BB99';
ctx.fillRect(0,0,canvas.width, canvas.height)

}

function drawSnake () { // функция для отрисовки новых элементов хвоста
    // хвост
            ctx.fillStyle = '#828EC0'; // такой то цвет
    for( let i = 0; i < snakeParts.length; i++) { // пробегаемся по массиву
        var part = snakeParts[i]; // переменная для итого элемента массива
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize); // рисумеи квадратик нового элемента хвоста 
    }

snakeParts.push( new SnakePart(headX, headY));// добавили элемент в конец массива к голове
while (snakeParts.length > tailLength) {
        snakeParts.shift();// удаляет последний элемент из массива и возвращает его значение

}
// рисовка головы змеи
 ctx.fillStyle = '#36787E';
 // рисуем голову змейки
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize)

}

function position() { // функция определяющая координаты головы змейки в каждый момент времени
         headX = headX + xV;
    headY = headY + yV;
}


function drawApple() { // функция отрисовки яблока
    // яблоко
    ctx.fillStyle = '#eb8dac'; // заливка
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize); // такой то размер яблока


}

    function applesFive() { // функция увеличения скорсти на 2, когда мы едим каждые 5 яблок

        if(  (tailLength + 1) % 5 == 0 && appleX === headX && appleY === headY && tailLength !== 0) { // ну тут чисьая маьтематика, % это деление, а в ответ записывается остаток, то есть если тэил + 1 кратно 5
            // и при этом еще координаты яблока и головы равны, то есть мы сбели яблоко, то тогда увеличиваем скорость на 2
            v  = v + 2; // вот как раз это увеличение
        }
    }


function stolknovenie() { // функция столкновения яблока и головы, то есть когда мы его едим
    if(appleX === headX && appleY === headY) { // если координаты яблока и головы равны
    var flag = true; // поднимаем флаг тру
    while (flag) { // пока флаг тру
      appleX=Math.floor(Math.random()* tileCount); // генерация рандомных координат х и у яблока
      appleY=Math.floor(Math.random()* tileCount);
      flag = false; // теперь флаг фолс

      // теперь исправление бага когда яблоко появляется под хвостом змейки
      for( let i = 0; i < snakeParts.length; i++) { // пробегаемся по массиву
        var part = snakeParts[i];
        if (appleX === part.x && appleY === part.y) { // если координаты яблока соовпалают с координатами хвоста, тогда флаг снова тру, и теперь мы возващаемся к 177 сторчке
            // снова генерируем координаты яблока, до тех пор когда флаг не станет фолс, и координаты яблока не будут под хвостом
          flag = true
        }
      }
    }
  tailLength++; // увеличение длины хвоста на 1 
  score ++; // увеличение очков на 1
    }
}


document.addEventListener('keydown', keyDown); // добавляем к нашему скрипту клавиатуру

function keyDown (event) { // движение
 if(event.keyCode == 38) { 
    if (yV ==1)
        return;
    if (headX == x1 && headY == y1)
        return; 
         
            x1 = headX;
            y1 = headY;
        

    // вверх
    yV = -1;
    xV = 0;
 }



 if(event.keyCode == 40) {
    if (yV == -1)
        return;
    if (headX == x1 && headY == y1)
        return; 
         
            x1 = headX;
            y1 = headY;
        
    // вниз
    yV = 1;
    xV = 0;
 }

  if(event.keyCode == 37) {
    if (xV == 1)
        return;
    if (headX == x1 && headY == y1)
        return; 
         
            x1 = headX;
            y1 = headY;
        
    //  влево
    yV = 0;
    xV = -1;
 }

  if(event.keyCode == 39) {
    if (xV == -1)
        return;
    if (headX == x1 && headY == y1)
        return; 
         
            x1 = headX;
            y1 = headY;
        
    // в право
    yV = 0;
    xV = 1;
 }





}
snakegame();
//console.log(13 % 4)
//console.log(5 % 5)

}