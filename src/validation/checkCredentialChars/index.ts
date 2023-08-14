import { ValidationErrorCode } from 'atw-shared/utils'
import { hasCredentialAllCharsValid } from 'atw-shared/validation/index'

export default (isPassword?: boolean) => ({
  type: 'checkCredentialChars',
  message: ValidationErrorCode.InvalidChar,
  validator: (value: string) => hasCredentialAllCharsValid(value, isPassword),
})
