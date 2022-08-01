import dict from 'atw-shared/validation/dictionary'
import { isStringTooShort } from 'atw-shared/validation/index'

export default (min: number) => ({
  type: 'checkMinLength',
  message: dict.getMinLengthMsg(min),
  validator: (value: string) => !isStringTooShort(value, min),
})
