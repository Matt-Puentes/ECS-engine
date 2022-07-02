import System from "../system"
import { Position, Color, Shape, CircleShape, RectangleShape } from '../components'

type DisplayOptions = { displayWidth?: number, displayHeight?: number }
const requiredComponents = [Position, Shape]
const optionalComponents = [Color]
export default class DisplaySystem extends System<typeof requiredComponents, typeof optionalComponents> {
    canvas: HTMLCanvasElement
    options?: DisplayOptions
    context: CanvasRenderingContext2D

    constructor(canvasID: string, width: number, height: number, options?: DisplayOptions) {
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
        this.canvas.height = height
        this.canvas.width = width
    }

    drawCircle(x: number, y: number, r: number) {
        this.context.beginPath()
        // this.context.strokeStyle = "Red"
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.stroke()
    }

    // Centered Rectangle given a position and width and height. If height is ommitted, width and height are assumed to be equal.
    drawRect(x: number, y: number, width: number, height?: number) {
        const h = height ?? width
        // this.context.strokeStyle = "Red"
        this.context.rect(x - width / 2, y - h / 2, width, h)
        this.context.stroke()
    }

    clear() {
        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    handleEntites() {
        this.clear()

        for (const entity of this.entityQueue) {
            this.context.strokeStyle = entity.color ? entity.color.c + "" : "white";
            entity.shape.sort((a, b) => a.zIndex - b.zIndex)
            for (const shape of entity.shape) {
                if (shape instanceof CircleShape) {
                    this.drawCircle(entity.position.x, entity.position.y, shape.radius)
                }
                else if (shape instanceof RectangleShape) {
                    this.drawRect(entity.position.x, entity.position.y, shape.width, shape.height)
                }
                else {
                    // Default for undefined shapes
                    // TODO think of a better default I guess
                    this.drawCircle(entity.position.x, entity.position.y, 2)
                }
            }
        }
    }
}

