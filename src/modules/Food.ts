import Snake from './Snake'

class Food{
    element:HTMLElement
    snake: Snake

    constructor(){
        this.element=document.getElementById('food')!
        this.snake = new Snake()
    }

    get X(){
        return this.element.offsetLeft
    }

    get Y(){
        return this.element.offsetTop
    }

    change(){
        let left = Math.round(Math.random() * 29 ) * 10
        let top = Math.round(Math.random() * 29 ) * 10
        for(let i = 1; i < this.snake.bodies.length; i++){
            let bd = this.snake.bodies[i]
            if(left === bd.offsetLeft && top === bd.offsetTop){
                this.change()
                break
            }else{
                this.element.style.left = left + 'px'
                this.element.style.top = top + 'px'
            }
        }
    }
}

export default Food