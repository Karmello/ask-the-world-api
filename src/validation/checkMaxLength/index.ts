import dict from 'atw-shared/validation/dictionary'
import { isStringTooLong } from 'atw-shared/validation/index'

export default (max: number) => ({
  type: 'checkMaxLength',
  message: dict.getMaxLengthMsg(max),
  validator: (value: string) => !isStringTooLong(value, max),
})
