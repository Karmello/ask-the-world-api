import mongoose, { Error } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import moment from 'moment/moment'
import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'

import {
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
} from 'validation/index'

import { USER_MIN_AGE, DOB_FORMAT_PATTERN } from 'shared/utils/index'
import dict from 'shared/validation/dictionary'
import { IUserDoc, ModelName, SALT_ROUNDS } from 'utils/index'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [checkEmail],
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
  },
  {
    versionKey: false,
  }
)

userSchema.plugin(uniqueValidator, { message: dict.alreadyTakenMsg })

userSchema.methods = {
  toJSON: function () {
    const user = this.toObject() as IUserDoc
    delete user.password
    return user
  },
  hashPassword: function (next: NextFunction) {
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
  comparePasswords: function (current: string, cb: (err?: Error, isMatch?: boolean) => void) {
    bcrypt.compare(current, this.password, (err: Error, isMatch) => cb(err, isMatch))
  },
}

userSchema.pre('save', function (next: NextFunction) {
  const doc = this as IUserDoc
  doc.hashPassword(next)
})

export default model(ModelName.User, userSchema)
