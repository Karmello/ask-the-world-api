import dict from 'shared/validation/dictionary'
import { isStringNotTooShort } from 'shared/validation/index'

export default (min: number) => ({
  type: 'checkMinLength',
  message: dict.getMinLengthMsg(min),
  validator: (value: string) => isStringNotTooShort(value, min),
})
