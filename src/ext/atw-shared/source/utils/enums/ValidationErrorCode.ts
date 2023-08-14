enum ValidationErrorCode {
  Required = 'REQUIRED',
  Incorrect = 'INCORRECT',
  Invalid = 'INVALID',
  InvalidChar = 'INVALID_CHAR',
  IncorrectCredentials = 'INCORRECT_CREDENTIALS',
  IncorrectPassword = 'INCORRECT_PASSWORD',
  AlreadyTaken = 'ALREADY_TAKEN',
  NoSuchEmail = 'NO_SUCH_EMAIL',
  MinLength = 'MIN_LENGTH',
  MaxLength = 'MAX_LENGTH',
}

export default ValidationErrorCode
