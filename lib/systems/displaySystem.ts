import System from "../system"
import { Position, Color, Shape } from '../components'

type displayOptions = { show?: true }
const display_required_components = [Position, Shape]
const display_optional_components = [Color]
export default class DisplaySystem extends System<typeof display_required_components, typeof display_optional_components> {
    canvas: HTMLCanvasElement
    options?: displayOptions
    context: CanvasRenderingContext2D

    constructor(canvas_id: string, options?: displayOptions) {
        super(display_required_components)
        this.options = options
        const canvas = document.getElementById(canvas_id);
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas
        } else if (canvas === null) {
            throw Error("No element found with ID " + canvas_id)
        } else {
            throw Error(`Element with ID ${canvas_id} is of type ${typeof canvas}, not ${HTMLCanvasElement}`)
        }
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    drawCircle(x: number, y: number, r: number) {
        this.context.beginPath()
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.stroke()
    }

    handle_entites() {
        for (const entity of this.entity_queue) {
            console.log(`drawing circle, ${entity.position.x}, ${entity.position.y}`)
            this.drawCircle(entity.position.x, entity.position.y, 5)
        }
    }
}
