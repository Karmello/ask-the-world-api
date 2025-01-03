import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'

import { getRandNum } from 'atw-shared/helpers'
import { IUser, Sex } from 'atw-shared/utils'

import payment from './paymentMock'
import countries from './countryMocks'

const password = '$2a$10$8kcJdl16EMupO2cmLFAsf.jVWkFaCV5W47Mip6BMfwUJjLM6/J0n2'

const basicUsers = [
  {
    _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
    email: 'michael.jordan@gmail.com',
    username: 'michaeljordan',
    password,
    dateOfBirth: '1963-02-17',
    country: 'US',
    sex: 'M',
    config: {
      registeredAt: 1592498017000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5f5fa30b3007ef1388d93483'),
    email: 'sasha_grey@gmail.com',
    username: 'sashagrey',
    password,
    dateOfBirth: '1988-03-14',
    country: 'US',
    sex: 'F',
    config: {
      registeredAt: 1600103179000.0,
      confirmed: true,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5eeb989252c1dc555c2d676e'),
    email: 'sophie.dee@gmail.com',
    username: 'sophiedee',
    password,
    dateOfBirth: '1984-01-17',
    country: 'GB',
    sex: 'F',
    config: {
      registeredAt: 1592498322000.0,
      confirmed: false,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5eeb97db52c1dc555c2d676d'),
    email: 'donald.trump@gmail.com',
    username: 'donald_trump',
    password,
    dateOfBirth: '1946-06-14',
    country: 'US',
    sex: 'M',
    config: {
      registeredAt: 1592498139000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5eeb992452c1dc555c2d676f'),
    email: 'christian.bale@gmail.com',
    username: 'christian_bale',
    password,
    dateOfBirth: '1974-01-30',
    country: 'GB',
    sex: 'M',
    config: {
      registeredAt: 1592498468000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5eeb997a52c1dc555c2d6770'),
    email: 'pamela.anderson@gmail.com',
    username: 'pamanderson',
    password,
    dateOfBirth: '1967-07-01',
    country: 'CA',
    sex: 'F',
    config: {
      registeredAt: 1592498554000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5f1323de496a686a844eb086'),
    email: 'batman@gotham.com',
    username: 'batman',
    password,
    dateOfBirth: '1963-02-19',
    country: 'US',
    sex: 'M',
    config: {
      registeredAt: 1595089886000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5f5fa221fd74bf1121704a85'),
    email: 'marshall@eminem.com',
    username: 'eminem',
    password,
    dateOfBirth: '1972-10-17',
    country: 'US',
    sex: 'M',
    config: {
      registeredAt: 1600102945000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5f5fa29b49a6a31058a6f57f'),
    email: 'benny_hill@gmail.uk',
    username: 'bennyhill',
    password,
    dateOfBirth: '1924-01-24',
    country: 'GB',
    sex: 'M',
    config: {
      registeredAt: 1600103067000.0,
      confirmed: true,
      payment,
    },
  },
  {
    _id: new mongoose.Types.ObjectId('5f5fa3e93e9cb7f1c82739da'),
    email: 'picasso@gmail.com',
    username: 'picasso',
    password,
    dateOfBirth: '1881-10-24',
    country: 'ES',
    sex: 'M',
    config: {
      registeredAt: 1600103401000.0,
      confirmed: true,
      payment,
    },
  },
]

const NUM_OF_DEFAULT_USERS = 5

const COUNTRY_KEYS = countries.map(c => c._id)

const defaultUsers = (() => {
  const arr = [] as IUser[]
  for (let i = 0; i < NUM_OF_DEFAULT_USERS; i++) {
    arr.push({
      _id: new mongoose.Types.ObjectId(),
      email: `user_${i + 1}@mail.com`,
      username: `username_${i + 1}`,
      password,
      dateOfBirth: '2000-01-01',
      country: COUNTRY_KEYS[getRandNum(0, COUNTRY_KEYS.length - 1)],
      sex: ['M', 'F'][getRandNum(0, 1)] as Sex,
      config: {
        registeredAt: new Date(
          faker.date.between({
            from: '2010-01-01',
            to: '2020-01-01',
          })
        ).getTime(),
        confirmed: true,
        payment,
      },
    })
  }
  return arr
})()

const userMocks = [...basicUsers, ...defaultUsers] as IUser[]

export default userMocks
