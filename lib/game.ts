import System from "./system"
import { Entity } from "./entity"

export default abstract class Game {
    systems: System<[]>[] = []
    entities: Entity[] = []
}
