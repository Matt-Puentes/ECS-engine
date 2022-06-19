import Game from '../lib/game'
import { new_ent } from "../lib/entity"
import { Position, Shape, Color } from '../lib/components'
import { DisplaySystem } from "../lib/systems"
import Engine from '../lib/engine'

class MyGame extends Game {
    constructor() {
        super()
        this.systems.push(new DisplaySystem("canvas"))

        this.entities.push(new_ent(new Position(1, 2)))
        this.entities.push(new_ent(new Position(10, 10), new Shape("rectangle")))
        this.entities.push(new_ent(new Position(30, 10), new Shape("circle")))
        this.entities.push(new_ent(new Position(10, 30), new Shape("circle"), new Color(1)))
    }
}


const game = new MyGame()
const engine = new Engine(game)
engine.start()

// console.log("aaa")
