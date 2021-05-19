import dict from 'shared/validation/dictionary'
import { isStringTooLong } from 'shared/validation/index'

export default (max: number) => ({
  type: 'checkMaxLength',
  message: dict.getMaxLengthMsg(max),
  validator: (value: string) => !isStringTooLong(value, max),
})
