import Component from "./component"

export type Entity = { [key: string]: Component | Component[] }

export function newEntity(...components: Component[]): Entity {
    const entity: Entity = {}
    for (const component of components) {
        if (!component.allowMultiple) {
            entity[component.name] = component
        } else if (!(component.name in entity)) {
            entity[component.name] = [component]
        } else {
            (entity[component.name] as Component[]).push(component)
        }
    }
    return entity
}