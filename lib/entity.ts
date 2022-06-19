import Component from "./component"

export type Entity = { [key: string]: Component }
export function new_ent(...components: Component[]): Entity {
    const entity: { [key: string]: Component } = {}
    for (const component of components) {
        entity[component.name] = component
    }
    return entity
}