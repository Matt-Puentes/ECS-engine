import Game from '../lib/game'
import { newEntity } from "../lib/entity"
import { Position, Color, CircleShape, RectangleShape, MoveControls, Control } from '../lib/components'
import { DisplaySystem, MoveSystem } from "../lib/systems"
import Engine from '../lib/engine'
import { ControlSystem } from '../lib/systems'


class MyGame extends Game {
    constructor() {
        super()
        this.systems.push(new DisplaySystem("canvas", 1920, 1060))
        this.systems.push(new ControlSystem())
        this.systems.push(new MoveSystem())
        this.createEntities()
    }

    createEntities() {
        console.log("Populating game with entities")

        // Define character entity
        const pos = new Position(10, 10)
        const wKey = new Control(['w'])
        const sKey = new Control(['s'])
        const aKey = new Control(['a'])
        const dKey = new Control(['d'])
        this.entities.push(newEntity(pos,
            new RectangleShape(10),
            new RectangleShape(11),
            new RectangleShape(12),
            new CircleShape(10),
            new Color('blue'),
            wKey,
            sKey,
            aKey,
            dKey,
            new MoveControls(pos, wKey, sKey, aKey, dKey) // Is there a better way to define "dependencies"?
        ))

        // Define other entities
        this.entities.push(newEntity(new Position(30, 10), new CircleShape(5)))

        this.entities.push(newEntity(new Position(200, 200), new CircleShape(30)))

        this.entities.push(newEntity(new Position(10, 30), new CircleShape(5), new Color('yellow')))

    }
}

function start() {
    console.log("index.ts being run")
    const game = new MyGame()
    const engine = new Engine(game, { debug: true })
    engine.start()
}

start()