# Analyze Bot

A reddit bot that sends a user's stats based on his/her last 1000's comments and posts.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Create a new reddit account. Go to [reddit developer portal](https://reddit.com/prefs/app). Create a new app with type script and fill in the variables below.

`CLIENT_ID`:  The reddit client id

`CLIENT_SECRET`: The reddit cliend secret

`REDDIT_USER`: The reddit username of the bot you just created

`REDDIT_PASS`: The reddit password of the account you created

`OWNER`: The account of the person who owns the bot

`PREFIX`: The bot prefix defaults to !## Run Locally

## Run locally

Clone the project

```bash
  git clone https://github.com/chirag-droid/AnalyzeBot
```

Go to the project directory

```bash
  cd AnalyzeBot
```

Install dependencies

```bash
  yarn install
```

Start the bot

```bash
  yarn start
```

## Deploy online

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/rtsip8?referralCode=km83_N)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
