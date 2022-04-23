import Snoowrap from "snoowrap";
import { Command } from "./Command";

class RedditBot extends Snoowrap {
  commands: Map<string, Command>;

  constructor(options: Snoowrap.SnoowrapOptions) {
    super(options);
    this.commands = new Map();
  }

  addCommand(command: Command) {
    // Add the command to commands map
    this.commands.set(command.name.toLowerCase(), command);

    // Log the command loaded message
    console.log(`👌 Command loaded: ${command.name}`);
  }

  getCommand(command: string) {
    // get the command
    return this.commands.get(command.toLowerCase());
  }
}

export default RedditBot;
