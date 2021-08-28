# Ask The World API

#### Endpoints by DB entity

- USER

    | Name | Method | Auth required | Confirmation required | Payment required | Description |
    |------|:------:|:-------------:|:---------------------:|:----------------:|-------------|
    | AuthenticateUser | POST | ✔ ||| Authenticates user by JWT or username and password |
    | RegisterUser | POST |||| Creates new user with unique email and username |
    | GetActivationLink | GET | ✔ ||| Sends email confirmation link to user's mailbox |
    | GetDeactivationLink | GET | ✔ ||| Sends account deactivation link to user's mailbox |
    | ActivateUser | GET | ✔ ||| Called by clicking an activation link, confirms user's email |
    | DeactivateUser | GET | ✔ ||| Called by clicking deactivation link, removes user as well as his questions and answers  |
    | ReadUser | GET | ✔ ||| Gets user's object excluding password |
    | UpdateUser | PUT | ✔ ||| Updates user's personal details |
    | UpdatePassword | PUT | ✔ ||| Updates user's password |
    | UpdatePayment | PUT | ✔ | ✔ || Stores payment info |

- QUESTION

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | CreateQuestion | POST | ✔ | ✔ | ✔ |
    | ReadQuestion | GET ||||
    | ReadQuestions (all) | GET ||||
    | ReadQuestions (filtered) | GET | ✔ | ✔ | ✔ |
    | DeleteQuestion | DELETE | ✔ | ✔ | ✔ |

- ANSWER

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | CreateAnswer | POST | ✔ | ✔ ||
    | UpdateAnswer | GET | ✔ | ✔ ||

- FOLLOW

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | CreateFollow | POST | ✔ | ✔ | ✔ |
    | DeleteFollow | DELETE | ✔ | ✔ | ✔ |

- REPORT

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | CreateReport | POST | ✔ | ✔ | ✔ |

- STATS

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | ReadStats | GET ||||

#### Rules for specific endpoints

- GET ReadQuestions (filtered)

    | Filter | Only by requestor |
    |--------|:------:|
    | Created ||
    | Followed | ✔ |
    | Answered | ✔ |
    | Not answered | ✔ |
