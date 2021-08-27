# Ask The World API

#### USER

| Name | Method | Auth required |
| ------ | ------ | ------ |
| AuthenticateUser | POST | ✔ |
| RegisterUser | POST ||
| ActivateUser | GET | ✔ |
| DeactivateUser | GET | ✔ |
| GetActivationLink | GET | ✔ |
| GetDeactivationLink | GET | ✔ |
| ReadUser | GET | ✔ |
| UpdateUser | PUT | ✔ |
| UpdatePassword | PUT | ✔ |
| UpdatePayment | PUT | ✔ |

#### QUESTION

| Name | Method | Auth required |
| ------ | ------ | ------ |
| CreateQuestion | POST | ✔ |
| ReadQuestion | GET ||
| ReadQuestions | GET ||
| DeleteQuestion | DELETE | ✔ |

#### ANSWER

| Name | Method | Auth required |
| ------ | ------ | ------ |
| CreateAnswer | POST | ✔ |
| UpdateAnswer | GET | ✔ |

#### FOLLOW

| Name | Method | Auth required |
| ------ | ------ | ------ |
| CreateFollow | POST | ✔ |
| DeleteFollow | DELETE | ✔ |

#### REPORT

| Name | Method | Auth required |
| ------ | ------ | ------ |
| CreateReport | POST | ✔ |
