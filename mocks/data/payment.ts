export default {
  id: '6JW36652YF3557207',
  status: 'COMPLETED',
  purchase_units: [
    {
      reference_id: 'default',
      shipping: {
        name: {
          full_name: 'John Doe',
        },
        address: {
          address_line_1: 'Lul. Dubois Stanisława 121',
          admin_area_2: 'Łódź',
          admin_area_1: ' ',
          postal_code: '93-474',
          country_code: 'PL',
        },
      },
      payments: {
        captures: [
          {
            id: '8UW00635BT1847038',
            status: 'COMPLETED',
            amount: {
              currency_code: 'PLN',
              value: '15.00',
            },
            final_capture: true,
            seller_protection: {
              status: 'ELIGIBLE',
              dispute_categories: ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION'],
            },
            create_time: '2021-08-31T19:56:10Z',
            update_time: '2021-08-31T19:56:10Z',
          },
        ],
      },
    },
  ],
  payer: {
    name: {
      given_name: 'John',
      surname: 'Doe',
    },
    email_address: 'sb-92zjv5441430@personal.example.com',
    payer_id: 'JV6YZNMCR9MV2',
    address: {
      country_code: 'PL',
    },
  },
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v2/checkout/orders/6JW36652YF3557207',
      rel: 'self',
      method: 'GET',
    },
  ],
}
