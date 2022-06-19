import Component from './component'
import { Entity } from './entity'

type FilteredType<K extends { name: string }> = {
    [P in K["name"]]: K extends { name: P } ? K : never
};
type OptionalFilteredType<K extends { name: string } = never> = {
    [P in K["name"]]?: K extends { name: P } ? K : never
};

export default abstract class System<RequiredComponents extends Array<typeof Component>, OptionalComponents extends Array<typeof Component> = []> {
    entityQueue: (FilteredType<InstanceType<RequiredComponents[number]>> & OptionalFilteredType<InstanceType<OptionalComponents[number]>>)[] = []
    constructor(private requiredComponents: (typeof Component)[]) { }
    abstract handleEntites(): void
    // Checks to make sure every required component has an entry on the object
    filter(entity: Entity): boolean {
        return this.requiredComponents.map((component) => Object.keys(entity).includes(component.name.toLowerCase())).every(v => v === true)
    }
}