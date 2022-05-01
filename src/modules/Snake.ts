class Snake{
    element: HTMLElement
    head: HTMLElement
    bodies: HTMLCollectionOf<HTMLElement>

    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }

    set X(value: number){
        if(this.X === value){
            return
        }
        if(value < 0 || value > 290){
            throw Error('蛇撞墙了')
        }
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }

    set Y(value: number){
        if(this.Y === value){
            return
        }
        if(value < 0 || value > 290){
            throw Error ('蛇撞墙了')
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    addBody(){
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }

    moveBody(){
        const length = this.bodies.length
        const lastBody = this.bodies[length - 1]
        lastBody.style.left = `${this.bodies[0].offsetLeft}px`
        lastBody.style.top = `${this.bodies[0].offsetTop}px`
        if (length > 2) this.element.insertBefore(lastBody, this.bodies[1])
    }

    checkHeadBody(){
        for(let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i]
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw Error('蛇撞到自己了')
            }
        }
    }
}

export default Snake