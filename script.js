const playBoard = document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");


let GameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let veloityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `high score: ${highScore}`;

const changFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}

const handleGameOver = () =>{
    
    clearInterval(setIntervalId);
    // alert("GameOver");
    Swal.fire({
        title: "GAME OVER!",
        icon: "error",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          location.reload();
        } 
        
      });
        
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        veloityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        veloityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && veloityX != 1){
        veloityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && veloityX != -1){
        veloityX = 1;
        velocityY = 0;
    }
    initGame();
}

const initGame = () => {
    if (GameOver) return handleGameOver(); 
        
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score: highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML=`score: ${score}`;

        highScoreElement.innerHTML = `high score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += veloityX;
    snakeY += velocityY; 

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        GameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
    }

    playBoard.innerHTML = htmlMarkup;

    
}
changFoodPosition();
// initGame();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

function playAudio() {
    document.getElementById("audio").play();
}