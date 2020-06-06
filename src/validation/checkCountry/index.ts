import dict from 'shared/validation/dictionary'
import { COUNTRIES } from 'shared/utils/index'

export default {
  type: 'checkCountry',
  message: dict.incorrectMsg,
  validator: (value: string) => COUNTRIES.some(item => item.value === value),
}
