import { Comment, RedditUser, VoteableContent } from "snoowrap";
import CommandProps, { Command } from "../lib/Command";
import Snoowrap from "snoowrap";
import MetisClient from "../lib/MetisClient";

export class UserStats extends Command {
  name: string = "UserStats";
  description: string = "Get someone's stats.";

  metisClient: MetisClient;

  constructor(metisClient: MetisClient) {
    super(metisClient);
    this.metisClient = metisClient;
  }

  async execute(client: Snoowrap, message: Comment, args: string[]): Promise<void> {
    let user: RedditUser | undefined;

    // if no args the user is the one replied to
    if (args.length === 0) {
      const content = await client.getContentByIds([message.parent_id]);
      user = content[0].author
    };

    if (args.length > 0) {
      const _user = client.getUser(args[0].replace("u/", ""));

      try {
        await _user.created;
        user = _user;
      } catch (error) {}
    }

    if (!user) {
      message.reply(`User ${args[0]} doesn't exist.`);
      return;
    }

    const botMes = message.reply(`Processing user statistics for ${user.name}`) as unknown as VoteableContent<Comment>;

    const stats = await this.metisClient.getUserStats(user.name);

    const synopsis = stats?.synopsis || new Map();

    if (synopsis.size === 0) {
      botMes.edit("An unexpected error occurred.")
      return;
    }

    let comment = `**User stats for ${user.name}**`;

    synopsis.forEach((v, k) => {
      comment += '\n\n' + k + ': ';
      comment += v?.join(", ")
    })

    comment += "\n\n^(This data might not be completely correct.)"

    botMes.edit(comment);
  }
}

const CommandProps: CommandProps = {
  command: UserStats,
  async setup() {
    const metisClient = await MetisClient.create();
    return new UserStats(metisClient);
  }
}

export default CommandProps;
