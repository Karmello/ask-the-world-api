import dict from 'atw-shared/validation/dictionary'
import { isEmailValid } from 'atw-shared/validation/index'

export default {
  type: 'checkEmail',
  message: dict.invalidMsg,
  validator: (value: string) => isEmailValid(value),
}
