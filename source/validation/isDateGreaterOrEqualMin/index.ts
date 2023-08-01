export default (value: string, minDate: string): boolean => new Date(value) >= new Date(minDate)
