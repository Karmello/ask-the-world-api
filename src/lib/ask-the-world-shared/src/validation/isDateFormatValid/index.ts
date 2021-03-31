export default (value: string): boolean => new RegExp(/^\d{4}(-)\d{2}\1\d{2}$/).test(value)
