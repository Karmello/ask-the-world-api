export default (value: string): boolean => new RegExp(/\S+@\S+\.\S+/).test(value)
