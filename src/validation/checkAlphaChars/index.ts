import dict from 'shared/validation/dictionary'
import { doesStringNotContainAlphaChars } from 'shared/validation/index'

export default (isPassword?: boolean) => ({
  type: 'checkAlphaChars',
  message: dict.invalidCharMsg,
  validator: (value: string) => doesStringNotContainAlphaChars(value, isPassword),
})
