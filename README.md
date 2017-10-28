# Mailer

Simple and lightweight node server to send email via external SMTP server

## Configuration

Configuration lives in `config/`. The configuration follows the structure below.
```
{
  "node": {
    "host": "localhost",
    "port": 8080
  },
  "mail": {
    "smtp": {
      "host": "mail.example.com",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "user@example.com",
        "pass": "password"
      }
    }
  }
}
```

## Setup

Mailer is a node application and therefore requires node and npm to run. Once npm is installed, load dependencies by running the following command:
```
$ npm install
```

## Usage

Start the server with the following command:
```
$ npm start
```

Then call POST /email endpoint to send email. Please refer to a sample payload:
```
{
  "from": "Sender <sender@domain.com>",
  "to": "recepient@domain.com",
  "subject": "Hello, World!",
  "text": "I am glad this message finds you well."
}
```