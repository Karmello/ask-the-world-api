import dict from 'shared/validation/dictionary'
import { isEmailValid } from 'shared/validation/index'

export default {
  type: 'checkEmail',
  message: dict.invalidMsg,
  validator: (value: string) => isEmailValid(value),
}
