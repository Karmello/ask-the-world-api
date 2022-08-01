import dict from 'atw-shared/validation/dictionary'
import { COUNTRIES } from 'atw-shared/utils/index'

export default {
  type: 'checkCountry',
  message: dict.incorrectMsg,
  validator: (value: string) => COUNTRIES.some(item => item.value === value),
}
