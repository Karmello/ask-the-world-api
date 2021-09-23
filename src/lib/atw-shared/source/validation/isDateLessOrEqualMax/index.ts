export default (value: string, maxDate: string): boolean => new Date(value) <= new Date(maxDate)
