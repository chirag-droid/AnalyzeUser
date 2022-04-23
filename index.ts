import fs from 'fs';
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import { InboxStream } from 'snoostorm';

import CommandProps from './lib/Command';
import RedditBot from './lib/RedditBot';

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
fs.readdir("./commands/", async (_err, files) => {
  for (let file of files) {
    file = `./commands/${file.replace(".ts", "")}`;

    // get the command props which is exported as default
    const command: CommandProps = require(file).default;

    bot.addCommand(await command.setup());
  }
});

// Create a comment stream from snoostorm
const inbox = new InboxStream(bot, {
  filter: 'unread',
  pollTime: 2000,
  limit: 15,
});

// process each comment
inbox.on('item', async (item) => {
  // get the prefix from the env
  const prefix = `u/${process.env.REDDIT_USER}`;

  // return if the prefix doesn't match
  if (item.body.indexOf(prefix) !== 0) return;

  // get all the command arguments
  const args = item.body.slice(prefix.length).trim().split(/ +/g);

  // get the userstats command
  const cmd = bot.getCommand('UserStats');
  if (!cmd) return;

  // execute the command
  await cmd.execute(bot, item, args);

  // mark the comment as read
  bot.markMessagesAsRead([item.name]);
})
