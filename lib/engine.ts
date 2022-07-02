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
        for (const entity of this.game.entities) {
            let hasBeenHandled = false
            for (const system of this.game.systems) {
                if (system.filter(entity)) {
                    system.entityQueue.push(entity)
                    hasBeenHandled = true
                }
            }
            if (!hasBeenHandled && this.options.debug) {
                console.log("no system matching this entity")
                console.log(entity)
            }
        }

        // sort the systems in priority-order, high to low
        this.game.systems.sort((a, b) => b.priority - a.priority)

        for (const system of this.game.systems) {
            system.handleEntites()
            system.clearEntites()
        }

        requestAnimationFrame(this.update.bind(this))
    }
}
