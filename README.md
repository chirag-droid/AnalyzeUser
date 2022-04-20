# Reddit Utility Bot

A reddit utility bot, with various different commands to help you surf reddit better. Has a command to analyse a user based on comments and post and many more.

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
  git clone https://github.com/chirag-droid/reddditutilitybot
```

Go to the project directory

```bash
  cd redditutilitybot
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

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
