import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import moment from 'moment/moment'
import { NextFunction } from 'express'

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
  checkPastDate,
  checkCountry,
} from 'validation/index'

import { USER_MIN_AGE, DOB_FORMAT_PATTERN } from 'shared/utils/index'
import dict from 'shared/validation/dictionary'
import { IUser, ModelName, SALT_ROUNDS } from 'utils/index'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: [true, dict.requiredMsg],
      unique: true,
      validate: [checkEmail()],
    },
    username: {
      type: String,
      required: [true, dict.requiredMsg],
      unique: true,
      validate: [
        checkAlphaChars(),
        checkMinLength(USERNAME_MIN_LENGTH),
        checkMaxLength(USERNAME_MAX_LENGTH),
      ],
    },
    password: {
      type: String,
      required: [true, dict.requiredMsg],
      validate: [
        checkAlphaChars(true),
        checkMinLength(PASSWORD_MIN_LENGTH),
        checkMaxLength(PASSWORD_MAX_LENGTH),
      ],
    },
    dateOfBirth: {
      type: String,
      required: [true, dict.requiredMsg],
      validate: [checkPastDate(moment().add(-USER_MIN_AGE, 'years').format(DOB_FORMAT_PATTERN))],
    },
    country: {
      type: String,
      required: [true, dict.requiredMsg],
      validate: [checkCountry()],
    },
  },
  {
    versionKey: false,
  }
)

userSchema.methods = {
  toJSON: function () {
    const user = this.toObject() as IUser
    delete user.password
    return user
  },
  hashPassword: function (next: NextFunction) {
    const doc = this as IUser
    if (!doc.isModified('password')) {
      next()
    } else {
      bcrypt.hash(doc.password, SALT_ROUNDS).then((hash: string) => {
        doc.password = hash
        next()
      })
    }
  },
}

userSchema.pre('save', function (next: NextFunction) {
  const doc = this as IUser
  doc.hashPassword(next)
})

export default model(ModelName.User, userSchema)
