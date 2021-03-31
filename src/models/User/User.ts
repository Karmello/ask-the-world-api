import mongoose, { Error } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import moment from 'moment/moment'
import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'

import {
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from 'shared/utils/index'

import {
  checkEmail,
  checkAlphaChars,
  checkMinLength,
  checkMaxLength,
  checkDateOfBirth,
  checkCountry,
  checkSex,
} from 'validation/index'

import { USER_MIN_AGE, DOB_FORMAT_PATTERN } from 'shared/utils/index'
import dict from 'shared/validation/dictionary'
import { IUserDoc, ModelName, SALT_ROUNDS } from 'utils/index'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    registeredAt: {
      type: Number,
      required: true,
      default: moment().unix() * 1000,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
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
        checkAlphaChars(),
        checkMinLength(USERNAME_MIN_LENGTH),
        checkMaxLength(USERNAME_MAX_LENGTH),
      ],
    },
    password: {
      type: String,
      required: true,
      validate: [
        checkAlphaChars(true),
        checkMinLength(PASSWORD_MIN_LENGTH),
        checkMaxLength(PASSWORD_MAX_LENGTH),
      ],
    },
    dateOfBirth: {
      type: String,
      required: true,
      validate: [checkDateOfBirth(moment().add(-USER_MIN_AGE, 'years').format(DOB_FORMAT_PATTERN))],
    },
    country: {
      type: String,
      required: true,
      validate: [checkCountry],
    },
    sex: {
      type: String,
      required: true,
      validate: [checkSex],
    },
  },
  {
    versionKey: false,
  }
)

userSchema.plugin(uniqueValidator, { message: dict.alreadyTakenMsg })

userSchema.methods = {
  toJSON() {
    const user = this.toObject() as IUserDoc
    delete user.password
    return user
  },
  hashPassword(next: NextFunction) {
    const doc = this as IUserDoc
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
  const doc = this as IUserDoc
  doc.hashPassword(next)
})

export default model<IUserDoc>(ModelName.User, userSchema)
