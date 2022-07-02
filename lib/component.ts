export default abstract class Component {
    name: string;
    // Whether or not you can have multiple of these components on an object.
    allowMultiple: true | false = true as const;
    // This is required so that typescript doesn't get angry about arguments mismatching between Component and classes that extend Component
    // eslint-disable-next-line @typescript-eslint/no-empty-function,  @typescript-eslint/no-unused-vars
    constructor(..._args: never) { }
}