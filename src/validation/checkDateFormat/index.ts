import dict from 'shared/validation/dictionary'
import { isDateFormatValid } from 'shared/validation/index'

export default {
  type: 'checkDateFormat',
  message: dict.invalidMsg,
  validator: (value: string) => isDateFormatValid(value),
}
