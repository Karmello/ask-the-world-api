export default (value: string, isPassword?: boolean): boolean => {
  let pattern = isPassword ? /^([a-zA-Z0-9-_!?@#$%&]+)$/ : /^([a-zA-Z0-9_]+)$/
  return new RegExp(pattern).test(value)
}
