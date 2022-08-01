import dict from 'atw-shared/validation/dictionary'
import { Sex } from 'atw-shared/utils/index'

export default {
  type: 'checkSex',
  message: dict.incorrectMsg,
  validator: (value: Sex) => [Sex.Female, Sex.Male].includes(value),
}
