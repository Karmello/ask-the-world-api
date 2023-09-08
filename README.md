[![master](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml/badge.svg)](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml)

# Ask The World API

- [Requesting action links](#requesting-action-links)
- [Opening action links](#opening-action-links)
- [External services requests](#external-services-requests)
- [User registration and authentication](#user-registration-and-authentication)

## Requesting action links

```mermaid
flowchart
ROOT[<b>FE</b>] --> A1[<b>GetActivationLink</b>] --> |GET + authToken|A2[account/activation-link]  --> |200|A3[Mail]
ROOT --> B1[<b>GetDeactivationLink</b>] --> |GET + authToken|B2[account/deactivation-link] --> |200|B3[Mail]
ROOT --> C1[<b>GetRecoveryLink</b>] --> |GET + email|C2[account/recovery-link] --> |200|C3[Mail]
```

## Opening action links

```mermaid
flowchart
ROOT[<b>Mail</b>] --> |activation link|A1[<b>Activate</b>] --> |GET + mailToken|A2[account/activate] --> |200|A3[Html template]
ROOT --> |deactivation link|B1[<b>Deactivate</b>] --> |GET + mailToken|B2[account/deactivate] --> |200|B3[Html template]
ROOT --> |recovery link|C1[<b>EnablePasswordRecovery</b>] --> |GET + mailToken|C2[account/password-recovery] --> |200|C3[Html template]
```

## External services requests

```mermaid
flowchart
ROOT[<b>Stripe API</b>] --> A1[<b>MakePayment</b>] --> |POST|A2[account/payment] --> |200|A3[empty]
```

## User registration and authentication

```mermaid
flowchart
ROOT[<b>FE</b>] --> A1[<b>Register</b>] --> |POST|A2[user/register]
ROOT --> B1[<b>Authenticate</b>] --> |POST|B2[user/authenticate]
```

## Getting user(s) data

```mermaid
flowchart
ROOT[<b>FE</b>] --> A1[<b>Get</b>] --> |GET|A2[user]
ROOT --> B1[<b>GetActivity</b>] --> |GET|B2[user/activity]
ROOT --> C1[<b>GetTop</b>] --> |GET|C2[users/top]
```

## Updating user

```mermaid
flowchart
ROOT[<b>FE</b>] --> A1[<b>Update</b>] --> |PUT|A2[user/update]
ROOT --> B1[<b>UpdatePassword</b>] --> |PUT|B2[user/password/update]
ROOT --> C1[<b>RecoverPassword</b>] --> |PUT|C2[user/password/recover]
ROOT --> D1[<b>UpdateAvatar</b>] --> |POST|D2[user/avatar/update]
```

## List of questions

```mermaid
flowchart
ROOT[<b>List of questions</b>] --> A1[<b>GetQuestions</b>] --> A2[GET /questions]
ROOT --> B1[<b>GetRandomQuestions</b>] --> B2[GET /questions/random]
```

## Question

```mermaid
flowchart
ROOT[<b>Question</b>] --> A1[<b>Create</b>] --> A2[POST /question/create]
ROOT --> B1[<b>Delete</b>] --> B2[DELETE /question/delete]
ROOT --> C1[<b>Get</b>] --> C2[GET /question]
ROOT --> D1[<b>GetCategories</b>] --> D2[GET /question/categories]
ROOT --> E1[<b>Terminate</b>] --> E2[PUT /question/terminate]
```

## Answer

```mermaid
flowchart
ROOT[<b>Answer</b>] --> A1[<b>Create</b>] --> A2[POST /answer/create]
ROOT --> B1[<b>Update</b>] --> B2[PUT /answer/update]
```

## Follow

```mermaid
flowchart
ROOT[<b>Follow</b>] --> A1[<b>Create</b>] --> A2[POST /follow/create]
ROOT --> B1[<b>Delete</b>] --> B2[DELETE /follow/delete]
```

## Report

```mermaid
flowchart
ROOT[<b>Report</b>] --> A1[<b>Create</b>] --> A2[POST /report/create]
```

## Other

```mermaid
flowchart
ROOT[<b>Other</b>] --> A1[<b>GetCountries</b>] --> A2[GET /countries]
ROOT --> B1[<b>GetStats</b>] --> B2[GET /stats]
```
