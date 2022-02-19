import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

class GameControl{
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    direction: string = ''
    isLive: boolean = true
    currentDirection: string = ''

    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }

    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.food.change()
        this.run()
    }

    keydownHandler(event:KeyboardEvent){
        if(/Arrow[Up|Down|Left|Right]/.test(event.key)){
            this.direction = event.key
        }
    }

    run(){
        let X = this.snake.X
        let Y = this.snake.Y

        switch(this.direction){
            case "ArrowUp":
                if(this.currentDirection !== 'ArrowDown'){
                    this.currentDirection = 'ArrowUp'
                    Y -= 10
                }else{
                    Y += 10
                }
                break
            case "ArrowDown":
                if(this.currentDirection !== 'ArrowUp'){
                    this.currentDirection = 'ArrowDown'
                    Y += 10
                }else{
                    Y -= 10
                }
                break
            case "ArrowLeft":
                if(this.currentDirection !== 'ArrowRight'){
                    this.currentDirection = 'ArrowLeft'
                    X -= 10
                }else{
                    X += 10
                }
                break
            case "ArrowRight":
                if(this.currentDirection !== 'ArrowLeft'){
                    this.currentDirection = 'ArrowRight'
                    X += 10
                }else{
                    X -= 10
                }
                break
        }

        this.checkEat(X , Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error) {
            let e:any = error
            alert(e.message + ' GAME OVER!')
            this.isLive = false
        }
        
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level - 1) * 30)
    }

    checkEat(X: number ,Y: number){
        if(X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}

export default GameControl