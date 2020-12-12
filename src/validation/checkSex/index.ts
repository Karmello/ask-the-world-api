import dict from 'shared/validation/dictionary'
import { Sex } from 'shared/utils/index'

export default {
  type: 'checkSex',
  message: dict.incorrectMsg,
  validator: (value: Sex) => [Sex.Female, Sex.Male].includes(value),
}
