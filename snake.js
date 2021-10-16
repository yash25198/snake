function init(){
    var canvas = document.getElementById("mycan");
    $w=canvas.width=500;
    $h=canvas.height=500;
    pen = canvas.getContext('2d');
    state = "reset";
    hscore = Math.max(score,hscore);
    pen.font = "30px roboto"
    pen.fillText(hscore,50,50);
    score = 0;
    gameOver = false;
    window.addEventListener('keydown',keyPressed);
    $cs = 25;
    food = randomFood();
    snake = {
        len : 5,
        body_color : "white",
        head_color : "#3a3838",
        cells : [],
        direction : "right",
        createSnake:function(){
            
            for(let i = 0; i < snake.len;i++){
                snake.cells.push({x:i,y:0});
            }

        },
        drawSnake:function(){
            for(let i = 0; i < snake.cells.length;i++){
                if(i == snake.cells.length-1){
                    pen.fillStyle = snake.head_color;
                }
                pen.fillRect(this.cells[i].x * $cs,this.cells[i].y * $cs,$cs -2,$cs - 2);
            }
        },
        updateSnake:function(){
            var headX = snake.cells[snake.cells.length-1].x;
            var headY = snake.cells[snake.cells.length-1].y;
            if(headX == food.x && headY == food.y){
                food = randomFood();
                score++;
            }
            else{
                snake.cells.shift();}

            if(snake.direction == "right"){
                X = headX + 1;
                Y = headY;
            }
            else if(snake.direction == "left"){
                X = headX - 1;
                Y = headY;
            }
            else if(snake.direction == "up"){
                X = headX;
                Y = headY - 1;
            }
            else if(snake.direction == "down"){
                X = headX;
                Y = headY + 1;
            }
            snake.cells.push({x : X,y : Y});
            eat = false;
        },
        

    }
    snake.createSnake();
    snake.drawSnake();
    function keyPressed(e){
        if(e.code=="ArrowUp"){
            if(snake.direction != "down"){
                snake.direction = "up";
            }
        }
        else if(e.code=="ArrowDown"){
            if(snake.direction != "up"){
                snake.direction = "down";
            }
        }
        else if(e.code=="ArrowRight"){
            if(snake.direction != "left"){
                snake.direction = "right";
            }
        }
        else if(e.code=="ArrowLeft"){
            if(snake.direction != "right"){
                snake.direction = "left";
            }
        }
    }
    
}

function update(){
    if( snake.cells[snake.cells.length -1].x < 0 || 
        snake.cells[snake.cells.length -1].x >= $w/$cs || 
        snake.cells[snake.cells.length -1].y < 0 || 
        snake.cells[snake.cells.length -1].y >= $h/$cs){ 
        gameOver = true;
    }
    
    snake.updateSnake();
    
}
function draw(){
    pen.clearRect(0,0,$w,$h);
    pen.fillStyle = snake.body_color;
    snake.drawSnake();
    food.draw();
    pen.font = "30px roboto";
    pen.fillStyle = "white"
    pen.fillText(score,450,50);
	
}
function randomFood(){
    foodX = Math.floor(Math.random() * ($w/$cs));
    foodY = Math.floor(Math.random() * ($h/$cs));
    food = {
        x : foodX,
        y : foodY,
        color : "grey",
        draw : function(){
            pen.fillStyle = this.color;
            pen.fillRect(this.x * $cs,this.y * $cs,$cs -2,$cs -2);
        },
    }
    return food;
    
}
function gameloop(){
    draw(); 
    update();
    if( gameOver ){
        window.alert("Game Over");
        clearInterval(f);
    }
}
function startGame(){
    if(state!= "start"){
        state = "start";
        
        f=setInterval(gameloop,100);
    }
    
}
function resetGame(){
    state = "reset";
    clearInterval(f);
    init();
}
score = 0;
hscore = 0;
init();
start = document.getElementById("start").addEventListener("click",startGame);
reset = document.getElementById("reset").addEventListener("click",resetGame);;
