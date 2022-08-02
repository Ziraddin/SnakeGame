const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = $("#scoreText");
const resetBtn = $("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor  = "#3AB4F2";
const snakeBorderColor = "#0078AA";
const foodColor = "#E41749";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX; 
let foodY;
let score = 0;
let snake = [
    {x: 0, y: 0},
    {x: unitSize * 1, y: 0}
]

document.addEventListener("keydown", changeDirection);
resetBtn.click(resetGame);

gameStart();

function gameStart(){

    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){

    if(running){

        setTimeout(()=>{

            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    }
    else{

        displayGameOver();
    }
};
function clearBoard(){

    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){

    function randFood(min, max){
        
        const randNum = Math.round((Math.random()*(max-min) + min)/unitSize)*unitSize;
        return randNum;
    }
   foodX = randFood(0, gameWidth-unitSize);
   foodY = randFood(0, gameWidth-unitSize);
    console.log("X:"+foodX);
    console.log("Y:"+foodY);
};
function drawFood(){

    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){

    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }

    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        
       score++;
       scoreText.text(score);
       createFood();
    }
    else{
        snake.pop();
    }

};
function drawSnake(){

    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorderColor;

    snake.forEach((snakePart)=>{

        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
   
    ctx.fillStyle = "#F2DF3A";
    ctx.strokeStyle = "#FFF80A";
    ctx.fillRect(snake[0].x, snake[0].y, unitSize, unitSize);
    ctx.strokeRect(snake[0].x, snake[0].y, unitSize, unitSize);
};
function changeDirection(event){

    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    switch(keyPressed){

        case (left): xVelocity = -unitSize; yVelocity = 0; break;
        case (up): yVelocity = -unitSize; xVelocity = 0; break;
        case (right): xVelocity = unitSize; yVelocity = 0; break;
        case (down): yVelocity = unitSize; xVelocity = 0; break;
    };
};
function checkGameOver(){

    switch(true){

        case (snake[0].x < 0) : running = false; break;
        case (snake[0].x >= gameWidth) : running = false; break;
        case (snake[0].y < 0) : running = false; break;
        case (snake[0].y >= gameHeight) : running = false; break;
    }

    for(let i= 2; i< snake.length; i++){

        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){

             running  = false;
        }
    }
   

};
function displayGameOver(){

    ctx.font = "60px bold Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
    running = false;
};
function resetGame(){


   score = 0; 
   xVelocity = unitSize;
   yVelocity = 0;
   snake = [
    {x: 0, y: 0},
    {x: unitSize * 1, y: 0}
]
   gameStart();
};
