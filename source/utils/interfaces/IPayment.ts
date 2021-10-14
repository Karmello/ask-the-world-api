interface IPayment {
  type: string
  data: {
    object: {
      receipt_url: string
    }
    billing_details: {
      email: string
    }
  }
}

export default IPayment
