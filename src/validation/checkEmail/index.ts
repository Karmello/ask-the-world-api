import dict from 'shared/validation/dictionary'
import { isValidEmail } from 'shared/validation/index'

export default {
  type: 'checkEmail',
  message: dict.invalidMsg,
  validator: (value: string) => isValidEmail(value),
}
