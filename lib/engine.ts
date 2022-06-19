import Game from './game'

type EngineOptions = {
    debug?: boolean
}

export default class Engine {
    runnning = true
    constructor(private game: Game, private options: EngineOptions = {}) { }
    start() {
        this.update()
    }
    update() {
        console.log("update1000")
        for (const entity of this.game.entities) {
            let hasBeenHandled = false
            for (const system of this.game.systems) {
                if (system.filter(entity)) {
                    system.entity_queue.push(entity)
                    hasBeenHandled = true
                }
            }
            if (!hasBeenHandled && this.options.debug) {
                console.log("no system matching this entity")
                console.log(entity)
            }
        }
        for (const system of this.game.systems) {
            system.handle_entites()
        }
        // requestAnimationFrame(this.update.bind(this))
    }
}
