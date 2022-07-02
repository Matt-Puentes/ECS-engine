import Component from './component'
import { Entity } from './entity'

// uses the "name" field in each component to populate the entity with either an array of components or a single component depending on if it allows
//  multiple of the same component type
type FilteredType<K extends { name: string, allowMultiple: true | false }> = {
    [P in K["name"]]: K extends { name: P } ? K["allowMultiple"] extends false ? K : K[] : never
};
type OptionalFilteredType<K extends { name: string, allowMultiple: boolean } = never> = {
    [P in K["name"]]?: K extends { name: P } ? K["allowMultiple"] extends false ? K : K[] : never
};

export default abstract class System<RequiredComponents extends Array<typeof Component>, OptionalComponents extends Array<typeof Component> = []> {
    priority = 0
    entityQueue: (FilteredType<InstanceType<RequiredComponents[number]>> & OptionalFilteredType<InstanceType<OptionalComponents[number]>>)[] = []
    constructor(private requiredComponents: (typeof Component)[]) { }
    abstract handleEntites(): void
    clearEntites() { this.entityQueue = [] }
    // Checks to make sure every required component has an entry on the object
    filter(entity: Entity): boolean {
        return this.requiredComponents.map((component) => Object.keys(entity).includes(pascalToCamelCase(component.name))).every(v => v === true)
    }

    debugFilter(entity: Entity): boolean {
        const results = []
        for (const reqComp of this.requiredComponents) {
            const name = pascalToCamelCase(reqComp.name)
            console.log("Checking for component ", name)

            const keys = Object.keys(entity)
            console.log("entity ", keys)

            results.push(name in keys)
        }

        return results.every(v => v)
    }

}

// TODO: Put this in a util/helpers function somewhere?
function pascalToCamelCase(str: string): string {
    if (str.length === 0)
        return str
    return str.charAt(0).toLowerCase() + str.slice(1)
}