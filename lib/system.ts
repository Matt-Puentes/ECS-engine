import Component from './component'
import { Entity } from './entity'

type filteredType<K extends { name: string }> = {
    [P in K["name"]]: K extends { name: P } ? K : never
};
type optionalFilteredType<K extends { name: string } = never> = {
    [P in K["name"]]?: K extends { name: P } ? K : never
};

export default abstract class System<RequiredComponents extends Array<typeof Component>, OptionalComponents extends Array<typeof Component> = []> {
    entity_queue: (filteredType<InstanceType<RequiredComponents[number]>> & optionalFilteredType<InstanceType<OptionalComponents[number]>>)[] = []
    constructor(private required_components: (typeof Component)[]) { }
    abstract handle_entites(): void
    // Checks to make sure every required component has an entry on the object
    filter(entity: Entity): boolean {
        return this.required_components.map((component) => Object.keys(entity).includes(component.name.toLowerCase())).every(v => v === true)
    }
}