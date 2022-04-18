import { SnooStormOptions } from "snoostorm";

const config: SnooStormOptions = {
  // Subreddit is all if in production otherwise limited to testingground4bots
  subreddit: process.env.NODE_ENV === 'production' ? 'all' : 'testingground4bots',
  pollTime: 3000,
  limit: 240,
}

export default config;
