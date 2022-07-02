import System from "../system"
import { MoveControls } from '../components'

const requiredComponents = [MoveControls]

export default class MoveSystem extends System<typeof requiredComponents> {
    priority = 1 // after controlSystem
    constructor() {
        super(requiredComponents)
    }

    handleEntites() {
        for (const entity of this.entityQueue) {
            if (entity.moveControls.upKey?.isdown) {
                entity.moveControls.position.y -= 1
            }
            if (entity.moveControls.downKey?.isdown) {
                entity.moveControls.position.y += 1
            }
            if (entity.moveControls.rightKey?.isdown) {
                entity.moveControls.position.x += 1
            }
            if (entity.moveControls.leftKey?.isdown) {
                entity.moveControls.position.x -= 1
            }
        }
    }
}
