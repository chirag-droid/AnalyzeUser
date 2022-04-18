import fs from 'fs';
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import { CommentStream } from 'snoostorm';

import config from './config';
import RedditBot from './lib/RedditBot';
import CommandProps from './commands/UserStats';

// Record the time when the bot started
const BOT_START = Date.now() / 1000;

// configure the environment variables from .env file
dotenv.config();

// instantiate the reddit base client
const bot = new RedditBot({
  userAgent: `script:${process.env.REDDIT_USER}:v1.0.0 (by /u/${process.env.BOT_OWNER})`,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});

bot.config({ continueAfterRatelimitError: true });

// log user logged in message
bot.getMe().then(me => {
  // Get the user subreddit
  // Note: due to some bug with snoowrap I am using this workaround
  const subreddit = me.subreddit?.display_name as unknown as Snoowrap.Subreddit;

  console.log(`✔ Logged in as ${subreddit.display_name_prefixed} (${subreddit.title})`);
});

// Setup all the commands
fs.readdir("./commands/", (_err, files) => {
  files.forEach(async (file) => {
    // get the command props which is exported as default
    const command: typeof CommandProps = require(`./commands/${file.replace(".ts", "")}`).default;

    // add the command after setting it up properly
    bot.addCommand(await command.setup());
  })
});

// Create a comment stream from snoostorm
const comments = new CommentStream(bot, config);

// process each comment
comments.on('item', async (item) => {
  if (item.created_utc < BOT_START) return;
  // only process if the comment is after the bot started

  // get the prefix from the env
  const prefix = process.env.PREFIX || "!";

  // return if the prefix doesn't match
  if (item.body.indexOf(prefix) !== 0) return;

  // get all the command arguments
  const args = item.body.slice(prefix.length).trim().split(/ +/g);

  // separate the command name and the arguments
  if (args.length < 1 || !args) return;
  const command = args.shift()?.toLowerCase() || "";

  // get the command from the collection and return if doesn't exist
  const cmd = bot.commands.get(command);
  if (!cmd) return;

  // execute the command
  await cmd.execute(bot, item, args);
})
