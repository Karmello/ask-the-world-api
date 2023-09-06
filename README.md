[![master](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml/badge.svg)](https://github.com/Karmello/ask-the-world-api/actions/workflows/main.yml)

# Ask The World API

```mermaid
classDiagram
Account --> Activate : GET
Account --> Deactivate: GET
Account --> EnablePasswordRecovery : GET
Account --> GetActivationLink : GET
Account --> GetDeactivationLink : GET
Account --> GetRecoveryLink: POST
Account --> MakePayment: POST
Account: /account 
Activate: /activate
Deactivate: /deactivate
GetActivationLink: /activation-link
GetDeactivationLink: /deactivation-link
EnablePasswordRecovery: /password-recovery
GetRecoveryLink: /recovery-link
MakePayment: /payment
```
