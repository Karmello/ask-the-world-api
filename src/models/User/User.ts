import mongoose, { Error } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { format } from 'date-fns'

import {
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USER_MIN_DATE_OF_BIRTH,
} from 'atw-shared/utils/index'

import {
  checkEmail,
  checkCredentialChars,
  checkMinLength,
  checkMaxLength,
  checkDateOfBirth,
  checkDateFormat,
  checkSex,
} from 'validation/index'

import { DATE_FORMAT, IUser, ValidationErrorCode } from 'atw-shared/utils/index'
import { IUserDoc, ModelName, SALT_ROUNDS } from 'utils/index'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, ValidationErrorCode.Required],
      unique: true,
      validate: [checkEmail, checkMaxLength(EMAIL_MAX_LENGTH)],
    },
    username: {
      type: String,
      required: [true, ValidationErrorCode.Required],
      unique: true,
      validate: [
        checkCredentialChars(),
        checkMinLength(USERNAME_MIN_LENGTH),
        checkMaxLength(USERNAME_MAX_LENGTH),
      ],
    },
    password: {
      type: String,
      required: [true, ValidationErrorCode.Required],
      validate: [
        checkCredentialChars(true),
        checkMinLength(PASSWORD_MIN_LENGTH),
        checkMaxLength(PASSWORD_MAX_LENGTH),
      ],
    },
    dateOfBirth: {
      type: String,
      required: [true, ValidationErrorCode.Required],
      validate: [
        checkDateFormat,
        checkDateOfBirth(USER_MIN_DATE_OF_BIRTH, format(new Date(), DATE_FORMAT)),
      ],
    },
    country: {
      ref: ModelName.Country,
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
      validate: [checkSex],
    },
    config: {
      registeredAt: {
        type: Number,
        required: true,
        default: Date.now,
      },
      confirmed: {
        type: Boolean,
        required: true,
        default: false,
      },
      payment: {},
    },
  },
  {
    versionKey: false,
  }
)

userSchema.plugin(uniqueValidator, { message: ValidationErrorCode.AlreadyTaken })

userSchema.methods = {
  toJSON() {
    const user = this.toObject() as IUser
    delete user.password
    return user
  },
  hashPassword(next: NextFunction) {
    const doc = this as unknown as IUserDoc
    if (!doc.isModified('password')) {
      next()
    } else {
      bcrypt.hash(doc.password, SALT_ROUNDS).then((hash: string) => {
        doc.password = hash
        next()
      })
    }
  },
  comparePasswords(current: string, cb: (err?: Error, isMatch?: boolean) => void) {
    bcrypt.compare(current, this.password, (err: Error, isMatch) => cb(err, isMatch))
  },
}

userSchema.pre('save', function (next: NextFunction) {
  const doc = this as unknown as IUserDoc
  doc.hashPassword(next)
})

export default model<IUserDoc>(ModelName.User, userSchema)
