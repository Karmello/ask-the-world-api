import dict from 'atw-shared/validation/dictionary'
import { isDateFormatValid } from 'atw-shared/validation/index'

export default {
  type: 'checkDateFormat',
  message: dict.invalidMsg,
  validator: (value: string) => isDateFormatValid(value),
}
