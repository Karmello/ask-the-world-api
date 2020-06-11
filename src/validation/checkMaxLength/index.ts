import dict from 'shared/validation/dictionary'
import { isStringNotTooLong } from 'shared/validation/index'

export default (max: number) => ({
  type: 'checkMaxLength',
  message: dict.getMaxLengthMsg(max),
  validator: (value: string) => isStringNotTooLong(value, max),
})
