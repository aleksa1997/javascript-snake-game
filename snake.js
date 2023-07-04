
//board

 const boxSize = 25
 const rows = 20
 const columns = 20
 let canvasDisplay
 let context;
 let scoreGame

 window.onload = function(){
    canvasDisplay = document.querySelector("#board")
    scoreGame = document.querySelector("#score-el")
    canvasDisplay.width = columns * boxSize
    canvasDisplay.height =  rows * boxSize
    context = canvasDisplay.getContext("2d")
    foodPlace()
    document.addEventListener("keyup", changeDirection)
    //update() - ovde smo samo jednom pozvali update funkciju ali zelimo vise puta kako bi videla da se zmija krece, znaci svaki put kada se zmija pokrene da renderuje update
    setInterval(update, 1000/10) // moramo posatviti interval za funckiju update sto nam poziva funckiju update na svakih 100 milisekundi to je ovih 1000/10
 }

 //snake

 let snakeX = boxSize * 5
 let snakeY = boxSize * 5
 let velocityX = 0 
 let velocityY = 0 
 let snakeBody = [] //kreiramo array kako bi u njega stavljali segmente odnosno hranu koju zmija pojede

 //food

let foodX
let foodY

//game over

let gameOver = false


 function update(){

        if(gameOver){
        return

    }
    context.fillStyle='black'
    context.fillRect(0,0,canvasDisplay.width, canvasDisplay.height)

    context.fillStyle='red'
    context.fillRect(foodX,foodY,boxSize,boxSize)

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX,foodY])
        foodPlace()
    }

   result()

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle='lawngreen'
    snakeX += velocityX * boxSize
    snakeY += velocityY * boxSize
    context.fillRect(snakeX,snakeY,boxSize,boxSize)

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize)
    }

    //game over section

    if(snakeX < 0 || snakeX > columns*boxSize || snakeY < 0 || snakeY > rows*boxSize){
        gameOver = true
        alert("Game Over!")
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
            gameOver = true
            alert("Game Over!")
        }
    }
    
 } 

 function changeDirection(e) {
    if(e.code === "ArrowUp" && velocityY !== 1){
        velocityX = 0
        velocityY = -1
    } else if(e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0
        velocityY = 1
    } else if(e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1
        velocityY = 0
    } else if(e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1
        velocityY = 0
    }
 }

//Random location of the food

 function foodPlace () {
    foodX = Math.floor(Math.random() * columns) * boxSize
    foodY = Math.floor(Math.random() * rows) * boxSize
 }

//Display score 

 function result() {
    scoreGame.textContent = snakeBody.length
 }
