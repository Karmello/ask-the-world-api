# Ask The World API

#### Endpoints by DB entity

- USER

    | Name | Method | Auth required | Confirmation required | Payment required |
    |------|:------:|:-------------:|:---------------------:|:----------------:|
    | AuthenticateUser | POST | ✔ |||
    | RegisterUser | POST ||||
    | ActivateUser | GET | ✔ |||
    | DeactivateUser | GET | ✔ |||
    | GetActivationLink | GET | ✔ |||
    | GetDeactivationLink | GET | ✔ |||
    | ReadUser | GET | ✔ |||
    | UpdateUser | PUT | ✔ |||
    | UpdatePassword | PUT | ✔ |||
    | UpdatePayment | PUT | ✔ | ✔ ||

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

    | Filter | By another user |
    |--------|:------:|
    | All ||
    | Created | ✔ |
    | Followed | ✘ |
    | Answered | ✘ |
    | Not answered | ✘ |
