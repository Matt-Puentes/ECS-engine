export default abstract class Component {
    name: string
    // This is required so that typescript doesn't get angry about arguments mismatching between Component and classes that extend Component
    // eslint-disable-next-line @typescript-eslint/no-empty-function,  @typescript-eslint/no-unused-vars
    constructor(..._args: never) { }
}