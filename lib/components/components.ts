import Component from "../component"

// Note on component naming:
// When defining a new component, the "name" field of the component must be the camelCase version of the PascalCase class name.
// Additionally, the name must be defined "as const".
// These names are used to populate the key:value pairs of the entities, and are used by the typesystem to provide intellisense in each Service.

export class Position extends Component {
    name = "position" as const
    allowMultiple = false as const
    constructor(public x: number, public y: number) {
        super()
    }
}

export class Color extends Component {
    name = "color" as const
    allowMultiple = false as const
    constructor(public c: string) {
        super()
    }
}

export abstract class Shape extends Component {
    name = "shape" as const;
    allowMultiple = true as const;
    zIndex = 0
}
export class CircleShape extends Shape {
    name = "shape" as const
    constructor(public radius: number, public zIndex = 0) {
        super()
    }
}
export class RectangleShape extends Shape {
    name = "shape" as const
    constructor(public width: number, public height?: number, public zIndex = 0) {
        super()
    }
}

export class Control extends Component {
    name = "control" as const
    constructor(
        public keys: string[],
        public repeat = false,
        public isdown = false
    ) {
        super()
    }
}

export class MoveControls extends Component {
    name = "moveControls" as const
    allowMultiple = false as const;
    constructor(
        public position: Position,
        public upKey?: Control,
        public downKey?: Control,
        public leftKey?: Control,
        public rightKey?: Control
    ) {
        super()
    }
}