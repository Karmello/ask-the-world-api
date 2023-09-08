[![master](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml/badge.svg)](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml)

# Ask The World API

<br/>

## Flows

- [Request action link](#request-action-link)
- [Open action link](#open-action-link)
- [External services requests](#external-services-requests)
- [User registration and authentication](#user-registration-and-authentication)
- [Getting user(s) data](#getting-users-data)
- [Updating user](#updating-user)
- [List of questions](#list-of-questions)
- [Question](#question)
- [Answer](#answer)
- [Follow](#follow)
- [Report](#report)
- [Other](#other)

<br/>

## Request action link

```mermaid
flowchart
ROOT[<b>Front-end</b>]
ROOT --> A1[<b>Get account activation link</b>] --> |auth token|A2[GET /account/activation-link] --> |200|A3[Send link via email]
ROOT --> B1[<b>Get account deactivation link</b>] --> |auth token|B2[GET /account/deactivation-link] --> |200|B3[Send link via email]
ROOT --> C1[<b>Get email recovery link</b>] --> |email|C2[GET /account/recovery-link] --> |200|C3[Send link via email]
```

## Open action link

```mermaid
flowchart
ROOT[<b>Email link</b>]
ROOT --> A1[<b>Activate account</b>] --> |mail token|A2[GET /account/activate] --> |200|A3[Return success html template]
ROOT --> B1[<b>Deactivate account</b>] --> |mail token|B2[GET /account/deactivate] --> |200|B3[Return success html template]
ROOT --> C1[<b>Enable password recovery</b>] --> |mail token|C2[GET /account/password-recovery] --> |200|C3[Return success html template]
```

## External services requests

```mermaid
flowchart
ROOT[<b>Stripe API</b>] --> A1[<b>MakePayment</b>] --> |POST|A2[account/payment] --> |200|A3[empty]
```

## User registration and authentication

```mermaid
flowchart
ROOT[<b>FE</b>] --> A1[<b>Register</b>] --> |POST + user data|A2[user/register]
ROOT --> B1[<b>Authenticate</b>] --> |POST + authToken or credentials|B2[user/authenticate]
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
