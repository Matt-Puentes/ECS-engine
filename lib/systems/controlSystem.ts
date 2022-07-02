import System from "../system"
import { Control } from '../components'

const requiredComponents = [Control]

export default class ControlSystem extends System<typeof requiredComponents> {
    keys: Record<string, boolean>
    priority = 2 // before movesystem
    constructor() {
        super(requiredComponents)
        this.keys = {}

        document.addEventListener('keydown', this.keyDown.bind(this))
        document.addEventListener('keyup', this.keyUp.bind(this))
    }

    handleEntites() {
        for (const entity of this.entityQueue) {
            for (const control of entity.control) {
                control.isdown = false
                for (const key of control.keys) {
                    // Checks if it exists and if it's truthy
                    if (this.keys[key]) {
                        control.isdown = true
                    }
                }
            }
        }
    }

    keyDown(e: KeyboardEvent) {
        if (!e.ctrlKey && !e.altKey && !e.metaKey) e.preventDefault();
        this.keys[e.key] = true;
    }
    keyUp(e: KeyboardEvent) {
        if (!e.ctrlKey && !e.altKey && !e.metaKey) e.preventDefault();
        this.keys[e.key] = false;
    }
}
