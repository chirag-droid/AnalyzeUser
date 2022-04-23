import Snoowrap, { PrivateMessage } from "snoowrap";

export abstract class Command {
  abstract name: string;
  abstract description: string;

  constructor(arg: any) {};

  abstract execute(client: Snoowrap, message: Snoowrap.Comment | PrivateMessage, args: Array<string>): Promise<void>;
}

export default interface CommandProps {
  command: typeof Command;
  setup(): Promise<Command>;
}
