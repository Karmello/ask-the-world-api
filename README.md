# Ask The World API

#### Environment variables

| Name                   | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| MONGO_URI              | Mongo database connection string                            |
| AUTH_SECRET            | Authentication token signing secret                         |
| EMAIL_PASS             | Gmail account password                                      |
| STRIPE_PUBLISHABLE_KEY | Stripe credentials                                          |
| STRIPE_SECRET_KEY      | Stripe credentials                                          |

#### Rules for specific endpoints

- GET ReadQuestions (filtered)

    | Filter | Only by requestor |
    |--------|:------:|
    | Created ||
    | Followed | ✔ |
    | Answered | ✔ |
    | Not answered | ✔ |
