import dict from 'atw-shared/validation/dictionary'
import { hasCredentialAllCharsValid } from 'atw-shared/validation/index'

export default (isPassword?: boolean) => ({
  type: 'checkCredentialChars',
  message: dict.invalidCharMsg,
  validator: (value: string) => hasCredentialAllCharsValid(value, isPassword),
})
