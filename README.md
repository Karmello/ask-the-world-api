# Ask The World API

#### Endpoints by DB entity

- USER

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | AuthenticateUser | POST | ✔ ||| Authenticates user by JWT or username and password |
    | RegisterUser | POST |||| Creates new user with unique email and username |
    | MakePayment | POST | ✔ | ✔ || Captures payment using Paypal and stores payment info in User document |
    | GetActivationLink | GET | ✔ ||| Sends email confirmation link to user's mailbox, link contains email confirmation token |
    | GetDeactivationLink | GET | ✔ ||| Sends account deactivation link to user's mailbox |
    | ActivateUser | GET | ✔ ||| Called by clicking an activation link, confirms user's email |
    | DeactivateUser | GET | ✔ ||| Called by clicking deactivation link, removes user as well as his questions and answers  |
    | ReadUser | GET | ✔ ||| Gets user's object excluding password |
    | UpdateUser | PUT | ✔ ||| Updates user's personal details |
    | UpdatePassword | PUT | ✔ ||| Updates user's password |

- QUESTION

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | CreateQuestion | POST | ✔ | ✔ | ✔ | Creates new question |
    | ReadQuestion | GET |||| Gets a single question object |
    | ReadQuestions (all) | GET |||| Gets limited number of questions from list of all questions |
    | ReadQuestions (filtered) | GET | ✔ | ✔ | ✔ | Gets limited number of questions from filtered list of questions |
    | DeleteQuestion | DELETE | ✔ | ✔ | ✔ | Deletes question and its answers |

- ANSWER

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | CreateAnswer | POST | ✔ | ✔ || Creates new answer |
    | UpdateAnswer | GET | ✔ | ✔ || Updates existing answer |

- FOLLOW

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | CreateFollow | POST | ✔ | ✔ | ✔ | Creates new follow |
    | DeleteFollow | DELETE | ✔ | ✔ | ✔ | Deletes existing follow |

- REPORT

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | CreateReport | POST | ✔ | ✔ | ✔ | Creates new report |

- STATS

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | ReadStats | GET |||| Gets overall statistics |

#### Rules for specific endpoints

- GET ReadQuestions (filtered)

    | Filter | Only by requestor |
    |--------|:------:|
    | Created ||
    | Followed | ✔ |
    | Answered | ✔ |
    | Not answered | ✔ |
