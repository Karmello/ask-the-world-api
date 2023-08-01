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

import { DATE_FORMAT, IUser } from 'atw-shared/utils/index'
import { IUserDoc, ModelName, SALT_ROUNDS } from 'utils/index'
import dict from 'atw-shared/validation/dictionary'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [checkEmail, checkMaxLength(EMAIL_MAX_LENGTH)],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: [
        checkCredentialChars(),
        checkMinLength(USERNAME_MIN_LENGTH),
        checkMaxLength(USERNAME_MAX_LENGTH),
      ],
    },
    password: {
      type: String,
      required: true,
      validate: [
        checkCredentialChars(true),
        checkMinLength(PASSWORD_MIN_LENGTH),
        checkMaxLength(PASSWORD_MAX_LENGTH),
      ],
    },
    dateOfBirth: {
      type: String,
      required: true,
      validate: [
        checkDateFormat,
        checkDateOfBirth('1900-01-01', format(new Date(), DATE_FORMAT)),
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

userSchema.plugin(uniqueValidator, { message: dict.alreadyTakenMsg })

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
