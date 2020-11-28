# PS5-bot

1. Crawls 7 polish online shop looking for PS5
2. If PS5 becomes available it sends an email

# Requirements

This project requires some environment variables.

Create a `.env` file in the root of this project with:

```env
SENDGRID_API_KEY=<api_key_from_grid>
TARGET_MAIL=<mail_to_which_the_app_sends_the_mail>
SENDGRID_MAIL=<sendgrid_mail_using_custom_domain_created_in_sendgrid>
```

# Installation

```
npm ci
```

# Build

```
npm run build
```

# Run

```
npm start
```
