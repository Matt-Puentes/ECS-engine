import System from "../system"
import { Position, Color, Shape } from '../components'

type DisplayOptions = { show?: true }
const requiredComponents = [Position, Shape]
const optionalComponents = [Color]
export default class DisplaySystem extends System<typeof requiredComponents, typeof optionalComponents> {
    canvas: HTMLCanvasElement
    options?: DisplayOptions
    context: CanvasRenderingContext2D

    constructor(canvasID: string, options?: DisplayOptions) {
        super(requiredComponents)
        this.options = options
        const canvas = document.getElementById(canvasID);
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas
        } else if (canvas === null) {
            throw Error("No element found with ID " + canvasID)
        } else {
            throw Error(`Element with ID ${canvasID} is of type ${typeof canvas}, not ${HTMLCanvasElement}`)
        }
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    drawCircle(x: number, y: number, r: number) {
        this.context.beginPath()
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.stroke()
    }

    handleEntites() {
        for (const entity of this.entityQueue) {
            console.log(`drawing circle, ${entity.position.x}, ${entity.position.y}`)
            this.drawCircle(entity.position.x, entity.position.y, 5)
        }
    }
}
