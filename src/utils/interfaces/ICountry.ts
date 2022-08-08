import { Document } from 'mongoose'
import { ICountry } from 'atw-shared/utils/index'

export interface ICountryDoc extends ICountry, Document {}
