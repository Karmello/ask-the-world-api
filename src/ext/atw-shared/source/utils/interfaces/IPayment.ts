import AccountStatus from '../enums/AccountStatus'

interface IPayment {
  type: string | AccountStatus
  data?: {
    object: {
      receipt_url: string
      billing_details: {
        email: string
      }
    }
  }
}

export default IPayment
