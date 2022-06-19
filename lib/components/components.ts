import Component from "../component"

export class Position extends Component {
    name = "position" as const
    constructor(public x: number, public y: number) {
        super()
    }
}
export class Color extends Component {
    name = "color" as const
    constructor(public c: number) {
        super()
    }
}
export class Shape extends Component {
    name = "shape" as const
    constructor(public shape: "rectangle" | "circle") {
        super()
    }
}
