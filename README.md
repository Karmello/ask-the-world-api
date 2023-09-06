[![master](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml/badge.svg)](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml)

# Ask The World API

## Account

```mermaid
flowchart LR
ROOT[<b>Account</b>] --> A1[<b>Activate</b>] --> A2[GET /account/activate]
ROOT --> B1[<b>Deactivate</b>] --> B2[GET /account/deactivate]
ROOT --> C1[<b>EnablePasswordRecovery</b>] --> C2[GET /account/password-recovery]
ROOT --> D1[<b>GetActivationLink</b>] --> D2[GET /account/activation-link]
ROOT --> E1[<b>GetDeactivationLink</b>] --> E2[GET /account/deactivation-link]
ROOT --> F1[<b>GetRecoveryLink</b>] --> F2[POST /account/recovery-link]
ROOT --> G1[<b>MakePayment</b>] --> G2[POST /account/payment]
```

## User

```mermaid
flowchart LR
ROOT[<b>User</b>] --> A1[<b>Authenticate</b>] --> A2[POST /user/authenticate]
ROOT --> B1[<b>Get</b>] --> B2[GET /user]
ROOT --> C1[<b>GetActivity</b>] --> C2[GET /user/activity]
ROOT --> D1[<b>GetTop</b>] --> D2[GET /users/top]
ROOT --> E1[<b>RecoverPassword</b>] --> E2[PUT /user/password/recover]
ROOT --> F1[<b>Register</b>] --> F2[POST /user/register]
ROOT --> G1[<b>Update</b>] --> G2[PUT /user/update]
ROOT --> H1[<b>UpdateAvatar</b>] --> H2[POST /user/avatar/update]
ROOT --> I1[<b>UpdatePassword</b>] --> I2[PUT /user/password/update]
```

## List of questions

```mermaid
flowchart LR
ROOT[<b>List of questions</b>] --> A1[<b>GetQuestions</b>] --> A2[GET /questions]
ROOT --> B1[<b>GetRandomQuestions</b>] --> B2[GET /questions/random]
```

## Question

```mermaid
flowchart LR
ROOT[<b>Question</b>] --> A1[<b>Create</b>] --> A2[POST /question/create]
ROOT --> B1[<b>Delete</b>] --> B2[DELETE /question/delete]
ROOT --> C1[<b>Get</b>] --> C2[GET /question]
ROOT --> D1[<b>GetCategories</b>] --> D2[GET /question/categories]
ROOT --> E1[<b>Terminate</b>] --> E2[PUT /question/terminate]
```

## Answer

```mermaid
flowchart LR
ROOT[<b>Answer</b>] --> A1[<b>Create</b>] --> A2[POST /answer/create]
ROOT --> B1[<b>Update</b>] --> B2[PUT /answer/update]
```
