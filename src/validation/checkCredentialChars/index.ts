import dict from 'shared/validation/dictionary'
import { hasCredentialAllCharsValid } from 'shared/validation/index'

export default (isPassword?: boolean) => ({
  type: 'checkCredentialChars',
  message: dict.invalidCharMsg,
  validator: (value: string) => hasCredentialAllCharsValid(value, isPassword),
})
