[![master](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml/badge.svg)](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml)

# Ask The World API

## Account (FE requests)

```mermaid
flowchart
ROOT[<b>Account</b>] --> |FE|A1[<b>GetActivationLink</b>] --> |GET|A2[account/activation-link]  --> |200|A3[Mail]
ROOT --> |FE|B1[<b>GetDeactivationLink</b>] --> |GET|B2[account/deactivation-link] --> |200|B3[Mail]
ROOT --> |FE|C1[<b>GetRecoveryLink</b>] --> |POST|C2[account/recovery-link] --> |200|C3[Mail]
```

## Account (mail link requests)

```mermaid
flowchart
ROOT[<b>Account</b>] --> |activation link|A1[<b>Activate</b>] --> |GET|A2[account/activate] --> |200|A3[Html template]
ROOT --> |deactivation link|B1[<b>Deactivate</b>] --> |GET|B2[account/deactivate] --> |200|B3[Html template]
ROOT --> |recovery link|C1[<b>EnablePasswordRecovery</b>] --> |GET|C2[account/password-recovery] --> |200|C3[Html template]
```

## Account (external services requests)

```mermaid
flowchart
ROOT[<b>Account</b>] --> |Stripe API|A1[<b>MakePayment</b>] --> |POST|A2[account/payment] --> |200|A3[empty]
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

## Follow

```mermaid
flowchart LR
ROOT[<b>Follow</b>] --> A1[<b>Create</b>] --> A2[POST /follow/create]
ROOT --> B1[<b>Delete</b>] --> B2[DELETE /follow/delete]
```

## Report

```mermaid
flowchart LR
ROOT[<b>Report</b>] --> A1[<b>Create</b>] --> A2[POST /report/create]
```

## Other

```mermaid
flowchart LR
ROOT[<b>Other</b>] --> A1[<b>GetCountries</b>] --> A2[GET /countries]
ROOT --> B1[<b>GetStats</b>] --> B2[GET /stats]
```
